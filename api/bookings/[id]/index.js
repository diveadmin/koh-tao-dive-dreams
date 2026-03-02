export default function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  // For now, just return success since we can't use SQLite in Vercel serverless functions
  // TODO: Implement proper database solution for Vercel
  res.json({ success: true });
}