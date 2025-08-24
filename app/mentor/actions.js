"use server";

export async function sendMessage(message) {
  try {
    // Validate input
    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message');
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Updated to a more reliable free model
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
    
    // Better error handling for API response
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    return data.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";

  } catch (err) {
    console.error("Error in sendMessage:", err);
    
    // Return different error messages based on error type
    if (err.message.includes('API request failed')) {
      return "I'm experiencing some technical difficulties. Please try again in a moment.";
    }
    
    return "Something went wrong. Please check your connection and try again.";
  }
}