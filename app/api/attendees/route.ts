import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? "RSVPs";

  if (!apiKey || !baseId) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}` +
    `?filterByFormula=OR({Attending}="yes",{Attending}="maybe")` +
    `&fields[]=Name&fields[]=Attending&fields[]=Note&fields[]=HelmetDesign&fields[]=HelmetColor`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  const data = await res.json();
  const records = (data.records ?? []).map((r: { fields: Record<string, string> }) => ({
    name: r.fields.Name ?? "",
    attending: r.fields.Attending ?? "",
    note: r.fields.Note ?? "",
    helmetDesign: r.fields.HelmetDesign ?? "solid",
    helmetColor: r.fields.HelmetColor ?? "scuderia",
  }));

  return NextResponse.json({ records });
}
