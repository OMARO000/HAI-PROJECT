import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.HAI_ANTHROPIC_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "HAI_ANTHROPIC_KEY not set" }, { status: 500 });
    }
    const client = new Anthropic({ apiKey });
    const { messages, system } = await req.json();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    });
    return NextResponse.json({ content: (response.content[0] as { text: string }).text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
