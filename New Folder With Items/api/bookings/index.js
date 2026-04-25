export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // For now, return empty array since we can't use SQLite in Vercel serverless functions
  // TODO: Implement proper database solution for Vercel
  const bookings = [];

  res.json(bookings);
}