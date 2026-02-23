// Rezdy integration removed — use internal booking flow
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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

const PAYPAL_LINK = 'https://paypal.me/divinginasia';

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
    defaultValues: { name: '', email: '', phone: '', preferred_date: '', experience_level: '', message: '', paymentChoice: 'none' },
  });

  const [showPaymentLinks, setShowPaymentLinks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: BookingFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form validation errors:', form.formState.errors);
    setIsSubmitting(true);
    try {
      const amountMajor = depositMajor + totalAddons;
      const addonsText = ADDONS.filter(a => selectedAddons[a.id]).map(a => a.label).join(', ') || 'None';

      // Prepare Web3Forms payload
      const payload = {
        access_key: 'e4c4edf6-6e35-456a-87da-b32b961b449a',
        to: 'payments@divinginasia.com',
        subject: `Booking Inquiry: ${itemTitle}`,
        name: data.name,
        email: data.email,
        phone: data.phone || 'N/A',
        preferred_date: data.preferred_date || 'N/A',
        experience_level: data.experience_level || 'N/A',
        payment_choice: data.paymentChoice === 'now' ? 'Pay deposit now via PayPal' : 'Pay later (inquire only)',
        paypal_link: data.paymentChoice === 'now' ? `${PAYPAL_LINK}/${amountMajor}THB` : null,
        item_title: itemTitle,
        deposit_amount: `฿${amountMajor}`,
        addons: addonsText,
        message: data.message || 'No additional message',
      };

      console.log('Sending booking payload to Web3Forms', payload);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));
      console.log('Web3Forms response:', res.status, responseData);

      if (res.ok && responseData.success) {
        console.log('Form submission successful');
        toast.success('Inquiry sent! You can now pay your deposit via PayPal below.');
        if (data.paymentChoice === 'now' && amountMajor > 0) {
          console.log('Showing payment links');
          setShowPaymentLinks(true);
        } else {
          console.log('Redirecting to home');
          form.reset();
          navigate('/');
        }
      } else {
        const errMsg = responseData?.message || responseData?.error || `HTTP ${res.status}`;
        console.error('Web3Forms error:', errMsg, responseData);
        toast.error(`Failed to send inquiry: ${errMsg}. Please try again.`);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rezdy prefill removed.

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold mb-2">Book: {itemTitle}</h1>
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

            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Message</FormLabel>
                <FormControl><Textarea placeholder="Any special requests or questions?" rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="paymentChoice" render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="payment-none"
                        name="paymentChoice"
                        value="none"
                        checked={field.value === 'none'}
                        onChange={() => field.onChange('none')}
                      />
                      <span>Pay later (inquire only)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="payment-now"
                        name="paymentChoice"
                        value="now"
                        checked={field.value === 'now'}
                        onChange={() => field.onChange('now')}
                      />
                      <span>Pay deposit now with PayPal</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        </Form>

        {showPaymentLinks && (
          <div className="mt-8 p-6 border rounded-xl bg-muted/50 text-center space-y-4">
            <h2 className="text-xl font-bold">Pay Your Deposit</h2>
            <p className="text-muted-foreground">Your inquiry has been sent! To secure your booking, pay the deposit of <strong>฿{depositMajor + totalAddons}</strong> via PayPal:</p>
            <div className="space-y-3">
              <a
                href={`${PAYPAL_LINK}/${depositMajor + totalAddons}THB`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#0070ba] hover:bg-[#005ea6] text-white px-8 py-3 text-lg w-full">
                  Pay ฿{depositMajor + totalAddons} with PayPal
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">or</p>
              <a
                href={PAYPAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="px-8 py-3 text-lg w-full">
                  Open PayPal.me/divinginasia
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Or <button className="underline" onClick={() => { form.reset(); setShowPaymentLinks(false); navigate('/'); }}>skip payment for now</button></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
