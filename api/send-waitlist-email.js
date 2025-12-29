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
                  <td align="center" style="padding: 50px 20px; background: linear-gradient(135deg, #b91c1c 0%, #7c1212 100%);">
                    <img src="https://cineoai.com/Cineo_Logo.gif" alt="CINEO" style="width: 200px; height: auto; display: block; margin: 0 auto;" />
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
                    
                    <!-- What's Next Box -->
                    <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%); border: 1px solid #3a3a3a; border-radius: 12px; padding: 25px; margin: 30px 0;">
                      <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
                        🎁 Your Early Access Perks
                      </h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #b91c1c; font-size: 18px; margin-right: 10px;">✓</span>
                            <span style="color: #d1d1d1; font-size: 15px;">First access when we launch in Q1 2025</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #b91c1c; font-size: 18px; margin-right: 10px;">✓</span>
                            <span style="color: #d1d1d1; font-size: 15px;"><strong style="color: #ffffff;">TWO MONTHS FREE</strong> – our gift to early supporters</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #b91c1c; font-size: 18px; margin-right: 10px;">✓</span>
                            <span style="color: #d1d1d1; font-size: 15px;">Beta testing opportunities & direct input</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <span style="color: #b91c1c; font-size: 18px; margin-right: 10px;">✓</span>
                            <span style="color: #d1d1d1; font-size: 15px;">VIP support from the Cineo team</span>
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
                        💰 Double Your Reward!
                      </p>
                      <p style="color: #ffffff; font-size: 15px; margin: 0 0 20px 0; opacity: 0.95;">
                        Share Cineo with friends and you <strong>both</strong> get TWO MONTHS FREE!
                      </p>
                      <a href="https://cineoai.com/?ref=${referralCode}" 
                         style="display: inline-block; background-color: #ffffff; color: #b91c1c; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-top: 10px;">
                        Share Your Invite Link →
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
                        <td style="padding: 0 8px;">
                          <a href="https://www.instagram.com/cineo_app/" style="display: inline-block; padding: 12px; background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius: 10px; text-decoration: none;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
                            </svg>
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="https://www.facebook.com/cineoapp/" style="display: inline-block; padding: 12px; background-color: #1877F2; border-radius: 10px; text-decoration: none;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
                            </svg>
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="https://linkedin.com/company/cineo-app" style="display: inline-block; padding: 12px; background-color: #0A66C2; border-radius: 10px; text-decoration: none;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
                            </svg>
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
