import { applyCors, handleOptions } from '../../_lib/cors.js';
import { requireAdmin } from '../../_lib/auth.js';
import { createClient } from '@supabase/supabase-js';

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

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  applyCors(res);

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  try {
    const { id } = req.query || {};
    if (!id) {
      return res.status(400).json({ error: 'Missing booking id' });
    }

    if (req.method === 'PATCH' || req.method === 'PUT') {
      const body = parseBody(req);
      const updates = { ...body, updated_at: new Date().toISOString() };

      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      return res.status(200).json(data[0]);
    }

    if (req.method === 'DELETE') {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(500).json({ error: error.message });
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
