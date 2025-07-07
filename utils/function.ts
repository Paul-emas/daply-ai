export async function simulateAIResponse(
  _userMessage: string,
  universalPrompt: string
): Promise<string> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1200 + Math.random() * 1800)
  );

  const responses = [
    "That's a great question! I'd be happy to help you explore this topic. Let me share some thoughts and insights that might be useful.",
    "I find this really interesting! There are several ways to approach this, and I'd like to walk you through some key considerations.",
    "Thanks for bringing this up. This is definitely worth discussing in detail. Here's how I see it and what I think might help.",
    "Excellent point! I appreciate how you've framed this question. Let me provide some perspective that might be valuable.",
    "This is exactly the kind of thoughtful question I enjoy working on. Let me break this down and share some insights.",
    "I'm glad you asked about this! It's a topic with many interesting aspects. Here's what I think would be most helpful to consider.",
    "That's a really good question that deserves a thorough response. Let me share some ideas and approaches that might work well.",
    "I appreciate you bringing this to my attention. This is definitely something we can work through together. Here's my take on it.",
  ];

  const selectedResponse =
    responses[Math.floor(Math.random() * responses.length)];

  if (universalPrompt) {
    return `${selectedResponse}\n\nNote I'm following your custom instructions: "${universalPrompt}"`;
  }

  return selectedResponse;
}
