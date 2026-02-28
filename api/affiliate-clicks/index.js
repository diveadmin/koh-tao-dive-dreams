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
    clicked_at: fields.clicked_at || record.createdTime || null,
    referrer: fields.referrer || null,
    user_agent: fields.user_agent || null,
  };
};

const compactFields = (fields) =>
  Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

const createRecordWithSchemaFallback = async (baseFields) => {
  let fields = { ...baseFields };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const response = await fetch(airtableUrl(AFFILIATE_CLICKS_TABLE), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ fields }),
    });

    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      return { ok: true, payload, status: response.status };
    }

    const message = payload?.error?.message || '';
    const unknownFieldMatch = message.match(/Unknown field name: \"([^\"]+)\"/);

    if (unknownFieldMatch?.[1] && Object.prototype.hasOwnProperty.call(fields, unknownFieldMatch[1])) {
      delete fields[unknownFieldMatch[1]];
      continue;
    }

    return { ok: false, payload, status: response.status };
  }

  return { ok: false, payload: { error: { message: 'Could not match Airtable table schema for affiliate click insert' } }, status: 400 };
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
        const escapedAffiliateId = escapeFormulaValue(affiliate_id);
        const affiliateIdAsNumber = Number(affiliate_id);
        const isNumericAffiliateId = Number.isFinite(affiliateIdAsNumber);
        const filterFormula = isNumericAffiliateId
          ? `OR({affiliate_id}='${escapedAffiliateId}', {affiliate_id}=${affiliateIdAsNumber})`
          : `{affiliate_id}='${escapedAffiliateId}'`;
        paramsWithSort.set('filterByFormula', filterFormula);
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
          const escapedAffiliateId = escapeFormulaValue(affiliate_id);
          const affiliateIdAsNumber = Number(affiliate_id);
          const isNumericAffiliateId = Number.isFinite(affiliateIdAsNumber);
          const filterFormula = isNumericAffiliateId
            ? `OR({affiliate_id}='${escapedAffiliateId}', {affiliate_id}=${affiliateIdAsNumber})`
            : `{affiliate_id}='${escapedAffiliateId}'`;
          paramsNoSort.set('filterByFormula', filterFormula);
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

      const fields = compactFields({
        hotel_name: body.hotel_name,
        hotel_url: body.hotel_url,
        affiliate_id: body.affiliate_id,
        referrer: body.referrer,
        user_agent: body.user_agent,
        clicked_at: body.clicked_at || new Date().toISOString(),
      });

      const result = await createRecordWithSchemaFallback(fields);

      if (!result.ok) {
        return res.status(result.status).json({ error: result?.payload?.error?.message || 'Failed to create affiliate click' });
      }

      return res.status(201).json(mapClickRecord(result.payload));
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/affiliate-clicks error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}