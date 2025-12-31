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
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f0f0f;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f0f0f;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a2a;">
                
                <!-- Header with Logo -->
                <tr>
                  <td align="center" style="padding: 50px 20px; background-image: url('https://cineoai.com/bg-image.avif'); background-size: cover; background-position: center; position: relative;">
                    <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(185, 28, 28, 0.85) 0%, rgba(124, 18, 18, 0.9) 100%);"></div>
                    <img src="https://cineoai.com/Cineo_Logo.gif" alt="CINEO" style="width: 300px; height: auto; display: block; margin: 0 auto; position: relative; z-index: 1;" />
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 20px 0; text-align: center; font-weight: 600;">
                      ${
                        name
                          ? `Hey ${name}, welcome aboard! 🎬`
                          : "Welcome to Cineo! 🎬"
                      }
                    </h1>
                    
                    <p style="color: #d1d1d1; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; text-align: center;">
                      You're in! We're building an AI-powered movie companion that actually understands your taste. You'll get <strong style="color: #ffffff;">beta access</strong> when testing begins.
                    </p>
                    
                    
                    ${
                      referralCode
                        ? `
                    <!-- Rewards & Referral Box Combined -->
                    <div style="background: linear-gradient(135deg, #3a1a1a 0%, #2a1515 100%); border: 1px solid #4a2020; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center;">
                      <h2 style="color: #ff0000; font-size: 22px; margin: 0 0 20px 0; font-weight: 600;">
                        🎁 Your Early Supporter Rewards
                      </h2>
                      
                      <p style="color: #d1d1d1; font-size: 15px; margin: 0 0 15px 0; font-weight: 600;">
                        At public launch:
                      </p>
                      
                      <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 0 0 20px 0; text-align: left;">
                        <p style="color: #ffffff; font-size: 16px; margin: 0 0 12px 0;">
                          ✓ <strong>1 MONTH FREE</strong> - just for signing up
                        </p>
                        <p style="color: #ffffff; font-size: 16px; margin: 0 0 15px 0;">
                          ✓ <strong>+1 MONTH at 50% OFF</strong> - for each friend you invite
                        </p>
                        <p style="color: #e87d7d; font-size: 16px; font-weight: 600; margin: 0;text-align: center;">
                          Invite 6 friends = 7 months of Premium 🚀
                        </p>
                      </div>
                      
                      <p style="color: #b8b8b8; font-size: 13px; margin: 0 0 20px 0; font-style: italic;">
                        (P.S. Your friends get 1 month FREE too!)
                      </p>
                      
                      <!-- Copyable Link Box -->
                      <div style="background: rgba(255,255,255,0.1); border: 2px dashed rgba(232, 125, 125, 0.4); border-radius: 8px; padding: 16px; margin: 20px 0 0 0;">
                        <p style="color: #ffffff; font-size: 13px; margin: 0 0 8px 0; font-weight: 600;">
                          📋 Your Referral Link (click to select & copy):
                        </p>
                        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; margin: 0;">
                          <a href="https://cineoai.com/?ref=${referralCode}" style="color: #ffffff !important; font-size: 14px; word-break: break-all; user-select: all; cursor: text; font-family: 'Courier New', monospace; text-decoration: none; display: block;">https://cineoai.com/?ref=${referralCode}</a>
                        </div>
                      </div>
                    </div>
                    `
                        : ""
                    }
                    
                    <p style="color: #d1d1d1; font-size: 15px; line-height: 1.8; margin: 30px 0 20px 0;">
                      Stay in the loop and follow us:
                    </p>
                    
                    <!-- Social Links -->
                    <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 12px;">
                          <a href="https://www.instagram.com/cineo_app/" style="display: inline-block; padding: 12px 20px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius: 10px; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600;">
                            <span style="font-size: 20px; margin-right: 8px;">📷</span>Instagram
                          </a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="https://www.facebook.com/cineoapp/" style="display: inline-block; padding: 12px 20px; background-color: #1877F2; border-radius: 10px; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600;">
                            <span style="font-size: 20px; margin-right: 8px;">📘</span>Facebook
                          </a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="https://linkedin.com/company/cineo-app" style="display: inline-block; padding: 12px 20px; background-color: #0A66C2; border-radius: 10px; text-decoration: none; color: #ffffff; font-size: 16px; font-weight: 600;">
                            <span style="font-size: 20px; margin-right: 8px;">💼</span>LinkedIn
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #0f0f0f; text-align: center; border-top: 1px solid #2a2a2a;">
                    <p style="color: #888888; font-size: 13px; margin: 0 0 10px 0;">
                      Stop scrolling. Start watching.
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
        subject: "Welcome to Cineo - You're on the list! 🎬",
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
