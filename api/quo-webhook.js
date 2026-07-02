const crypto = require('crypto');

const NOTIFY_TO = process.env.LEAD_NOTIFY_EMAIL || 'g@reprime.com';
const FROM_ADDRESS = 'Morning Glory Construction <onboarding@resend.dev>';

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function verifySignature(header, rawBody, signingSecret) {
  if (!header) return false;
  const parts = header.split(';');
  if (parts.length !== 4) return false;
  const [scheme, , timestamp, signature] = parts;
  if (scheme !== 'hmac') return false;

  const key = Buffer.from(signingSecret, 'base64');
  const message = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', key).update(message).digest('base64');

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

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

function formatCallEmail(event) {
  const obj = (event.data && event.data.object) || {};
  const lines = [
    'You have received a new phone call/voicemail from the Morning Glory Construction line.',
    '',
    `Quo event: ${event.type}`,
    '',
    `From: ${obj.from || 'unknown'}`,
    `To: ${obj.to || 'unknown'}`,
    `Direction: ${obj.direction || 'unknown'}`,
    `Status: ${obj.status || 'unknown'}`,
  ];
  if (obj.duration != null) lines.push(`Duration: ${obj.duration}s`);
  if (obj.voicemail && obj.voicemail.url) {
    lines.push('', `Voicemail recording: ${obj.voicemail.url}`);
    if (obj.voicemail.duration != null) lines.push(`Voicemail duration: ${obj.voicemail.duration}s`);
  }
  if (obj.summary) lines.push('', `AI call summary: ${obj.summary}`);
  if (obj.transcript) lines.push('', `Transcript: ${obj.transcript}`);
  return lines.join('\n');
}

function formatMessageEmail(event) {
  const obj = (event.data && event.data.object) || {};
  return [
    'You have received a new text message on the Morning Glory Construction line.',
    '',
    `Quo event: ${event.type}`,
    '',
    `From: ${obj.from || 'unknown'}`,
    `To: ${obj.to || 'unknown'}`,
    `Message: ${obj.body || '(no body)'}`,
  ].join('\n');
}

const SUBJECTS = {
  'call.completed': 'Missed call / voicemail',
  'call.summary.completed': 'Call summary ready',
  'call.transcript.completed': 'Call transcript ready',
  'call.recording.completed': 'Call recording ready',
  'message.received': 'New text message',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signingSecret = process.env.QUO_WEBHOOK_SIGNING_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!signingSecret || !resendApiKey) {
    console.error('QUO_WEBHOOK_SIGNING_SECRET or RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  const rawBody = await readRawBody(req);

  if (!verifySignature(req.headers['openphone-signature'], rawBody, signingSecret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const isMessage = event.type === 'message.received';
  const subject = SUBJECTS[event.type] || `Quo event: ${event.type}`;
  const text = isMessage ? formatMessageEmail(event) : formatCallEmail(event);

  try {
    await sendEmail(resendApiKey, {
      from: FROM_ADDRESS,
      to: NOTIFY_TO,
      subject: `[Morning Glory Construction] ${subject}`,
      text,
    });
  } catch (err) {
    console.error('Quo webhook notification email failed:', err);
    return res.status(502).json({ error: 'Failed to send notification email' });
  }

  return res.status(200).json({ ok: true });
};
