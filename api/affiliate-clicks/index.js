import { applyCors, handleOptions } from '../_lib/cors.js';

const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AFFILIATE_CLICKS_TABLE = process.env.AIRTABLE_AFFILIATE_CLICKS_TABLE || 'affiliate_clicks';

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

const mapClickRecord = (record) => {
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

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  }

  try {
    if (req.method === 'GET') {
      const { affiliate_id } = req.query || {};
      const limit = Number(req.query?.limit || 500);

      const paramsWithSort = new URLSearchParams();
      paramsWithSort.set('maxRecords', String(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 1000)) : 500));
      paramsWithSort.set('sort[0][field]', 'clicked_at');
      paramsWithSort.set('sort[0][direction]', 'desc');

      if (affiliate_id) {
        paramsWithSort.set('filterByFormula', `{affiliate_id}='${escapeFormulaValue(affiliate_id)}'`);
      }

      let response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE, paramsWithSort.toString()), {
        method: 'GET',
        headers: getHeaders(),
      });
      let payload = await response.json();

      if (!response.ok && payload?.error?.message?.includes('Unknown field name: "clicked_at"')) {
        const paramsNoSort = new URLSearchParams();
        paramsNoSort.set('maxRecords', String(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 1000)) : 500));
        if (affiliate_id) {
          paramsNoSort.set('filterByFormula', `{affiliate_id}='${escapeFormulaValue(affiliate_id)}'`);
        }

        response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE, paramsNoSort.toString()), {
          method: 'GET',
          headers: getHeaders(),
        });
        payload = await response.json();
      }

      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to fetch affiliate clicks' });
      }

      return res.status(200).json((payload.records || []).map(mapClickRecord));
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      if (!body.hotel_name || !body.hotel_url) {
        return res.status(400).json({ error: 'Missing required fields: hotel_name and hotel_url' });
      }

      const fields = {
        id: body.id || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`),
        hotel_name: body.hotel_name,
        hotel_url: body.hotel_url,
        affiliate_id: body.affiliate_id || '',
        referrer: body.referrer || '',
        user_agent: body.user_agent || '',
        clicked_at: body.clicked_at || new Date().toISOString(),
      };

      const response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ fields }),
      });
      const payload = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: payload?.error?.message || 'Failed to create affiliate click' });
      }

      return res.status(201).json(mapClickRecord(payload));
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/affiliate-clicks error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}