import { applyCors, handleOptions } from '../_lib/cors.js';
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
      const { affiliate_id, limit } = req.query || {};
      const maxRecords = Number(limit || 500);

      let query = supabase
        .from('affiliate_clicks')
        .select('*')
        .order('clicked_at', { ascending: false })
        .limit(Number.isFinite(maxRecords) ? Math.min(maxRecords, 1000) : 500);

      if (affiliate_id) {
        query = query.eq('affiliate_id', affiliate_id);
      }

      const { data, error } = await query;
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      if (!body.hotel_name || !body.hotel_url) {
        return res.status(400).json({ error: 'Missing required fields: hotel_name and hotel_url' });
      }

      const { data, error } = await supabase
        .from('affiliate_clicks')
        .insert([{
          hotel_name: body.hotel_name,
          hotel_url: body.hotel_url,
          affiliate_id: body.affiliate_id || null,
          referrer: body.referrer || null,
          user_agent: body.user_agent || null,
          clicked_at: body.clicked_at || new Date().toISOString(),
        }])
        .select();

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json(data[0]);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('api/affiliate-clicks error', err);
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
}
