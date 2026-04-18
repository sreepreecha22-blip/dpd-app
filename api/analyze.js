export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { input } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5.3",
      messages: [
        {
          role: "system",
          content: `You are a DPD Auto Card Selector.

Classify user state into:
- feeling
- craving
- thought
- loop
- tension
- reaction

Then output card in Thai:

[Card Name] ([Thai])

สัญญาณ:
...

เช็ค:
...

ใช้:
...

Keep it short.`
        },
        {
          role: "user",
          content: input
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.choices[0].message.content
  });
}
