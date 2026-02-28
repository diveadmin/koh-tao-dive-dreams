import { handleOptions } from '../_lib/cors.js';
import { applyCors, handleOptions } from '../_lib/cors.js';
import { requireAdmin } from '../_lib/auth.js';
import { createClient } from '@supabase/supabase-js';

const AIRTABLE_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const BOOKINGS_TABLE = process.env.AIRTABLE_BOOKINGS_TABLE || 'bookings';

const WRITE_ALIASES = {
  item_type: ['Item type'],
  course_title: ['Course/Dive'],
  preferred_date: ['Preferred Date'],
  experience_level: ['Experience Level'],
  addons: ['Add-ons'],
  addons_json: ['Add-ons JSON'],
  addons_total: ['Add-ons total'],
  subtotal_amount: ['Subtotal amount'],
  total_payable_now: ['Total payable now'],
  internal_notes: ['Internal Notes'],
  created_at: ['Created At'],
  updated_at: ['Updated At'],
};

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

const pickField = (fields, keys = []) => {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(fields, key) && fields[key] !== undefined && fields[key] !== null) {
      return fields[key];
    }
  }
  return null;
};

const toNumberOr = (value, fallback = 0) => {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

const mapBooking = (record) => {
  const fields = record?.fields || {};
  const addonsTotal = pickField(fields, ['addons_total', 'Add-ons total', 'addonsTotal']);
  const subtotalAmount = pickField(fields, ['subtotal_amount', 'Subtotal amount', 'subtotalAmount']);
  const totalPayableNow = pickField(fields, ['total_payable_now', 'Total payable now', 'totalPayableNow']);

  return {
    id: pickField(fields, ['id']) || record.id,
    name: pickField(fields, ['name', 'Name']) || '',
    email: pickField(fields, ['email', 'Email']) || '',
    phone: pickField(fields, ['phone', 'Phone']),
    item_type: pickField(fields, ['item_type', 'Item type', 'itemType']),
    course_title: pickField(fields, ['course_title', 'Course/Dive', 'courseTitle']) || '',
    preferred_date: pickField(fields, ['preferred_date', 'Preferred Date', 'preferredDate']),
    experience_level: pickField(fields, ['experience_level', 'Experience Level', 'experienceLevel']),
    addons: pickField(fields, ['addons', 'Add-ons', 'addOns']),
    addons_json: pickField(fields, ['addons_json', 'Add-ons JSON', 'addonsJson']),
    addons_total: toNumberOr(addonsTotal, 0),
    subtotal_amount: subtotalAmount === null ? null : toNumberOr(subtotalAmount, 0),
    total_payable_now: totalPayableNow === null ? null : toNumberOr(totalPayableNow, 0),
    internal_notes: pickField(fields, ['internal_notes', 'Internal Notes', 'internalNotes']),
    message: pickField(fields, ['message', 'Message']),
    status: pickField(fields, ['status', 'Status']) || 'pending',
    created_at: pickField(fields, ['created_at', 'Created At', 'createdAt']),
    updated_at: pickField(fields, ['updated_at', 'Updated At', 'updatedAt']),
  };
};

const getHeaders = () => ({
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
});

const parseUnknownFieldName = (message = '') => {
  const match = String(message).match(/Unknown field name:\s*"([^"]+)"/i);
  return match?.[1] || null;
};

const mutateFieldsForUnknown = (fields, unknownField) => {
  if (!unknownField || !Object.prototype.hasOwnProperty.call(fields, unknownField)) return null;

  const nextFields = { ...fields };
  const aliases = WRITE_ALIASES[unknownField] || [];
  const aliasTarget = aliases.find((alias) => !Object.prototype.hasOwnProperty.call(nextFields, alias));

  if (aliasTarget) {
    nextFields[aliasTarget] = nextFields[unknownField];
    delete nextFields[unknownField];
    return nextFields;
  }

  delete nextFields[unknownField];
  return nextFields;
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: 'Airtable is not configured. Set AIRTABLE_PERSONAL_ACCESS_TOKEN and AIRTABLE_BASE_ID.' });
  }

  try {
    if (req.method === 'GET') {
      const adminUser = await requireAdmin(req, res);
      if (!adminUser) return;

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

      // Insert booking into Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([body])
        .select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data[0]);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/bookings error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}