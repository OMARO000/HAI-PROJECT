import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashAccountNumber } from "@/lib/account";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { accountNumber } = await req.json();

    if (!accountNumber) {
      return NextResponse.json({ error: "Account number is required." }, { status: 400 });
    }

    const hash = await hashAccountNumber(accountNumber);

    const { data, error } = await supabaseAdmin
      .from("omaro_accounts")
      .select("id, product_flags")
      .eq("account_hash", hash)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: "Account number not found." }, { status: 404 });
    }

    // Ensure hai flag is set
    const updatedFlags = { ...(data.product_flags || {}), hai: true };
    await supabaseAdmin
      .from("omaro_accounts")
      .update({ product_flags: updatedFlags })
      .eq("id", data.id);

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("omaro_account", accountNumber.replace(/\s/g, " ").trim(), {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account login error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
