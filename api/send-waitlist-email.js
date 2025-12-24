// Vercel Edge Function for email sending
export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  console.log("=== EMAIL API STARTED ===");
  console.log("API Key exists:", !!process.env.RESEND_API_KEY);

  // CHECK API KEY FIRST
  if (!process.env.RESEND_API_KEY) {
    console.error("ERROR: RESEND_API_KEY is not set!");
    return new Response(
      JSON.stringify({
        error: "Server configuration error: RESEND_API_KEY not found",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const { email, name, referralCode } = await req.json();
  console.log("Request body:", { email, name, referralCode });

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0f0f0f;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0f0f;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
                
                <tr>
                  <td align="center" style="padding: 40px 20px; background: linear-gradient(135deg, #b91c1c 0%, #7c1212 100%);">
                    <h1 style="color: white; font-size: 48px; margin: 0; font-weight: bold;">CINEO</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 40px 30px;">
                    <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px 0; text-align: center;">
                      ${name ? `Welcome, ${name}!` : "Welcome to Cineo!"} 🎉
                    </h1>
                    
                    <p style="color: #d1d1d1; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Thank you for joining our waitlist! You're now part of an exclusive group who will be among the first to experience AI-powered movie discovery.
                    </p>
                    
                    <h2 style="color: #ffffff; font-size: 20px; margin: 30px 0 15px 0;">
                      What's Next?
                    </h2>
                    
                    <ul style="color: #d1d1d1; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                      <li>Early access when we launch</li>
                      <li><strong style="color: #b91c1c;">50% OFF your first month</strong></li>
                      <li>Exclusive beta testing opportunities</li>
                      <li>Priority support</li>
                    </ul>

                    ${
                      referralCode
                        ? `
                    <div style="background-color: #2a2a2a; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: center;">
                      <p style="color: #ffffff; font-size: 16px; margin: 0 0 10px 0;">
                        🎁 <strong>Share & Get Rewarded!</strong>
                      </p>
                      <p style="color: #d1d1d1; font-size: 14px; margin: 0 0 15px 0;">
                        Share Cineo with friends and BOTH get 50% off!
                      </p>
                      <a href="https://cineoai.com/?ref=${referralCode}" 
                         style="display: inline-block; background-color: #b91c1c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                        Your Invite Link
                      </a>
                    </div>
                    `
                        : ""
                    }
                    
                    <p style="color: #d1d1d1; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                      Follow us to stay updated:
                    </p>
                    
                    <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/cineo_app/" style="text-decoration: none; color: #b91c1c;">
                            📸 Instagram
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/cineoapp/" style="text-decoration: none; color: #b91c1c;">
                            📘 Facebook
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://linkedin.com/company/cineo-app" style="text-decoration: none; color: #b91c1c;">
                            💼 LinkedIn
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 30px; background-color: #0f0f0f; text-align: center;">
                    <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">
                      Discover your next favorite movie with AI
                    </p>
                    <p style="color: #666666; font-size: 12px; margin: 0;">
                      © 2025 Cineo. All rights reserved.
                    </p>
                    <p style="color: #666666; font-size: 11px; margin: 10px 0 0 0;">
                      <a href="https://cineoai.com" style="color: #b91c1c; text-decoration: none;">cineoai.com</a>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    console.log("Calling Resend API...");

    // Direct Resend API call (no SDK)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Cineo <info@cineoai.com>",
        to: [email],
        subject: "You're on the Cineo Waitlist! 🎬",
        html: emailHtml,
      }),
    });

    console.log("Resend API response status:", response.status);

    const data = await response.json();
    console.log("Resend API response data:", data);

    if (!response.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          details: data,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    console.log("✅ SUCCESS! Email sent:", data.id);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("❌ CATCH ERROR:", error.message);
    console.error("Stack:", error.stack);

    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
