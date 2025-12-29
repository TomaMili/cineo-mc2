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
                    
                    <p style="color: #d1d1d1; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                      Thanks for joining the Cineo waitlist! You're now part of an exclusive group of movie lovers who will be <strong style="color: #ffffff;">first in line</strong> when we launch.
                    </p>
                    
                    <p style="color: #d1d1d1; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0;">
                      We're building something special: an AI-powered movie companion that actually understands your taste. No more endless scrolling – just movies you'll love.
                    </p>
                    
                    <!-- Launch Reward -->
                    <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); border: 1px solid #3a3a3a; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                      <h2 style="color: #b91c1c; font-size: 20px; margin: 0 0 8px 0; font-weight: 600;">
                        🎁 Your Launch Reward:
                      </h2>
                      <p style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                        1 MONTH FREE Premium
                      </p>
                    </div>
                    
                    <!-- What's Next Box -->
                    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border: 1px solid #3a3a3a; border-radius: 12px; padding: 25px; margin: 30px 0;">
                      <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 12px 0; font-weight: 600;">
                        🚀 Unlock 50% OFF for 6 Months:
                      </h2>
                      
                      <p style="color: #d1d1d1; font-size: 15px; margin: 0 0 16px 0;">
                        Share your invite link with friends and earn:
                      </p>
                      
                      <div style="background: #2a2a2a; padding: 16px; border-radius: 8px; border-left: 4px solid #b91c1c; margin: 0 0 16px 0;">
                        <p style="color: #ffffff; font-size: 18px; font-weight: bold; margin: 0;">
                          Each signup = +1 EXTRA month at 50% OFF
                        </p>
                        <p style="color: #999999; font-size: 14px; margin: 4px 0 0 0;">
                          (Max 6 referrals = 6 months at half price!)
                        </p>
                      </div>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
                        <tr>
                          <td style="text-align: center; padding: 12px; background: #2a2a2a; border-radius: 8px;">
                            <p style="color: #b91c1c; font-weight: bold; margin: 0 0 8px 0; font-size: 16px;">Invite 6 friends</p>
                            <p style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 600;">7 months of premium! 💰</p>
                            <p style="color: #888888; font-size: 13px; margin: 8px 0 0 0;">1 free + 6 at 50% OFF</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    ${
                      referralCode
                        ? `
                    <!-- Referral Box -->
                    <div style="background: linear-gradient(135deg, #b91c1c 0%, #7c1212 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center;">
                      <p style="color: #ffffff; font-size: 20px; margin: 0 0 10px 0; font-weight: 600;">
                        💰 Start Earning 50% OFF!
                      </p>
                      <p style="color: #ffffff; font-size: 15px; margin: 0 0 20px 0; opacity: 0.95;">
                        Each friend who joins gets <strong>1 month FREE</strong> and you get <strong>1 EXTRA month at 50% OFF!</strong>
                      </p>
                      <a href="https://cineoai.com/?ref=${referralCode}" 
                         style="display: inline-block; background-color: #ffffff; color: #b91c1c; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-top: 10px;">
                        Share Your Link →
                      </a>
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
                
                <!-- P.S. Section -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #1a1a1a;">
                    <p style="color: #d1d1d1; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                      <strong style="color: #b91c1c;">P.S.</strong> We're testing in early 2026! 
                      The more friends you invite now, the more you save when we go live. 
                      Start sharing your link today! 🚀
                    </p>
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
        subject: "Welcome to Cineo - Your FREE month is waiting! 🎬",
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
