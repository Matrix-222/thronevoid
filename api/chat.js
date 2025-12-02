import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing API Key" });

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: req.body.message }
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
}
