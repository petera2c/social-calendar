import { Post } from "../types/post";

const socialMediaTypes = ["x", "facebook", "instagram", "linkedin"] as const;

// Generate fake posts with both past and future dates
export const generateFakePosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, (_, index) => {
    // Generate a timestamp between 7 days ago and 14 days in the future
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const timestamp = new Date(
      now +
        Math.random() * 2 * sevenDaysMs - // Random time span of 14 days
        sevenDaysMs // Offset by 7 days to get range from -7 to +7 days
    );

    const isScheduled = timestamp.getTime() > now;
    const status = isScheduled
      ? Math.random() > 0.5
        ? "scheduled"
        : "draft"
      : "published";

    return {
      socialMedia:
        socialMediaTypes[Math.floor(Math.random() * socialMediaTypes.length)],
      id: `post-${index + 1}`,
      author: {
        id: `user-${Math.floor(Math.random() * 1000)}`,
        name: `User ${Math.floor(Math.random() * 1000)}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
      },
      content: `${isScheduled ? "📅 SCHEDULED: " : ""}This is a ${
        isScheduled ? "scheduled" : "posted"
      } social media post ${index + 1}. ${
        isScheduled ? "Will be posted" : "Was posted"
      } on ${timestamp.toLocaleDateString()}.`,
      timestamp: timestamp.toISOString(),
      status,
      media:
        Math.random() > 0.5
          ? [
              {
                type: Math.random() > 0.5 ? "image" : ("video" as const),
                url:
                  Math.random() > 0.5
                    ? `https://picsum.photos/800/600?random=${index}`
                    : `https://example.com/video-${index}.mp4`,
              },
            ]
          : undefined,
    };
  });
};
