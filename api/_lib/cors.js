// Ensures CORS headers are set for all API responses
export const applyCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
};

// Handles OPTIONS preflight requests for CORS
export const handleOptions = (req, res) => {
  if (req.method === 'OPTIONS') {
    applyCors(res);
    res.status(204).end();
    return true;
  }
  return false;
};


app.options('/api/bookings', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(204).end();
});

export const handleOptions = (req, res) => {
  applyCors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
};