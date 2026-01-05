import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { LogOut, Mail, Trash2, RefreshCw, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course_title: string;
  preferred_date: string | null;
  experience_level: string | null;
  message: string | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<BookingInquiry[]>([]);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [newNotificationEmail, setNewNotificationEmail] = useState('');
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        console.error('Error checking admin role:', roleError);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!roleData);
      }

      if (roleData) {
        await fetchBookings();
        await fetchNotificationEmail();
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('booking_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    }
  };

  const fetchNotificationEmail = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'notification_email')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setNotificationEmail(data.setting_value);
        setNewNotificationEmail(data.setting_value);
      }
    } catch (error) {
      console.error('Error fetching notification email:', error);
    }
  };

  const handleSaveNotificationEmail = async () => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'notification_email',
          setting_value: newNotificationEmail,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'setting_key' });

      if (error) throw error;
      
      setNotificationEmail(newNotificationEmail);
      setIsEmailDialogOpen(false);
      toast.success('Notification email updated');
    } catch (error) {
      console.error('Error saving notification email:', error);
      toast.error('Failed to save notification email');
    }
  };

  const handleDeleteBooking = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('booking_inquiries')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;
      
      setBookings(bookings.filter(b => b.id !== deleteId));
      setDeleteId(null);
      toast.success('Booking deleted');
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Booking Inquiries ({bookings.length})</CardTitle>
                <Button onClick={fetchBookings} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No booking inquiries yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
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
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="whitespace-nowrap">
                              {format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}
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
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setDeleteId(booking.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Notification Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  New booking inquiries will be sent to this email address.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">
                      {notificationEmail || 'No email configured'}
                    </p>
                  </div>
                  <Button onClick={() => setIsEmailDialogOpen(true)}>
                    {notificationEmail ? 'Change' : 'Set Email'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Notification Email</DialogTitle>
            <DialogDescription>
              Enter the email address where booking notifications should be sent.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="email"
            placeholder="admin@example.com"
            value={newNotificationEmail}
            onChange={(e) => setNewNotificationEmail(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotificationEmail}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
