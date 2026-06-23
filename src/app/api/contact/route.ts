import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "El nombre, el correo y el mensaje son obligatorios." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey || apiKey === "YOUR_BREVO_API_KEY_HERE") {
      console.warn("Brevo API key is not configured. Simulating success in development.");
      return NextResponse.json({
        success: true,
        warning: "Brevo API Key no configurada. El mensaje fue procesado pero no enviado.",
        data: { name, email, phone, message }
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "jhonspillaca12@gmail.com";
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || "jhonspillaca12@gmail.com";

    // Brevo API transactional email request payload
    const brevoPayload = {
      sender: {
        name: name,
        email: senderEmail
      },
      to: [
        {
          email: receiverEmail,
          name: "Jhon Pillaca"
        }
      ],
      replyTo: {
        email: email,
        name: name
      },
      subject: `Nuevo mensaje de contacto de ${name}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #1f2937;
              line-height: 1.6;
              background-color: #f9fafb;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 32px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              background-color: #ffffff;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }
            .header {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 24px;
              color: #4f46e5;
              border-bottom: 2px solid #f3f4f6;
              padding-bottom: 16px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: 600;
              color: #4b5563;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 6px;
              display: block;
            }
            .value {
              font-size: 15px;
              color: #111827;
              background-color: #f3f4f6;
              padding: 12px 16px;
              border-radius: 8px;
              white-space: pre-wrap;
              word-break: break-word;
            }
            .footer {
              font-size: 11px;
              color: #9ca3af;
              margin-top: 32px;
              border-top: 1px solid #e5e7eb;
              padding-top: 16px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Nuevo mensaje de contacto - Portafolio</div>
            <div class="field">
              <span class="label">Nombre</span>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
              <span class="label">Correo Electrónico</span>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            <div class="field">
              <span class="label">Teléfono / Celular</span>
              <div class="value">${phone?.trim() ? escapeHtml(phone) : "No especificado"}</div>
            </div>
            <div class="field">
              <span class="label">Mensaje</span>
              <div class="value">${escapeHtml(message)}</div>
            </div>
            <div class="footer">
              Este correo fue enviado automáticamente desde el formulario de tu portafolio.
            </div>
          </div>
        </body>
        </html>
      `
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(brevoPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Brevo API:", errorText);
      return NextResponse.json(
        { error: `Error de Brevo: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, messageId: data.messageId });

  } catch (error: any) {
    console.error("Contact API handler error:", error);
    return NextResponse.json(
      { error: error?.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
