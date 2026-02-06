const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { randomUUID } = require('node:crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
console.log('Database initialized successfully');

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'bas@prodiving.asia',
    pass: process.env.SMTP_PASS || 'Md10is12usenow.',
  },
});

// Verify email transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// API Routes

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Submit booking
app.post('/api/bookings', (req, res) => {
  console.log('Booking request received:', req.body);
  try {
    const { name, email, phone, course_title, preferred_date, experience_level, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(id, name, email, phone, course_title, preferred_date, experience_level, message, 'pending', created_at);
    console.log('Database insert result:', result);

    // Send email notification
    const mailOptions = {
      from: process.env.SMTP_USER || 'your_correct_smtp_username@onemedia.asia',
      to: 'bas@prodiving.asia',
      subject: 'New Booking Inquiry',
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
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
        // Don't fail the request if email fails
      } else {
        console.log('Email sent:', info.response);
      }
    });

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

// Update booking status
app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const stmt = db.prepare('UPDATE booking_inquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  console.log('Contact form request received:', req.body);
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    console.log('Inserting contact into database...');
    const stmt = db.prepare(`
      INSERT INTO booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(id, `${firstName} ${lastName}`, email, null, `Contact: ${subject}`, null, null, message, 'pending', created_at);
    console.log('Database insert result:', result);

    // Send email notification
    const mailOptions = {
      from: process.env.SMTP_USER || 'bas@divinginasia.com',
      to: 'bas@divinginasia.com',
      subject: `Contact Form: ${subject}`,
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});