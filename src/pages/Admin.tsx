import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Trash2, RefreshCw, Users, CheckCircle, Clock, XCircle, LogOut, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';

interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  item_type: string | null;
  course_title: string;
  preferred_date: string | null;
  experience_level: string | null;
  addons: string | null;
  addons_json: string | null;
  addons_total: number;
  subtotal_amount: number | null;
  total_payable_now: number | null;
  internal_notes: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
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
  const apiUrl = useCallback((path: string) => `${apiBase}${path}`, [apiBase]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notesBooking, setNotesBooking] = useState<BookingInquiry | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [invoiceBooking, setInvoiceBooking] = useState<BookingInquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [authToken, setAuthToken] = useState<string | null>(null);

  const fetchAdminApi = useCallback(async (path: string, init?: RequestInit) => {
    try {
      return await fetch(apiUrl(path), init);
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : '';
      const isNetworkError = message.includes('failed to fetch') || message.includes('networkerror');
      if (apiBase && isNetworkError) {
        return fetch(path, init);
      }
      throw error;
    }
  }, [apiBase, apiUrl]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const [{ data: userData }, { data: sessionData }] = await Promise.all([
          supabase.auth.getUser(),
          supabase.auth.getSession(),
        ]);

        const user = userData.user;
        let token = sessionData.session?.access_token || null;

        if (!user || !hasAdminAccess(user)) {
          navigate('/admin/login');
          return;
        }

        if (!token) {
          const { data: refreshed } = await supabase.auth.refreshSession();
          token = refreshed.session?.access_token || null;
        }

        if (!token) {
          toast.error('Unable to establish session token. Please log in again.');
          navigate('/admin/login');
          return;
        }

        setAuthToken(token);

        const response = await fetchAdminApi('/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          await supabase.auth.signOut();
          toast.error('Admin session is not authorized on backend. Please login again after server env is updated.');
          navigate('/admin/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Admin auth init failed:', error);
        setIsLoading(false);
        navigate('/admin/login');
      }
    };

    initAuth();
  }, [navigate, fetchAdminApi]);

  const fetchBookings = async (tokenArg?: string) => {
    const token = tokenArg || authToken;
    if (!token) return;

    try {
      const response = await fetchAdminApi('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        await supabase.auth.signOut();
        toast.error('Admin session is not authorized on backend. Please login again after server env is updated.');
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
      const response = await fetchAdminApi(`/api/bookings/${bookingId}/status`, {
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
      const response = await fetchAdminApi(`/api/bookings/${deleteId}`, {
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
      const payload: Record<string, unknown> = {
        access_key: 'e4c4edf6-6e35-456a-87da-b32b961b449a',
        to: 'payments@divinginasia.com',
        subject: `Invoice: ${booking.course_title} - ${booking.name}`,
        name: booking.name,
        message: `New Invoice Notification\n\nCustomer: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || 'N/A'}\n\nCourse: ${booking.course_title}\nPreferred Date: ${booking.preferred_date || 'N/A'}\nAmount: ${booking.message || 'TBD'}\n\nCustomer Message:\n${booking.message || 'No additional message'}`,
        cc: booking.email,
      };

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

  const openNotesDialog = (booking: BookingInquiry) => {
    setNotesBooking(booking);
    setNotesDraft(booking.internal_notes || '');
  };

  const getAddonsList = (booking: BookingInquiry) => {
    if (!booking.addons_json) return [] as Array<{ label?: string; amount?: number }>;
    try {
      const parsed = JSON.parse(booking.addons_json);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const getAddonsDisplay = (booking: BookingInquiry) => {
    if (booking.addons && booking.addons.trim()) return booking.addons;
    const list = getAddonsList(booking)
      .map((addon) => addon.label)
      .filter(Boolean);
    return list.length ? list.join(', ') : '-';
  };

  const getInvoiceNumbers = (booking: BookingInquiry) => {
    const subtotal = typeof booking.subtotal_amount === 'number' ? booking.subtotal_amount : null;
    const addonsTotal = typeof booking.addons_total === 'number' ? booking.addons_total : 0;
    const dueNow = typeof booking.total_payable_now === 'number' ? booking.total_payable_now : 0;
    const grandTotal = subtotal !== null ? subtotal + addonsTotal : null;
    const balanceDue = grandTotal !== null ? Math.max(grandTotal - dueNow, 0) : null;
    return { subtotal, addonsTotal, dueNow, grandTotal, balanceDue };
  };

  const buildInvoiceHtml = (booking: BookingInquiry) => {
    const addons = getAddonsList(booking);
    const { subtotal, addonsTotal, dueNow, grandTotal, balanceDue } = getInvoiceNumbers(booking);
    const invoiceNo = `INV-${booking.id.slice(0, 8).toUpperCase()}`;
    const issueDate = format(new Date(), 'yyyy-MM-dd');
    const itemName = booking.course_title || 'Booking';

    const addonRows = addons.length
      ? addons
          .map((addon) => {
            const label = addon.label || 'Add-on';
            const amount = typeof addon.amount === 'number' ? addon.amount : 0;
            return `<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${label}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">฿${amount}</td></tr>`;
          })
          .join('')
      : '<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;">No add-ons</td><td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">฿0</td></tr>';

    return `
      <html>
        <head>
          <title>${invoiceNo}</title>
          <meta charset="utf-8" />
        </head>
        <body style="font-family:Arial,sans-serif;color:#111827;padding:24px;max-width:800px;margin:0 auto;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
            <div>
              <h1 style="margin:0;font-size:26px;">Pro Diving Asia</h1>
              <div style="color:#6b7280;margin-top:4px;">Koh Tao, Thailand</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:22px;font-weight:700;">Invoice</div>
              <div style="color:#6b7280;">${invoiceNo}</div>
              <div style="color:#6b7280;">Date: ${issueDate}</div>
            </div>
          </div>

          <div style="margin-bottom:20px;">
            <div style="font-weight:600;">Bill To</div>
            <div>${booking.name}</div>
            <div>${booking.email}</div>
            <div>${booking.phone || '-'}</div>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            <thead>
              <tr>
                <th style="text-align:left;padding:8px;background:#f3f4f6;border-bottom:1px solid #d1d5db;">Description</th>
                <th style="text-align:right;padding:8px;background:#f3f4f6;border-bottom:1px solid #d1d5db;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${itemName}${booking.item_type ? ` (${booking.item_type})` : ''}</td>
                <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">${subtotal !== null ? `฿${subtotal}` : '-'}</td>
              </tr>
              ${addonRows}
            </tbody>
          </table>

          <div style="margin-left:auto;max-width:320px;">
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Add-ons total</span><strong>฿${addonsTotal}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Total payable now</span><strong>฿${dueNow}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid #d1d5db;margin-top:8px;"><span>Grand total</span><strong>${grandTotal !== null ? `฿${grandTotal}` : '-'}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Balance due</span><strong>${balanceDue !== null ? `฿${balanceDue}` : '-'}</strong></div>
          </div>

          <p style="margin-top:24px;color:#6b7280;font-size:12px;">Thank you for booking with Pro Diving Asia.</p>
        </body>
      </html>
    `;
  };

  const handlePrintInvoice = (booking: BookingInquiry) => {
    const popup = window.open('', '_blank', 'width=900,height=700');
    if (!popup) {
      toast.error('Please allow popups to print invoice.');
      return;
    }

    popup.document.open();
    popup.document.write(buildInvoiceHtml(booking));
    popup.document.close();
    popup.focus();
    popup.print();
  };

  const handleSaveNotes = async () => {
    if (!notesBooking || !authToken) return;
    setIsSavingNotes(true);

    try {
      const response = await fetchAdminApi(`/api/bookings/${notesBooking.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ internal_notes: notesDraft.trim() || null }),
      });

      if (response.status === 401 || response.status === 403) {
        await supabase.auth.signOut();
        toast.error('Admin session expired. Please login again.');
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to save notes');
      }

      toast.success('Internal notes saved');
      setNotesBooking(null);
      await fetchBookings();
    } catch (error) {
      console.error('Error saving notes:', error);
      const message = error instanceof Error ? error.message : 'Failed to save notes';
      if (message.toLowerCase().includes('failed to fetch')) {
        toast.error('Cannot reach API. Check VITE_API_BASE_URL or run npm run dev for local API.');
      } else {
        toast.error(message);
      }
    } finally {
      setIsSavingNotes(false);
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
                      <TableHead>Type</TableHead>
                      <TableHead>Preferred Date</TableHead>
                      <TableHead>Add-ons</TableHead>
                      <TableHead>Payable</TableHead>
                      <TableHead>Notes</TableHead>
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
                          <TableCell className="capitalize">{booking.item_type || '-'}</TableCell>
                          <TableCell>
                            {booking.preferred_date 
                              ? format(new Date(booking.preferred_date), 'MMM d, yyyy')
                              : '-'}
                          </TableCell>
                          <TableCell>{getAddonsDisplay(booking)}</TableCell>
                          <TableCell>{typeof booking.total_payable_now === 'number' ? `฿${booking.total_payable_now}` : '-'}</TableCell>
                          <TableCell className="max-w-xs truncate" title={booking.internal_notes || ''}>
                            {booking.internal_notes || '-'}
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
                              <Button variant="ghost" size="sm" onClick={() => openNotesDialog(booking)}>
                                Notes
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setInvoiceBooking(booking)}>
                                <FileText className="h-4 w-4 mr-1" /> Invoice
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

      <Dialog open={!!notesBooking} onOpenChange={() => setNotesBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Internal Notes</DialogTitle>
            <DialogDescription>
              {notesBooking ? `Booking: ${notesBooking.course_title} — ${notesBooking.name}` : 'Add private staff notes for this booking.'}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            rows={6}
            placeholder="Add internal comments, follow-up notes, reminders..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesBooking(null)} disabled={isSavingNotes}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} disabled={isSavingNotes}>
              {isSavingNotes ? 'Saving...' : 'Save Notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!invoiceBooking} onOpenChange={() => setInvoiceBooking(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>
              {invoiceBooking ? `Invoice for ${invoiceBooking.name} — ${invoiceBooking.course_title}` : 'Invoice preview'}
            </DialogDescription>
          </DialogHeader>

          {invoiceBooking && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold">Customer</div>
                  <div>{invoiceBooking.name}</div>
                  <div>{invoiceBooking.email}</div>
                  <div>{invoiceBooking.phone || '-'}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Invoice #</div>
                  <div>{`INV-${invoiceBooking.id.slice(0, 8).toUpperCase()}`}</div>
                  <div>{format(new Date(), 'yyyy-MM-dd')}</div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-2">Description</th>
                      <th className="text-right p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2">{invoiceBooking.course_title}{invoiceBooking.item_type ? ` (${invoiceBooking.item_type})` : ''}</td>
                      <td className="p-2 text-right">{typeof invoiceBooking.subtotal_amount === 'number' ? `฿${invoiceBooking.subtotal_amount}` : '-'}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2">Add-ons</td>
                      <td className="p-2 text-right">฿{invoiceBooking.addons_total || 0}</td>
                    </tr>
                    <tr className="border-t font-semibold">
                      <td className="p-2">Payable now</td>
                      <td className="p-2 text-right">{typeof invoiceBooking.total_payable_now === 'number' ? `฿${invoiceBooking.total_payable_now}` : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceBooking(null)}>
              Close
            </Button>
            <Button onClick={() => invoiceBooking && handlePrintInvoice(invoiceBooking)}>
              Print / Save PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;