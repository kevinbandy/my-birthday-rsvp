import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, attending, racingLevel, note } = await req.json();

  if (!name || !attending) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "RSVPs";

  if (!apiKey || !baseId) {
    console.error("Missing Airtable env vars");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Attending: attending,
          RacingLevel: racingLevel || "",
          Note: note || "",
          CreatedAt: new Date().toISOString(),
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable error:", err);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
