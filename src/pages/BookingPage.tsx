// Rezdy integration removed — use internal booking flow
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const bookingSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().max(20).optional(),
  preferred_date: z.string().optional(),
  experience_level: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
  paymentChoice: z.enum(['now', 'link', 'none']).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const ADDONS = [
  { id: 'equipment', label: 'Equipment rental', amount: 300 },
  { id: 'photos', label: 'Underwater photos', amount: 500 },
  { id: 'lunch', label: 'Lunch & drinks', amount: 200 },
];

const       BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemTitle = searchParams.get('item') || 'Booking';
  const itemType = (searchParams.get('type') as 'course' | 'dive') || 'course';
  const depositMajor = Number(searchParams.get('deposit') || '0');
  const depositCurrency = searchParams.get('currency') || 'THB';

  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const totalAddons = useMemo(() => {
    return ADDONS.reduce((sum, a) => sum + (selectedAddons[a.id] ? a.amount : 0), 0);
  }, [selectedAddons]);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: '', email: '', phone: '', preferred_date: '', experience_level: '', message: '', paymentChoice: 'now' },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const paymentChoice = (data as any).paymentChoice || 'none';
      const amountMajor = depositMajor + totalAddons;

      let checkoutUrl: string | undefined;
      if ((paymentChoice === 'now' || paymentChoice === 'link') && amountMajor > 0) {
        const body: any = { itemTitle, itemType, name: data.name, email: data.email, amountMajor };
        if (depositCurrency) body.currency = depositCurrency;

        const checkoutRes = await fetch('/api/create-checkout-session', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
        const json = await checkoutRes.json().catch(() => ({}));
        if (checkoutRes.ok && json.url) {
          checkoutUrl = json.url;
          if (paymentChoice === 'now') {
            window.location.href = checkoutUrl;
            return;
          }
        } else {
          toast.error('Payment initialization failed; continue with inquiry.');
        }
      }

      const messageBase = `Preferred Date: ${data.preferred_date || 'N/A'}\nExperience: ${data.experience_level || 'N/A'}\nAdd-ons: ${ADDONS.filter(a=>selectedAddons[a.id]).map(a=>a.label).join(', ') || 'None'}`;
      const messageWithLink = checkoutUrl ? `${messageBase}\nPayment link: ${checkoutUrl}` : messageBase;

      const payload = { access_key: 'e4c4edf6-6e35-456a-87da-b32b961b449a', subject: `Booking Inquiry: ${itemTitle}`, name: data.name, email: data.email, message: messageWithLink };

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const resp = await res.json().catch(() => ({}));
      if (res.ok && resp.success) {
        toast.success('Inquiry sent. We will contact you soon.');
        form.reset();
        navigate('/');
      } else {
        toast.error('Failed to send inquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Submission failed.');
    }
  };

  // Rezdy prefill removed.

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold mb-2">Book: {itemTitle}</h1>
          {rezdyBase ? (
            <div className="ml-4 flex gap-2">
              <a href={rezdyBase} target="_blank" rel="noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Book on Rezdy
              </a>
              <button
                type="button"
                onClick={() => {
                  const values = form.getValues();
                  const url = buildRezdyPrefill(values);
                  if (url) window.open(url, '_blank');
                }}
                className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded"
              >
                Prefill & Book on Rezdy
              </button>
            </div>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground mb-6">Select options and submit your booking or inquiry.</p>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Deposit</div>
              <div className="text-2xl font-bold">{depositMajor > 0 ? `฿${depositMajor}` : 'No deposit required'}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Add-ons</div>
              <div className="text-sm text-muted-foreground">Select extras below</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {ADDONS.map((a) => (
            <label key={a.id} className="flex items-center gap-3 p-4 border rounded">
              <input type="checkbox" checked={!!selectedAddons[a.id]} onChange={() => setSelectedAddons(s => ({ ...s, [a.id]: !s[a.id] }))} />
              <div>
                <div className="font-medium">{a.label}</div>
                <div className="text-sm text-muted-foreground">฿{a.amount}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-6 text-right">
          <div className="text-sm text-muted-foreground">Total deposit (incl. add-ons):</div>
          <div className="text-2xl font-bold">฿{depositMajor + totalAddons}</div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name *</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email *</FormLabel>
                <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</FormLabel>
                <FormControl><Input placeholder="+66 123 456 789" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="preferred_date" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Preferred Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="experience_level" render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No diving experience</SelectItem>
                    <SelectItem value="beginner">Beginner (1-10 dives)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (10-50 dives)</SelectItem>
                    <SelectItem value="advanced">Advanced (50+ dives)</SelectItem>
                    <SelectItem value="professional">Professional diver</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="paymentChoice" render={({ field }) => (
              <FormItem>
                <FormLabel>Payment option</FormLabel>
                <FormControl>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex items-center gap-2"><input type="radio" value="now" checked={field.value === 'now'} onChange={() => field.onChange('now')} /> <span className="ml-2">Pay deposit now</span></label>
                    <label className="flex items-center gap-2"><input type="radio" value="link" checked={field.value === 'link'} onChange={() => field.onChange('link')} /> <span className="ml-2">Send payment link to my email</span></label>
                    <label className="flex items-center gap-2"><input type="radio" value="none" checked={field.value === 'none'} onChange={() => field.onChange('none')} /> <span className="ml-2">Just an inquiry (no deposit)</span></label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Message</FormLabel>
                <FormControl><Textarea placeholder="Any special requests or questions?" rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">Cancel</Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">Submit Inquiry</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingPage;
