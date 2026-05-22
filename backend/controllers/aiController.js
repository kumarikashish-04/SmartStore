const {
    generateAIContent,
  } = require(
    "../services/openaiService"
  );
  
  const OpenAI =
    require("openai");
  
  const openai =
    new OpenAI({
      apiKey:
        process.env.OPENAI_API_KEY,
    });
  
  
  // AI CONTENT
  const generateContent =
    async (
      req,
      res
    ) => {
  
      try {
  
        const {
          title,
          category,
          price,
        } = req.body;
  
        const aiData =
          await generateAIContent(
            title,
            category,
            price
          );
  
        res.json(aiData);
  
      } catch (error) {
  
        res.status(500).json({
          message:
            error.message,
        });
      }
    };
  
  
  // AI PRICING
  const pricingSuggestion =
    async (
      req,
      res
    ) => {
  
      try {
  
        const {
          title,
          category,
          price,
        } = req.body;
  
        const prompt = `
  You are an ecommerce pricing expert.
  
  Product:
  ${title}
  
  Category:
  ${category}
  
  Current Price:
  ${price}
  
  Suggest:
  1. Better selling price
  2. Why this price works
  3. Marketing advice
  
  Return JSON:
  {
   "suggestedPrice":"",
   "reason":"",
   "marketingAdvice":""
  }
  `;
  
        const response =
          await openai.chat.completions.create({
            model:
              "gpt-4.1-mini",
  
            messages: [
              {
                role: "user",
                content:
                  prompt,
              },
            ],
          });
  
        const text =
          response.choices[0]
            .message.content;
  
        const cleaned =
          text
            .replace(
              /```json/g,
              ""
            )
            .replace(
              /```/g,
              ""
            )
            .trim();
  
        res.json(
          JSON.parse(
            cleaned
          )
        );
  
      } catch (error) {
  
        res.status(500).json({
          message:
            error.message,
        });
      }
    };
  
  module.exports = {
    generateContent,
    pricingSuggestion,
  };