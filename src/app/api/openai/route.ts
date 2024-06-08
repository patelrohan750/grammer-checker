import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log("reqBody: ", reqBody);
  const { text } = reqBody;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!text) {
    return NextResponse.json({ message: "Please enter message" });
  }
  if (!apiKey) {
    return NextResponse.json({
      message:
        "Error: the API key is missing, make sure you added it to env.local or to the server",
    });
  }

  const prompt = "Correct this to standard English:\n\n" + text;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      temperature: 0,
      max_tokens: 1024,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    console.log("END PROCESS");
    console.log(response);

    return NextResponse.json({ userInput: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}
