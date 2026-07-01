const NOTIFY_TO = 'billing@morning-glory-construction.com';
const FROM_ADDRESS = 'Morning Glory Construction <onboarding@resend.dev>';

const STATUS_LABELS = {
  vacant: 'Vacant',
  'partially-leased': 'Partially Leased',
  'needs-remodel': 'Needs Remodel',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendEmail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Resend error ${response.status}: ${await response.text()}`);
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { name, phone, email, address, sqft, status } = body;

  if (!name || !phone || !email || !address || !sqft || !status || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const statusLabel = STATUS_LABELS[status] || status;

  try {
    await sendEmail(apiKey, {
      from: FROM_ADDRESS,
      to: NOTIFY_TO,
      reply_to: email,
      subject: `New lead: ${name} — ${address}`,
      text: [
        'New "Qualify Your Property" submission from morning-glory-constructions.com',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Property Address: ${address}`,
        `Est. Square Footage: ${sqft}`,
        `Current Status: ${statusLabel}`,
      ].join('\n'),
    });
  } catch (err) {
    console.error('Lead notification email failed:', err);
    return res.status(502).json({ error: 'Failed to send notification email' });
  }

  try {
    await sendEmail(apiKey, {
      from: FROM_ADDRESS,
      to: email,
      subject: 'We received your property details — Morning Glory Construction',
      text: [
        `Hi ${name},`,
        '',
        `Thanks for reaching out to Morning Glory Construction. We received the details for ${address} and a member of our team will review your property and follow up within one business day.`,
        '',
        'If anything changes in the meantime, just reply to this email or call us at (574) 207-4857.',
        '',
        '— Morning Glory Construction',
      ].join('\n'),
    });
  } catch (err) {
    console.error('Visitor confirmation email failed (non-fatal):', err);
  }

  return res.status(200).json({ ok: true });
};
