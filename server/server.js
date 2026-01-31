import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
console.log('Initializing database...');
const db = new Database('./bookings.db');

console.log('Creating table...');
db.exec(`
  CREATE TABLE IF NOT EXISTS booking_inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course_title TEXT NOT NULL,
    preferred_date TEXT,
    experience_level TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT NOT NULL
  )
`);

// Add status column if it doesn't exist
try {
  db.exec(`ALTER TABLE booking_inquiries ADD COLUMN status TEXT DEFAULT 'pending'`);
  console.log('Added status column');
} catch (e) {
  // Column already exists
}

console.log('Database initialized successfully');

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'bookingbas@onemedia.asia',
    pass: process.env.SMTP_PASS || 'Fd~6BQj?#6I',
  },
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log('Email transporter error:', error.message);
    console.log('Email functionality will not work until SMTP credentials are fixed');
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// API Routes

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Submit booking
app.post('/api/bookings', async (req, res) => {
  console.log('Booking request received:', req.body);
  try {
    const { name, email, phone, course_title, preferred_date, experience_level, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `);
    const result = stmt.run(id, name, email, phone, course_title, preferred_date, experience_level, message, created_at);
    console.log('Database insert result:', result);

    // Send admin notification email
    try {
      const adminMailOptions = {
        from: '"Dive School Bookings" <bookingbas@onemedia.asia>',
        to: 'bas@prodiving.asia',
        subject: `🆕 New Booking Inquiry: ${course_title}`,
        priority: 'high',
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        },
        html: `
          <h2>New Booking Inquiry</h2>
          <p><strong>Course/Dive:</strong> ${course_title}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Preferred Date:</strong> ${preferred_date || 'Not specified'}</p>
          <p><strong>Experience Level:</strong> ${experience_level || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message ? message.replace(/\n/g, '<br>') : 'No message'}</p>
        `,
      };
      await transporter.sendMail(adminMailOptions);
      console.log('Admin notification email sent');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    // Send customer confirmation email
    try {
      const customerMailOptions = {
        from: 'bookingbas@onemedia.asia',
        to: email,
        subject: `Booking Confirmation - ${course_title}`,
        html: `
          <h2>Thank you for your booking inquiry!</h2>
          <p>Dear ${name},</p>
          <p>We have received your inquiry for <strong>${course_title}</strong> and will get back to you shortly.</p>
          
          <h3>Your Booking Details:</h3>
          <p><strong>Course/Dive:</strong> ${course_title}</p>
          ${preferred_date ? `<p><strong>Preferred Date:</strong> ${preferred_date}</p>` : ''}
          ${experience_level ? `<p><strong>Experience Level:</strong> ${experience_level}</p>` : ''}
          
          <p>If you have any questions, feel free to reply to this email or contact us directly.</p>
          
          <p>Best regards,<br>The Dive School Team</p>
        `,
      };
      await transporter.sendMail(customerMailOptions);
      console.log('Customer confirmation email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send customer confirmation:', emailError);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to submit booking', details: error.message });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM booking_inquiries ORDER BY created_at DESC');
    const bookings = stmt.all();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status
app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get booking details for email
    const getStmt = db.prepare('SELECT * FROM booking_inquiries WHERE id = ?');
    const booking = getStmt.get(id);

    const stmt = db.prepare('UPDATE booking_inquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);

    // Send status change email to customer
    if (booking && booking.email) {
      const statusMessages = {
        confirmed: {
          subject: 'Booking Confirmed! 🎉',
          heading: 'Great News! Your Booking is Confirmed',
          message: 'We are excited to confirm your booking. Our team is looking forward to seeing you!',
          color: '#22c55e'
        },
        completed: {
          subject: 'Thank You for Diving With Us! 🌊',
          heading: 'Your Dive Experience is Complete',
          message: 'Thank you for choosing us for your diving adventure. We hope you had an amazing experience!',
          color: '#3b82f6'
        },
        cancelled: {
          subject: 'Booking Cancelled',
          heading: 'Your Booking Has Been Cancelled',
          message: 'Your booking has been cancelled. If you have any questions or would like to rebook, please contact us.',
          color: '#ef4444'
        },
        pending: {
          subject: 'Booking Status Update',
          heading: 'Your Booking is Pending Review',
          message: 'Your booking is currently under review. We will get back to you shortly.',
          color: '#eab308'
        }
      };

      const statusInfo = statusMessages[status];
      
      try {
        await transporter.sendMail({
          from: 'bookingbas@onemedia.asia',
          to: booking.email,
          subject: `${statusInfo.subject} - ${booking.course_title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: ${statusInfo.color}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h1 style="margin: 0;">${statusInfo.heading}</h1>
              </div>
              <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
                <p style="font-size: 16px; color: #374151;">Dear ${booking.name},</p>
                <p style="font-size: 16px; color: #374151;">${statusInfo.message}</p>
                
                <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #1f2937;">Booking Details</h3>
                  <p><strong>Course/Dive:</strong> ${booking.course_title}</p>
                  ${booking.preferred_date ? `<p><strong>Preferred Date:</strong> ${booking.preferred_date}</p>` : ''}
                  <p><strong>Status:</strong> <span style="color: ${statusInfo.color}; font-weight: bold;">${status.charAt(0).toUpperCase() + status.slice(1)}</span></p>
                </div>
                
                <p style="color: #6b7280; font-size: 14px;">If you have any questions, feel free to reply to this email or contact us directly.</p>
                
                <p style="color: #374151;">Best regards,<br><strong>The Dive School Team</strong></p>
              </div>
              <div style="background-color: #1f2937; color: #9ca3af; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">Koh Tao Dive School | Thailand</p>
              </div>
            </div>
          `,
        });
        console.log(`Status change email sent to ${booking.email} for status: ${status}`);
      } catch (emailError) {
        console.error('Failed to send status change email:', emailError);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple hardcoded admin credentials
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, token: 'admin-session-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM booking_inquiries WHERE id = ?');
    stmt.run(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  console.log('Contact form request received:', req.body);
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting contact into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `);
    const result = stmt.run(id, `${firstName} ${lastName}`, email, null, `Contact: ${subject}`, null, null, message, created_at);
    console.log('Database insert result:', result);

    // Send email notification
    const mailOptions = {
      from: '"Dive School Contact" <bookingbas@onemedia.asia>',
      to: 'bas@prodiving.asia',
      subject: `📩 Contact Form: ${subject}`,
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      },
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
        // Don't fail the request if email fails
      } else {
        console.log('Contact email sent:', info.response);
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
