import { applyCors, handleOptions } from '../_lib/cors.js';
import { requireAdmin } from '../_lib/auth.js';
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

  try {
    if (req.method === 'GET') {
      const adminUser = await requireAdmin(req, res);
      if (!adminUser) return;

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      if (!body.name || !body.email) {
        return res.status(400).json({ error: 'Missing required fields: name and email' });
      }

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
