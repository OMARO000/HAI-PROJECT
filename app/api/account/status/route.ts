import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("omaro_account")?.value;

  if (!raw) {
    return NextResponse.json({ active: false });
  }

  // Mask middle 8 digits: "2847 1039 5621 7483" → "2847 **** **** 7483"
  const parts = raw.split(" ");
  let masked = raw;
  if (parts.length === 4) {
    masked = `${parts[0]} **** **** ${parts[3]}`;
  }

  return NextResponse.json({ active: true, masked });
}
