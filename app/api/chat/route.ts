import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ensure you set GEMINI_API_KEY in your .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API Key not configured. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are ORBYT, an intelligent AI campus agent. Your goal is to help students and faculty by answering questions based on campus data. 
      Tone: Professional, helpful, concise.
      Rules:
      1. If the user asks about attendance, inform them their current attendance is 84.5% (safely above the 75% threshold).
      2. If they ask about events or clubs, mention the Microsoft Innovations Club recruiting for ML, and the Campus Hackathon on Oct 15-17.
      3. If they ask about safety, explain how they can trigger an SOS on the dashboard.
      4. Always format your responses cleanly using markdown (bullet points, bold text).
      (Note: This is a simulated knowledge base for the hackathon demo.)` 
    });

    // Format all messages into a single prompt to avoid strict Gemini history alternation errors
    const prompt = messages.map((m: any) => `${m.role === 'user' ? 'User' : 'ORBYT'}: ${m.content}`).join('\n\n') + '\n\nORBYT:';

    const result = await model.generateContentStream(prompt);

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            // Next.js AI SDK compatible stream format (simplified)
            // For a basic implementation without the Vercel AI SDK wrapper:
            controller.enqueue(encoder.encode(chunkText));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
