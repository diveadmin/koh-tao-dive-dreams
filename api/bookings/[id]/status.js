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

    // Placeholder handler: Airtable code removed
    return res.status(501).json({ error: 'Not implemented: Airtable removed.' });
}