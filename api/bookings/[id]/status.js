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

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (req.method !== 'PATCH' && req.method !== 'PUT') {
    res.setHeader('Allow', 'PATCH, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { id } = req.query || {};
  const { status } = parseBody(req);

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'paid'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const findParams = new URLSearchParams();
    findParams.set('maxRecords', '1');
    findParams.set('filterByFormula', `{id}='${escapeFormulaValue(id)}'`);

    const lookupRes = await fetch(airtableUrl(BOOKINGS_TABLE, findParams.toString()), {
      method: 'GET',
      headers: getHeaders(),
    });
    const lookupPayload = await lookupRes.json();

    if (!lookupRes.ok) {
      return res.status(lookupRes.status).json({ error: lookupPayload?.error?.message || 'Failed to query booking' });
    }

    const record = lookupPayload.records?.[0];
    if (!record) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const updateRes = await fetch(`${airtableUrl(BOOKINGS_TABLE)}/${record.id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ fields: { status, updated_at: new Date().toISOString() } }),
    });
    const updatePayload = await updateRes.json();

    if (!updateRes.ok) {
      return res.status(updateRes.status).json({ error: updatePayload?.error?.message || 'Failed to update status' });
    }

    return res.status(200).json({
      success: true,
    booking: { id: updatePayload?.fields?.id || id, ...updatePayload?.fields },
    });
  } catch (err) {
    console.error('api/bookings/[id]/status error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}