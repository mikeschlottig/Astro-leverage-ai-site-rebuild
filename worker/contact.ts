type EmailBinding = {
  send: (message: {
    to: string | { email: string; name?: string };
    from: string | { email: string; name?: string };
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string | { email: string; name?: string };
  }) => Promise<{ messageId: string }>;
};

type AssetBinding = {
  fetch: (request: Request | string | URL, init?: RequestInit) => Promise<Response>;
};

type Env = {
  ASSETS: AssetBinding;
  EMAIL?: EmailBinding;
  CONTACT_NOTIFICATION_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  PUBLIC_SITE_ORIGIN?: string;
};

const allowedServices = new Set([
  "local-visibility",
  "custom-web-design",
  "lead-capture-ai-follow-up",
  "search-data-architecture",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const wantsJson = (request: Request) =>
  request.headers.get("accept")?.includes("application/json") ?? false;

const jsonError = (message: string, status = 400) =>
  Response.json({ ok: false, error: message }, { status });

const htmlError = (title: string, message: string, backHref: string) =>
  new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #11131a;
        --surface: #171b25;
        --line: #2a303e;
        --ink: #f1ede5;
        --muted: #beb6a8;
        --accent: #d7a449;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem;
        background: linear-gradient(180deg, #0f1218 0%, var(--bg) 100%);
        color: var(--ink);
        font-family: system-ui, sans-serif;
      }
      main {
        width: min(100%, 40rem);
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 0.75rem;
        background: color-mix(in oklab, ${"var(--surface)"} 92%, black 8%);
      }
      h1 { margin: 0 0 1rem; line-height: 1.1; }
      p { color: var(--muted); line-height: 1.7; }
      a {
        display: inline-flex;
        margin-top: 1rem;
        color: #101216;
        background: var(--accent);
        padding: 0.8rem 1rem;
        border-radius: 0.4rem;
        text-decoration: none;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>${title}</h1>
      <p>${message}</p>
      <a href="${backHref}">Return to contact</a>
    </main>
  </body>
</html>`,
    {
      status: 400,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );

const redirectResponse = (location: string) =>
  new Response(null, {
    status: 303,
    headers: {
      location,
    },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const siteOrigin = env.PUBLIC_SITE_ORIGIN ?? url.origin;
      const origin = request.headers.get("origin");
      if (origin && origin !== siteOrigin && origin !== url.origin) {
        return wantsJson(request)
          ? jsonError("Invalid request origin.", 403)
          : htmlError(
              "Request Blocked",
              "This form only accepts requests from the public site origin.",
              `${siteOrigin}/contact`,
            );
      }

      const formData = await request.formData();
      const honeypot = String(formData.get("company_site") ?? "");
      if (honeypot.trim()) {
        return wantsJson(request)
          ? Response.json({ ok: true })
          : redirectResponse(`${siteOrigin}/contact/thanks/`);
      }

      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const service = String(formData.get("service") ?? "").trim();
      const message = String(formData.get("message") ?? "").trim();

      if (!name || !email || !message || !service) {
        return wantsJson(request)
          ? jsonError("Missing required fields.")
          : htmlError(
              "Incomplete Request",
              "Please complete the required fields before submitting the contact form.",
              `${siteOrigin}/contact`,
            );
      }

      if (!allowedServices.has(service)) {
        return wantsJson(request)
          ? jsonError("Invalid service selection.")
          : htmlError(
              "Invalid Service Selection",
              "Please choose one of the listed service focuses before submitting.",
              `${siteOrigin}/contact`,
            );
      }

      if (!emailPattern.test(email)) {
        return wantsJson(request)
          ? jsonError("Please provide a valid email address.")
          : htmlError(
              "Invalid Email",
              "Please return to the contact form and enter a valid email address.",
              `${siteOrigin}/contact`,
            );
      }

      if (message.length < 20) {
        return wantsJson(request)
          ? jsonError("Please add a little more detail so the reply can be useful.")
          : htmlError(
              "More Detail Needed",
              "Please describe what you are trying to fix in a bit more detail so the reply can be useful.",
              `${siteOrigin}/contact`,
            );
      }

      if (!env.EMAIL || !env.CONTACT_NOTIFICATION_EMAIL || !env.CONTACT_FROM_EMAIL) {
        return wantsJson(request)
          ? jsonError("Contact delivery is not configured yet. Please email directly instead.", 503)
          : htmlError(
              "Contact Delivery Not Ready",
              "This contact form is not fully configured yet. Please email mike@leverageai.network directly so the request does not get lost.",
              `${siteOrigin}/contact`,
            );
      }

      try {
        await env.EMAIL.send({
          to: env.CONTACT_NOTIFICATION_EMAIL,
          from: env.CONTACT_FROM_EMAIL,
          subject: `New lead: ${name}${service ? ` (${service})` : ""}`,
          replyTo: email,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Service: ${service || "Not specified"}`,
            "",
            message,
          ].join("\n"),
        });
      } catch (error) {
        console.error("Contact email send failed", error);
        return wantsJson(request)
          ? jsonError("The request could not be delivered. Please try again or email directly.", 502)
          : htmlError(
              "Delivery Failed",
              "The request could not be delivered from the form. Please try again or email mike@leverageai.network directly.",
              `${siteOrigin}/contact`,
            );
      }

      return wantsJson(request)
        ? Response.json({
            ok: true,
            status: "sent",
          })
        : redirectResponse(`${siteOrigin}/contact/thanks/`);
    }

    return env.ASSETS.fetch(request);
  },
};
