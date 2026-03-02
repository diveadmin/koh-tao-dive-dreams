const express = require('express');
const { requireAdmin } = require('./api/_lib/auth');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Routes

app.get('/api/bookings', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email) {
    return res.status(400).json({ error: 'Missing required fields: name and email' });
  }
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([body])
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/api/bookings/:id/status', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'paid'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json({ message: 'Status updated', booking: data[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/api/bookings/:id', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;
  const { id } = req.params;
  const updates = req.body;

  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/affiliate-clicks', async (req, res) => {
  try {
    const { affiliate_id, limit } = req.query;
    const maxRecords = Number(limit || 500);

    let query = supabase
      .from('affiliate_clicks')
      .select('*')
      .order('clicked_at', { ascending: false })
      .limit(Number.isFinite(maxRecords) ? Math.min(maxRecords, 1000) : 500);

    if (affiliate_id) {
      query = query.eq('affiliate_id', affiliate_id);
    }

    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/affiliate-clicks', async (req, res) => {
  const { hotel_name, hotel_url, affiliate_id, referrer, user_agent, clicked_at } = req.body || {};
  if (!hotel_name || !hotel_url) {
    return res.status(400).json({ error: 'Missing required fields: hotel_name and hotel_url' });
  }

  try {
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .insert([{
        hotel_name,
        hotel_url,
        affiliate_id: affiliate_id || null,
        referrer: referrer || null,
        user_agent: user_agent || null,
        clicked_at: clicked_at || new Date().toISOString(),
      }])
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Catch-all handler: send back index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
