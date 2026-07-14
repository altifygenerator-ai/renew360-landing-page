import { Resend } from 'resend';

export const runtime = 'nodejs';

const businessEmail = process.env.RENEW360_EMAIL || 'renew360cleaning@gmail.com';
const leadCopyEmail = process.env.HWS_LEAD_COPY_EMAIL || 'altifygenerator@gmail.com';
const fromEmail =
  process.env.RESEND_FROM_EMAIL || 'Renew 360 Website <quotes@hometownwebservicesar.cc>';

function clean(value, maxLength = 500) {
  return String(value || '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildEmail({ name, phone, email, service, location, details }) {
  const submittedAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Chicago'
  }).format(new Date());

  const rows = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || 'Not provided'],
    ['Service', service],
    ['City or area', location || 'Not provided'],
    ['Submitted', `${submittedAt} CT`]
  ];

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #d9e5eb;font-weight:700;color:#072b58;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #d9e5eb;color:#24384a;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#eef6f9;padding:24px;color:#101b2a;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-top:8px solid #072b58;">
        <div style="padding:24px 24px 14px;">
          <p style="margin:0 0 6px;color:#79ad2a;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;">Renew 360 website lead</p>
          <h1 style="margin:0;color:#072b58;font-size:28px;line-height:1.1;">New quote request from ${escapeHtml(name)}</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
        <div style="padding:22px 24px 26px;">
          <p style="margin:0 0 8px;color:#072b58;font-weight:800;">Details</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;color:#24384a;">${escapeHtml(details)}</p>
        </div>
      </div>
    </div>`;

  const text = [
    'New Renew 360 website quote request',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `Service: ${service}`,
    `City or area: ${location || 'Not provided'}`,
    `Submitted: ${submittedAt} CT`,
    '',
    'Details:',
    details
  ].join('\n');

  return { html, text };
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return Response.json(
      { error: 'The quote form is not configured yet. Please call or text Rebecca.' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  const website = clean(body.website, 200);
  if (website) {
    return Response.json({ ok: true });
  }

  const submission = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    service: clean(body.service, 120),
    location: clean(body.location, 100),
    details: clean(body.details, 2000)
  };

  if (!submission.name || !submission.phone || !submission.service || !submission.details) {
    return Response.json(
      { error: 'Please complete the required fields before sending.' },
      { status: 400 }
    );
  }

  if (submission.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const message = buildEmail(submission);
  const replyTo = submission.email || undefined;

  try {
    const [businessResult, copyResult] = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [businessEmail],
        replyTo,
        subject: `New quote request: ${submission.name} — ${submission.service}`,
        html: message.html,
        text: message.text
      }),
      resend.emails.send({
        from: fromEmail,
        to: [leadCopyEmail],
        replyTo,
        subject: `Renew 360 lead copy: ${submission.name} — ${submission.service}`,
        html: message.html,
        text: message.text
      })
    ]);

    if (businessResult.error || copyResult.error) {
      console.error('Resend delivery error:', {
        business: businessResult.error,
        leadCopy: copyResult.error
      });
      return Response.json(
        { error: 'We could not send your request. Please call or text Rebecca.' },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Quote form error:', error);
    return Response.json(
      { error: 'We could not send your request. Please call or text Rebecca.' },
      { status: 500 }
    );
  }
}
