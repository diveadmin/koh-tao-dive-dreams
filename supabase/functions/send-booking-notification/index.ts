import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  itemType: 'course' | 'dive';
  itemTitle: string;
  preferred_date?: string;
  experience_level?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get notification email from database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: settingsData } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", "notification_email")
      .maybeSingle();

    // Fallback to NOTIFICATION_EMAIL secret if not set in database
    let notificationEmail = settingsData?.setting_value || Deno.env.get("NOTIFICATION_EMAIL");
    
    if (!notificationEmail) {
      console.log("No notification email configured, skipping email send");
      return new Response(JSON.stringify({ message: "No notification email configured" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resend = new Resend(RESEND_API_KEY);
    const booking: BookingNotificationRequest = await req.json();

    console.log("Sending booking notification for:", booking.name, "to:", notificationEmail);

    const emailResponse = await resend.emails.send({
      from: "Dive School <onboarding@resend.dev>",
      to: [notificationEmail],
      subject: `New Booking Inquiry: ${booking.itemTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">New Booking Inquiry</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #1f2937;">${booking.itemType === 'course' ? 'Course' : 'Dive Site'}: ${booking.itemTitle}</h2>
          </div>
          
          <h3 style="color: #374151;">Customer Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${booking.email}">${booking.email}</a></td>
            </tr>
            ${booking.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.phone}</td>
            </tr>
            ` : ''}
            ${booking.preferred_date ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.preferred_date}</td>
            </tr>
            ` : ''}
            ${booking.experience_level ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Experience Level:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.experience_level}</td>
            </tr>
            ` : ''}
          </table>
          
          ${booking.message ? `
          <h3 style="color: #374151; margin-top: 20px;">Message</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">${booking.message}</p>
          ` : ''}
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This email was sent automatically from your dive school booking system.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
