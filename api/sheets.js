const SCRIPT_URL =
  process.env.REENTRY_SHEETS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxIrTrNmDltkomEiunQEzHaV1Lwpqn5KY6BE9NXMTwXBS4SeP3rEuZ42NFVni7Tp_IbNQ/exec';

function buildScriptUrl(queryParams) {
  const query = new URLSearchParams(queryParams || {});
  return query.toString() ? `${SCRIPT_URL}?${query}` : SCRIPT_URL;
}

function buildUpstreamOptions(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return { method: req.method };
  }

  return {
    method: req.method,
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}),
  };
}

function setNoStoreJsonHeaders(res, contentType) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', contentType || 'application/json; charset=utf-8');
}

module.exports = async function handler(req, res) {
  try {
    const upstream = await fetch(buildScriptUrl(req.query), buildUpstreamOptions(req));
    const text = await upstream.text();

    setNoStoreJsonHeaders(res, upstream.headers.get('content-type'));
    res.status(upstream.status).send(text);
  } catch (error) {
    setNoStoreJsonHeaders(res);
    res.status(502).json({ ok: false, error: String(error && error.message || error) });
  }
};


