import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Trash2, RefreshCw, Users, CheckCircle, Clock, XCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';

interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course_title: string;
  preferred_date: string | null;
  experience_level: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

const Admin = () => {
  const navigate = useNavigate();
  const apiBaseRaw = (import.meta.env.VITE_API_BASE_URL || '').trim();
  const apiBaseNormalized = apiBaseRaw
    ? (apiBaseRaw.startsWith('http://') || apiBaseRaw.startsWith('https://')
        ? apiBaseRaw
        : `https://${apiBaseRaw}`)
    : '';
  const apiBase = apiBaseNormalized.replace(/\/+$/, '');
  const apiUrl = (path: string) => `${apiBase}${path}`;
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const [{ data: userData }, { data: sessionData }] = await Promise.all([
          supabase.auth.getUser(),
          supabase.auth.getSession(),
        ]);

        const user = userData.user;
        const token = sessionData.session?.access_token || null;

        if (!user || !token || !hasAdminAccess(user)) {
          navigate('/admin/login');
          return;
        }

        setAuthToken(token);
        await fetchBookings(token);
      } catch (error) {
        console.error('Admin auth init failed:', error);
        navigate('/admin/login');
      }
    };

    initAuth();
  }, []);

  const fetchBookings = async (tokenArg?: string) => {
    const token = tokenArg || authToken;
    if (!token) return;

    try {
      const response = await fetch(apiUrl('/api/bookings'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    if (!authToken) return;

    try {
      const response = await fetch(apiUrl(`/api/bookings/${bookingId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.status === 401 || response.status === 403) {
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to update status');

      // Refetch bookings to ensure UI is up to date
      await fetchBookings();
      toast.success(`Status updated to ${statusConfig[newStatus as keyof typeof statusConfig]?.label || newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteBooking = async () => {
    if (!deleteId) return;
    if (!authToken) return;

    try {
      const response = await fetch(apiUrl(`/api/bookings/${deleteId}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        navigate('/admin/login');
        return;
      }
      if (!response.ok) throw new Error('Failed to delete booking');

      // Refetch bookings to ensure UI is up to date
      await fetchBookings();
      setDeleteId(null);
      toast.success('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const handleSendInvoice = async (booking: BookingInquiry) => {
    try {
      const amount = booking.message || booking.course_title || '';
      const payload = {
        access_key: 'e4c4edf6-6e35-456a-87da-b32b961b449a',
        to: 'payments@divinginasia.com',
        subject: `Invoice: ${booking.course_title} - ${booking.name}`,
        name: booking.name,
        message: `New Invoice Notification\n\nCustomer: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || 'N/A'}\n\nCourse: ${booking.course_title}\nPreferred Date: ${booking.preferred_date || 'N/A'}\nAmount: ${booking.message || 'TBD'}\n\nCustomer Message:\n${booking.message || 'No additional message'}`,
        cc: booking.email,
      } as any;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        toast.success('Invoice sent to admin');
      } else {
        console.error('Web3Forms invoice error', res.status, json);
        toast.error('Failed to send invoice to admin');
      }
    } catch (err) {
      console.error('Send invoice error', err);
      toast.error('Failed to send invoice');
    }
  };

  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter);

  const getStatusCounts = () => {
    return {
      all: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  };

  const counts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={fetchBookings} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('all')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{counts.all}</div>
              <div className="text-sm text-muted-foreground">All</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-yellow-200" onClick={() => setStatusFilter('pending')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-green-200" onClick={() => setStatusFilter('confirmed')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{counts.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-blue-200" onClick={() => setStatusFilter('completed')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{counts.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-red-200" onClick={() => setStatusFilter('cancelled')}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{counts.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Booking Inquiries
              </span>
              {statusFilter !== 'all' && (
                <Badge variant="outline" className="cursor-pointer" onClick={() => setStatusFilter('all')}>
                  Showing: {statusFilter} × Clear
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No booking inquiries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Course/Dive</TableHead>
                      <TableHead>Preferred Date</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => {
                      const status = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={booking.status || 'pending'}
                              onValueChange={(value) => handleStatusChange(booking.id, value)}
                            >
                              <SelectTrigger className={`w-32 ${status.color} border`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">
                                  <span className="flex items-center gap-2">
                                    <Clock className="h-3 w-3" /> Pending
                                  </span>
                                </SelectItem>
                                <SelectItem value="confirmed">
                                  <span className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" /> Confirmed
                                  </span>
                                </SelectItem>
                                <SelectItem value="completed">
                                  <span className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3" /> Completed
                                  </span>
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  <span className="flex items-center gap-2">
                                    <XCircle className="h-3 w-3" /> Cancelled
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="font-medium">{booking.name}</TableCell>
                          <TableCell>
                            <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                              {booking.email}
                            </a>
                          </TableCell>
                          <TableCell>{booking.phone || '-'}</TableCell>
                          <TableCell>{booking.course_title}</TableCell>
                          <TableCell>
                            {booking.preferred_date 
                              ? format(new Date(booking.preferred_date), 'MMM d, yyyy')
                              : '-'}
                          </TableCell>
                          <TableCell>{booking.experience_level || '-'}</TableCell>
                          <TableCell className="max-w-xs truncate" title={booking.message || ''}>
                            {booking.message || '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setDeleteId(booking.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleSendInvoice(booking)}>
                                Send Invoice
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking inquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBooking}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;