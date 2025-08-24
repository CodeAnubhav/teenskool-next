"use server";

export async function sendMessage(message) {
  try {
    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message');
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('Missing OpenRouter API Key (set in Netlify env vars)');
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful Virtual Mentor focused on startups, business ideas, and growth strategies. Provide practical, actionable advice in a friendly and encouraging tone."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', res.status, errorData);
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();

    if (!data.choices?.[0]?.message) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response structure');
    }

    return data.choices[0].message.content || "I couldn't generate a response. Please try again.";

  } catch (err) {
    console.error("Error in sendMessage:", err.message);

    if (err.message.includes('API request failed')) {
      return "I'm experiencing some technical difficulties. Please try again in a moment.";
    }

    if (err.message.includes('Missing OpenRouter API Key')) {
      return "Server misconfiguration: API key missing. Please contact support.";
    }

    return "Something went wrong. Please check your connection and try again.";
  }
}
