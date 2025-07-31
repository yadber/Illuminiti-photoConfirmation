import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { signature, timestamp } = body;

    if (!signature || !signature.startsWith("data:image/png;base64,")) {
      return NextResponse.json(
        { error: "Invalid signature format" },
        { status: 400 }
      );
    }

    // Decode base64 string to binary
    const base64Data = signature.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure directory exists
    const dir = path.join(process.cwd(), "public", "signatures");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate unique filename
    const filename = `signature-${Date.now()}.png`;
    const filePath = path.join(dir, filename);

    // Save file to disk
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "Signature saved successfully",
      fileUrl: `/signatures/${filename}`,
    });
  } catch (err) {
    console.error("Error saving signature:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
