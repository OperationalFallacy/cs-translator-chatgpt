// app/api/openai.ts

import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    // Convert the ReadableStream to a Buffer and then to a string
    const buffer = await new Response(req.body).arrayBuffer();
    const requestBody = JSON.parse(Buffer.from(buffer).toString("utf8"));

    console.log("REQUEST", requestBody.text); // This should print the request body
    const aiConfig = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });

    const openai = new OpenAIApi(aiConfig);
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful translator assistant." },
          { role: "user", content: `Translate following text to ${requestBody.targetLanguage}.\n
          TEXT
          ${requestBody.text}` },
        ],
      });

      console.log("RESPONSE", response.data.choices[0].message?.content);

      if (
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        const translation = response.data.choices[0].message?.content;
        return NextResponse.json({ translation });
      } else {
        return NextResponse.error();
      }
    } catch (error) {
      return NextResponse.error();
    }
  }
}
