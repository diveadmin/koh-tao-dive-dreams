export const applyCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const handleOptions = (req, res) => {
  if (req.method === 'OPTIONS') {
    applyCors(res);
    res.status(200).end();
    return true;
  }
  return false;
};
  