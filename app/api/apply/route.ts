import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isWorkEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { company, name, email, role, size, usecase, tier, why } = await req.json();

    if (!company || !name || !email) {
      return NextResponse.json({ error: "Company, name, and email are required." }, { status: 400 });
    }

    if (!isWorkEmail(email)) {
      return NextResponse.json(
        { error: "Please use a work email address. Personal email domains are not accepted for organizational applications." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("applications")
      .insert({ company, name, email, role, size, usecase, tier, why });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
