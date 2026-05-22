const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

const generateAIContent = async (
  title,
  category,
  price
) => {

  try {

    const prompt = `
Generate:
1. Professional ecommerce product description
2. SEO tags
3. Marketing caption

Product Name: ${title}
Category: ${category}
Price: ${price}

Make the description premium and sales-focused.

Return ONLY valid JSON.

Example:
{
  "description":"text",
  "tags":["tag1","tag2"],
  "caption":"text"
}
`;

    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const text =
      response.choices[0].message.content;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "OPENAI ERROR:",
      error
    );

    return {
      description:
        "AI generation failed",

      tags: [],

      caption: "",
    };
  }
};

module.exports = {
  generateAIContent,
};