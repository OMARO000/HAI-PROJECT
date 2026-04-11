import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, pillar, description, email } = body;

  if (!slug || !pillar || !description?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // TODO: persist to database and notify reviewers
  console.log("[registry:dispute]", { slug, pillar, email: email.trim() });

  return NextResponse.json({ success: true });
}
