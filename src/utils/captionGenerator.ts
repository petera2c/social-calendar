import axios from "axios";

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/gpt2";

interface CaptionOptions {
  platform: "x" | "facebook" | "instagram" | "linkedin" | "pinterest";
  day: number;
  date?: string;
  hasMedia?: boolean;
}

export const generateCaption = async ({
  platform,
  day,
  date,
  hasMedia = false,
}: CaptionOptions): Promise<string> => {
  const prompts = {
    x: `Write a short, casual caption for a ${
      hasMedia ? "photo" : "text"
    } post on X about an event on day ${day}${
      date ? ` of ${new Date(date).toLocaleDateString()}` : ""
    }. Include a hashtag.`,
    facebook: `Write a friendly caption for a Facebook post about a ${
      hasMedia ? "photo" : "moment"
    } on day ${day}${
      date ? ` of ${new Date(date).toLocaleDateString()}` : ""
    }. Keep it conversational.`,
    instagram: `Write a creative caption for an Instagram ${
      hasMedia ? "photo" : "post"
    } on day ${day}${
      date ? ` of ${new Date(date).toLocaleDateString()}` : ""
    }. Add hashtags.`,
    linkedin: `Write a professional caption for a LinkedIn post about a ${
      hasMedia ? "visual" : "thought"
    } on day ${day}${
      date ? ` of ${new Date(date).toLocaleDateString()}` : ""
    }. Focus on insights.`,
    pinterest: `Write a descriptive caption for a Pinterest pin on day ${day}${
      date ? ` of ${new Date(date).toLocaleDateString()}` : ""
    }. Highlight inspiration${hasMedia ? " from a photo" : ""}.`,
  };

  const prompt = prompts[platform];

  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt, max_length: 50, num_return_sequences: 1 },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const caption = response.data[0]?.generated_text
      ?.replace(prompt, "")
      .trim();
    return caption || "Oops, couldn’t generate a caption!";
  } catch (error) {
    console.error("Caption generation failed:", error);
    return "Failed to generate caption.";
  }
};
