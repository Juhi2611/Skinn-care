import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // your AI logic
  return Response.json({ success: true });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    return NextResponse.json({
      reply: response.output_text, // ✅ correct
    });

  } catch (error) {
    console.error("🔥 API ERROR:", error);

    return NextResponse.json({
      reply: "Server error",
    }, { status: 500 });
  }
}
