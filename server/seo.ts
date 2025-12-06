import { invokeLLM } from "./_core/llm";

/**
 * Generate SEO-optimized meta description using AI
 */
export async function generateMetaDescription(content: {
  title: string;
  description: string;
  keywords?: string[];
}): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Generate compelling meta descriptions that are 150-160 characters, include the main keyword naturally, and encourage clicks. Be specific and action-oriented.",
        },
        {
          role: "user",
          content: `Generate a meta description for:\nTitle: ${content.title}\nDescription: ${content.description}\nKeywords: ${content.keywords?.join(", ") || "Hull, tourism, attractions"}`,
        },
      ],
    });

    const content_text = typeof response.choices[0]?.message?.content === 'string' ? response.choices[0]?.message?.content : '';
    const metaDescription = content_text.trim() || content.description.slice(0, 160);
    return metaDescription.slice(0, 160);
  } catch (error) {
    console.error("Error generating meta description:", error);
    return content.description.slice(0, 160);
  }
}

/**
 * Generate SEO-friendly alt text for images using AI
 */
export async function generateImageAltText(context: {
  pageName: string;
  itemName: string;
  itemType: "attraction" | "event" | "restaurant" | "accommodation";
}): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Generate descriptive, keyword-rich alt text for images (max 125 characters). Include location (Hull) and be specific about what the image shows.",
        },
        {
          role: "user",
          content: `Generate alt text for an image of ${context.itemName}, a ${context.itemType} in Hull, appearing on the ${context.pageName} page.`,
        },
      ],
    });

    const content_text = typeof response.choices[0]?.message?.content === 'string' ? response.choices[0]?.message?.content : '';
    const altText = content_text.trim() || `${context.itemName} in Hull`;
    return altText.slice(0, 125);
  } catch (error) {
    console.error("Error generating alt text:", error);
    return `${context.itemName} in Hull`;
  }
}

/**
 * Extract semantic keywords from content using AI
 */
export async function extractSemanticKeywords(content: string): Promise<string[]> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Extract 5-10 relevant semantic keywords and phrases from the given content. Return only a comma-separated list.",
        },
        {
          role: "user",
          content: `Extract semantic keywords from: ${content}`,
        },
      ],
    });

    const content_text = typeof response.choices[0]?.message?.content === 'string' ? response.choices[0]?.message?.content : '';
    const keywordsText = content_text.trim();
    return keywordsText.split(",").map((k: string) => k.trim()).filter(Boolean);
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return [];
  }
}

/**
 * Generate SEO-optimized page title using AI
 */
export async function generatePageTitle(content: {
  name: string;
  type: "attraction" | "event" | "restaurant" | "accommodation" | "page";
  location?: string;
}): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Generate compelling, keyword-rich page titles (50-60 characters). Include location (Hull) and make it click-worthy.",
        },
        {
          role: "user",
          content: `Generate a page title for: ${content.name} (${content.type}) in ${content.location || "Hull"}`,
        },
      ],
    });

    const content_text = typeof response.choices[0]?.message?.content === 'string' ? response.choices[0]?.message?.content : '';
    const title = content_text.trim() || content.name;
    return title.slice(0, 60);
  } catch (error) {
    console.error("Error generating page title:", error);
    return content.name;
  }
}
