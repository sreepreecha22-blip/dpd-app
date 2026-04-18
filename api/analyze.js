export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { input } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Analyze this user state and respond clearly:\n\n${input}`
      })
    });

    const data = await response.json();

    return res.status(200).json({
      result: data.output[0].content[0].text
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
