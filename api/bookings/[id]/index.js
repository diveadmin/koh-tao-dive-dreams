import { applyCors, handleOptions } from '../../_lib/cors.js';
import { requireAdmin } from '../../_lib/auth.js';

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

const getHeaders = () => ({
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
});

const findAirtableRecordByPublicId = async (publicId) => {
  const params = new URLSearchParams();
  params.set('maxRecords', '1');
  params.set('filterByFormula', `{id}='${escapeFormulaValue(publicId)}'`);

  const response = await fetch(airtableUrl(BOOKINGS_TABLE, params.toString()), {
    method: 'GET',
    headers: getHeaders(),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Failed to query booking');
  }

  return payload.records?.[0] || null;
};

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  try {
    const { id } = req.query || {};
    if (!id) {
      return res.status(400).json({ error: 'Missing booking id' });
    }

    const airtableRecord = await findAirtableRecordByPublicId(id);
    if (!airtableRecord) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      const updates = parseBody(req);
      const fields = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const response = await fetch(`${airtableUrl(BOOKINGS_TABLE)}/${airtableRecord.id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ fields }),
      });
      const payload = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to update booking' });
      }

      return res.status(200).json({
        id: payload?.fields?.id || payload?.id,
        ...payload?.fields,
      });
    }

    if (req.method === 'DELETE') {
      const response = await fetch(`${airtableUrl(BOOKINGS_TABLE)}/${airtableRecord.id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      const payload = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to delete booking' });
      }

      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'PATCH, PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/bookings/[id] error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}