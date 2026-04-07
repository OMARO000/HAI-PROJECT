import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { count: pledgeCount } = await supabaseAdmin
    .from("pledges")
    .select("*", { count: "exact", head: true })
    .eq("verified", true);

  const { count: orgCount } = await supabaseAdmin
    .from("pledges")
    .select("*", { count: "exact", head: true })
    .eq("type", "organization")
    .eq("verified", true);

  const { data: countries } = await supabaseAdmin
    .from("pledges")
    .select("country")
    .eq("verified", true)
    .not("country", "is", null);

  const uniqueCountries = new Set(countries?.map((r: { country: string }) => r.country).filter(Boolean)).size;

  return NextResponse.json({
    pledgeCount: pledgeCount ?? 0,
    orgCount: orgCount ?? 0,
    countryCount: uniqueCountries ?? 0,
  });
}
