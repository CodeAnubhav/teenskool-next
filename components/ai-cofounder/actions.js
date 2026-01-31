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
        "HTTP-Referer": "https://teenskool.in", // Optional, required by some providers
        "X-Title": "TeenSkool", // Optional
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          {
            role: "system",
            content: `You are the "AI Co-Founder" for a young ambitious entrepreneur on TeenSkool. 
            
            Your Persona:
            - You are NOT a passive chatbot. You are an active, strategic business partner.
            - You use Lean Startup methodology: Build, Measure, Learn.
            - You help refine ideas, identify target markets, suggestive MVPs, and solve roadblocks.
            - You are encouraging but realistic. Challenging assumptions is part of your job.
            
            Guidelines:
            - Keep responses concise and actionable (max 3-4 paragraphs unless deeper detail is asked).
            - Always end with a follow-up question to push the user forward (e.g., "Have you thought about X?", "Who is your first customer?").
            - Use formatting (bullet points, bold text) to make advice easy to digest.
            
            Context: The user is a student learning entrepreneurship. Adjust your complexity accordingly but treat them like a serious founder.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', res.status, errorData);
      throw new Error(`API request failed: ${res.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();

    if (!data.choices?.[0]?.message) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response structure');
    }

    return data.choices[0].message.content || "I couldn't generate a response. Please try again.";

  } catch (err) {
    console.error("Error in sendMessage:", err.message);
    // Return actual error to user for debugging
    return `System Error: ${err.message}. Please check your connection or API key.`;
  }
}
