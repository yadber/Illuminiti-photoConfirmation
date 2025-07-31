import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { image, tag } = body;

    if (!image || !image.startsWith("data:image/png;base64,")) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const dir = path.join(process.cwd(), "public", "photos");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filename = `photo-${tag}-${Date.now()}.png`;
    const filePath = path.join(dir, filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "Photo saved successfully",
      fileUrl: `/photos/${filename}`,
    });
  } catch (err) {
    console.error("Error saving photo:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
