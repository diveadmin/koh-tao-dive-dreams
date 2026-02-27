const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const BOOKINGS_TABLE = process.env.AIRTABLE_BOOKINGS_TABLE || 'bookings';

const escapeFormulaValue = (value = '') => String(value).replace(/'/g, "\\'");

const airtableUrl = (table, query = '') => {
  const encodedTable = encodeURIComponent(table);
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTable}${query ? `?${query}` : ''}`;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
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

const getHeaders = () => ({
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
});

export default async function handler(req, res) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  }

  try {
    if (req.method === 'GET') {
      const paramsWithSort = new URLSearchParams();
      paramsWithSort.set('maxRecords', '500');
      paramsWithSort.set('sort[0][field]', 'created_at');
      paramsWithSort.set('sort[0][direction]', 'desc');

      let response = await fetch(airtableUrl(BOOKINGS_TABLE, paramsWithSort.toString()), {
        method: 'GET',
        headers: getHeaders(),
      });
      let payload = await response.json();

      if (!response.ok && payload?.error?.message?.includes('Unknown field name: "created_at"')) {
        const paramsNoSort = new URLSearchParams();
        paramsNoSort.set('maxRecords', '500');
        response = await fetch(airtableUrl(BOOKINGS_TABLE, paramsNoSort.toString()), {
          method: 'GET',
          headers: getHeaders(),
        });
        payload = await response.json();
      }

      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to fetch bookings' });
      }

      const bookings = (payload.records || []).map(mapBooking);
      return res.status(200).json(bookings);
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      if (!body.name || !body.email) {
        return res.status(400).json({ error: 'Missing required fields: name and email' });
      }

      const fields = {
        id: body.id || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
        name: body.name,
        email: body.email,
        ...(body.phone ? { phone: body.phone } : {}),
        course_title: body.course_title || '',
        preferred_date: body.preferred_date || new Date().toISOString().slice(0, 10),
        ...(body.experience_level ? { experience_level: body.experience_level } : {}),
        ...(body.message ? { message: body.message } : {}),
        status: body.status || 'pending',
        created_at: body.created_at || new Date().toISOString(),
      };

      const response = await fetch(airtableUrl(BOOKINGS_TABLE), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ fields }),
      });

      const payload = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to create booking' });
      }

      return res.status(201).json(mapBooking(payload));
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/bookings error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}