import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import nodemailer from 'https://esm.sh/nodemailer@6.9.7'

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { name, email, phone, course_title, preferred_date, experience_level, message } = await req.json()

    const { data, error } = await supabaseClient
      .from('booking_inquiries')
      .insert([
        {
          name,
          email,
          phone,
          course_title,
          preferred_date,
          experience_level,
          message,
        },
      ])

    if (error) throw error

    // Send email
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: Deno.env.get('SMTP_USER'),
        pass: Deno.env.get('SMTP_PASS'),
      },
    })

    const mailOptions = {
      from: Deno.env.get('SMTP_USER'),
      to: 'info@koh-tao-dive-dreams.com', // or from env
      subject: `New Booking Inquiry: ${course_title}`,
      html: `
        <h2>New Booking Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Course/Dive:</strong> ${course_title}</p>
        <p><strong>Preferred Date:</strong> ${preferred_date || 'N/A'}</p>
        <p><strong>Experience Level:</strong> ${experience_level || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return new Response(JSON.stringify({ message: 'Booking submitted successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})