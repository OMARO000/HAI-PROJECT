import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { accountHash } = await req.json();

    if (!accountHash) {
      return NextResponse.json({ error: "Account hash is required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("omaro_accounts")
      .insert({ account_hash: accountHash, product_flags: { hai: true } });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "This account already exists." }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account create error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
