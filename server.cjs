const express = require('express');
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

const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const BOOKINGS_TABLE = process.env.AIRTABLE_BOOKINGS_TABLE || 'bookings';
const AFFILIATE_CLICKS_TABLE = process.env.AIRTABLE_AFFILIATE_CLICKS_TABLE || 'affiliate_clicks';

const airtableConfigured = Boolean(AIRTABLE_TOKEN && AIRTABLE_BASE_ID);

const escapeFormulaValue = (value = '') => String(value).replace(/'/g, "\\'");

const airtableUrl = (table, query = '') => {
  const encodedTable = encodeURIComponent(table);
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTable}${query ? `?${query}` : ''}`;
};

const airtableHeaders = () => ({
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
});

const ensureAirtable = (res) => {
  if (airtableConfigured) return true;
  res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  return false;
};

const mapBooking = (record) => {
  const fields = record?.fields || {};
  return {
    id: fields.id || record.id,
    name: fields.name || '',
    email: fields.email || '',
    phone: fields.phone || null,
    course_title: fields.course_title || '',
    preferred_date: fields.preferred_date || null,
    experience_level: fields.experience_level || null,
    message: fields.message || null,
    status: fields.status || 'pending',
    created_at: fields.created_at || null,
  };
};

const mapAffiliateClick = (record) => {
  const fields = record?.fields || {};
  return {
    id: fields.id || record.id,
    hotel_name: fields.hotel_name || '',
    hotel_url: fields.hotel_url || '',
    affiliate_id: fields.affiliate_id || null,
    clicked_at: fields.clicked_at || null,
    referrer: fields.referrer || null,
    user_agent: fields.user_agent || null,
  };
};

const findBookingRecordById = async (id) => {
  const params = new URLSearchParams();
  params.set('maxRecords', '1');
  params.set('filterByFormula', `{id}='${escapeFormulaValue(id)}'`);

  const response = await fetch(airtableUrl(BOOKINGS_TABLE, params.toString()), {
    method: 'GET',
    headers: airtableHeaders(),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Failed to query booking');
  }
  return payload.records?.[0] || null;
};

// Routes
app.get('/api/bookings', async (req, res) => {
  if (!ensureAirtable(res)) return;
  try {
    const paramsWithSort = new URLSearchParams();
    paramsWithSort.set('maxRecords', '500');
    paramsWithSort.set('sort[0][field]', 'created_at');
    paramsWithSort.set('sort[0][direction]', 'desc');

    let response = await fetch(airtableUrl(BOOKINGS_TABLE, paramsWithSort.toString()), {
      method: 'GET',
      headers: airtableHeaders(),
    });
    let payload = await response.json();

    if (!response.ok && payload?.error?.message?.includes('Unknown field name: "created_at"')) {
      const paramsNoSort = new URLSearchParams();
      paramsNoSort.set('maxRecords', '500');
      response = await fetch(airtableUrl(BOOKINGS_TABLE, paramsNoSort.toString()), {
        method: 'GET',
        headers: airtableHeaders(),
      });
      payload = await response.json();
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to fetch bookings' });
    }

    return res.json((payload.records || []).map(mapBooking));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  if (!ensureAirtable(res)) return;
  const { id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name and email' });
  }

  try {
    const response = await fetch(airtableUrl(BOOKINGS_TABLE), {
      method: 'POST',
      headers: airtableHeaders(),
      body: JSON.stringify({
        fields: {
          id: id || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
          name,
          email,
          ...(phone ? { phone } : {}),
          course_title: course_title || '',
          preferred_date: preferred_date || new Date().toISOString().slice(0, 10),
          ...(experience_level ? { experience_level } : {}),
          ...(message ? { message } : {}),
          status: status || 'pending',
          created_at: created_at || new Date().toISOString(),
        },
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to create booking' });
    }

    return res.status(201).json(mapBooking(payload));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put('/api/bookings/:id/status', async (req, res) => {
  if (!ensureAirtable(res)) return;
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'paid'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const record = await findBookingRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const response = await fetch(`${airtableUrl(BOOKINGS_TABLE)}/${record.id}`, {
      method: 'PATCH',
      headers: airtableHeaders(),
      body: JSON.stringify({ fields: { status, updated_at: new Date().toISOString() } }),
    });
    const payload = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to update status' });
    }

    return res.json({ message: 'Status updated', booking: mapBooking(payload) });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  if (!ensureAirtable(res)) return;
  const { id } = req.params;
  try {
    const record = await findBookingRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const response = await fetch(`${airtableUrl(BOOKINGS_TABLE)}/${record.id}`, {
      method: 'DELETE',
      headers: airtableHeaders(),
    });
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to delete booking' });
    }

    return res.json({ message: 'Booking deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/affiliate-clicks', async (req, res) => {
  if (!ensureAirtable(res)) return;
  try {
    const affiliateId = req.query?.affiliate_id;
    const limit = Number(req.query?.limit || 500);

    const paramsWithSort = new URLSearchParams();
    paramsWithSort.set('maxRecords', String(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 1000)) : 500));
    paramsWithSort.set('sort[0][field]', 'clicked_at');
    paramsWithSort.set('sort[0][direction]', 'desc');

    if (affiliateId) {
      paramsWithSort.set('filterByFormula', `{affiliate_id}='${escapeFormulaValue(affiliateId)}'`);
    }

    let response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE, paramsWithSort.toString()), {
      method: 'GET',
      headers: airtableHeaders(),
    });
    let payload = await response.json();

    if (!response.ok && payload?.error?.message?.includes('Unknown field name: "clicked_at"')) {
      const paramsNoSort = new URLSearchParams();
      paramsNoSort.set('maxRecords', String(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 1000)) : 500));
      if (affiliateId) {
        paramsNoSort.set('filterByFormula', `{affiliate_id}='${escapeFormulaValue(affiliateId)}'`);
      }

      response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE, paramsNoSort.toString()), {
        method: 'GET',
        headers: airtableHeaders(),
      });
      payload = await response.json();
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to fetch affiliate clicks' });
    }

    return res.json((payload.records || []).map(mapAffiliateClick));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/affiliate-clicks', async (req, res) => {
  if (!ensureAirtable(res)) return;
  try {
    const { id, hotel_name, hotel_url, affiliate_id, referrer, user_agent, clicked_at } = req.body || {};
    if (!hotel_name || !hotel_url) {
      return res.status(400).json({ error: 'Missing required fields: hotel_name and hotel_url' });
    }

    const response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE), {
      method: 'POST',
      headers: airtableHeaders(),
      body: JSON.stringify({
        fields: {
          id: id || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
          hotel_name,
          hotel_url,
          affiliate_id: affiliate_id || '',
          referrer: referrer || '',
          user_agent: user_agent || '',
          clicked_at: clicked_at || new Date().toISOString(),
        },
      }),
    });
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: payload?.error?.message || 'Failed to create affiliate click' });
    }

    return res.status(201).json(mapAffiliateClick(payload));
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