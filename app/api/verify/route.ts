import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse("Invalid verification link.", { status: 400 });
  }

  const { data: pledge, error } = await supabaseAdmin
    .from("pledges")
    .select("id, verified, name")
    .eq("verification_token", token)
    .single();

  if (error || !pledge) {
    return new NextResponse("This verification link is invalid or has already been used.", { status: 404 });
  }

  if (pledge.verified) {
    return new NextResponse(verifiedHtml(pledge.name, true), {
      headers: { "Content-Type": "text/html" },
    });
  }

  await supabaseAdmin
    .from("pledges")
    .update({ verified: true })
    .eq("id", pledge.id);

  return new NextResponse(verifiedHtml(pledge.name, false), {
    headers: { "Content-Type": "text/html" },
  });
}

function verifiedHtml(name: string, already: boolean) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Pledge Confirmed — HAI Project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; background: #0B1929; color: #DCE4EC; font-family: monospace; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .box { max-width: 480px; padding: 3rem 2.5rem; border: 1px solid rgba(168,184,200,0.2); text-align: center; }
    .label { color: #B85C38; font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 1.5rem; }
    h1 { font-size: 2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.75rem; }
    p { color: #7A96B0; line-height: 1.7; margin-bottom: 2rem; font-size: 0.85rem; }
    a { display: inline-block; background: #B85C38; color: #fff; padding: 0.7rem 1.5rem; text-decoration: none; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="box">
    <p class="label">[ Pledge Confirmed ]</p>
    <h1>${already ? "Already verified." : "You're on the record."}</h1>
    <p>${already ? "Your pledge was already confirmed." : `Welcome to the registry, ${name}. Your signature stands.`}</p>
    <a href="https://haiproject.xyz">Return to HAI Project →</a>
  </div>
</body>
</html>`;
}
