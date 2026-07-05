const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKwMUN6dRnyxyeNRDVSo8jYyD1HG6vdI5Bnvh1iVX-NO4lmsvmLUdyOqUS7MyFYIAouA/exec';

module.exports = async function handler(req, res) {
  try {
    const query = new URLSearchParams(req.query || {});
    const url = query.toString() ? `${SCRIPT_URL}?${query}` : SCRIPT_URL;
    const options = { method: req.method };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      options.headers = { 'Content-Type': 'text/plain;charset=utf-8' };
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    }

    const upstream = await fetch(url, options);
    const text = await upstream.text();

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    res.status(upstream.status).send(text);
  } catch (error) {
    res.status(502).json({ ok: false, error: String(error && error.message || error) });
  }
};
