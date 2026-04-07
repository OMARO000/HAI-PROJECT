import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, org, country, type } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // Check for duplicate
    const { data: existing } = await supabaseAdmin
      .from("pledges")
      .select("id, verified")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.verified) {
        return NextResponse.json({ error: "This email has already signed the pledge." }, { status: 409 });
      }
      // Resend verification if not yet verified
    }

    // Get country from IP if not provided
    let resolvedCountry = country;
    if (!resolvedCountry) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
      try {
        const geo = await fetch(`https://ipapi.co/${ip}/json/`);
        const geoData = await geo.json();
        resolvedCountry = geoData.country_name || null;
      } catch {
        resolvedCountry = null;
      }
    }

    // Upsert pledge (unverified)
    const { data: pledge, error } = await supabaseAdmin
      .from("pledges")
      .upsert({ name, email, org: org || null, country: resolvedCountry, type: type || "individual", verified: false })
      .select()
      .single();

    if (error) throw error;

    // Send verification email
    const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://haiproject.xyz"}/api/verify?token=${pledge.verification_token}`;

    await resend.emails.send({
      from: "HAI Project <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your HAI Standard pledge",
      html: `
        <div style="font-family: monospace; max-width: 520px; margin: 0 auto; background: #0B1929; color: #DCE4EC; padding: 2.5rem; border: 1px solid rgba(168,184,200,0.2);">
          <p style="color: #B85C38; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem;">Honorable AI Standard</p>
          <h1 style="font-size: 1.6rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem; color: #FFFFFF;">Confirm your pledge.</h1>
          <p style="color: #7A96B0; line-height: 1.7; margin-bottom: 2rem;">
            Hi ${name}, click below to confirm your signature on the HAI Standard registry. This link expires in 24 hours.
          </p>
          <a href="${verifyUrl}" style="display: inline-block; background: #B85C38; color: #FFFFFF; padding: 0.8rem 1.75rem; text-decoration: none; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;">
            Confirm pledge →
          </a>
          <p style="color: #4A6070; font-size: 0.72rem; margin-top: 2rem; line-height: 1.6;">
            If you did not sign the HAI Standard pledge, ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Check your email to confirm your pledge." });
  } catch (err) {
    console.error("Pledge error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
