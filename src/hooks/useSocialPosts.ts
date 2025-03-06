import { Post } from "../types/post";

const socialMediaTypes = ["x", "facebook", "instagram", "linkedin"] as const;

const generateContent = (
  socialMedia: (typeof socialMediaTypes)[number],
  index: number,
  isScheduled: boolean,
  timestamp: Date
): string => {
  const dateStr = timestamp.toLocaleDateString();
  switch (socialMedia) {
    case "x":
      return `${isScheduled ? "📅 " : ""}Quick update #${index + 1}: ${
        isScheduled ? "Excited for" : "Just saw"
      } a ${Math.random() > 0.5 ? "new tech demo" : "cool event"}! ${
        isScheduled ? "Catch it" : "Caught it"
      } on ${dateStr}. #${Math.random() > 0.5 ? "Tech" : "Events"}`;
    case "facebook":
      return `${isScheduled ? "📅 Scheduled: " : ""}Hey friends! ${
        isScheduled ? "Planning to" : "Just did"
      } a fun outing with the team on ${dateStr}. ${
        isScheduled
          ? "Can’t wait to share pics!"
          : "Check out these pics from the day!"
      } What’s everyone up to this week?`;
    case "instagram":
      return `${isScheduled ? "📅 Ready for" : ""} ${
        isScheduled ? "Posting soon" : "Posted now"
      }: Loving this ${
        Math.random() > 0.5 ? "sunset vibe" : "city view"
      } on ${dateStr}. ${isScheduled ? "Stay tuned!" : "#Throwback"} #${
        Math.random() > 0.5 ? "NatureLovers" : "CityLife"
      }`;
    case "linkedin":
      return `${isScheduled ? "📅 Upcoming: " : ""} ${
        isScheduled ? "Looking forward to sharing" : "Shared"
      } some insights from our latest project on ${dateStr}. ${
        isScheduled
          ? "Stay tuned for tips on team collaboration!"
          : "Learned a lot about team collaboration—thoughts?"
      } #Leadership #ProfessionalGrowth`;
    default:
      return "";
  }
};

const generateMedia = (
  socialMedia: (typeof socialMediaTypes)[number],
  index: number
): { type: "image" | "video"; url: string }[] | undefined => {
  const shouldHaveMedia = {
    x: Math.random() > 0.7, // Less frequent media on X
    facebook: Math.random() > 0.4, // Common but not always
    instagram: true, // Always has media
    linkedin: Math.random() > 0.6, // Less frequent, often documents or images
  }[socialMedia];

  if (!shouldHaveMedia) return undefined;

  return [
    {
      type: Math.random() > 0.5 ? "image" : "video",
      url:
        Math.random() > 0.5
          ? `https://picsum.photos/800/600?random=${index}`
          : `https://example.com/video-${index}.mp4`,
    },
  ];
};

// Generate fake posts with both past and future dates
export const generateFakePosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, (_, index) => {
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const timestamp = new Date(
      now + Math.random() * 2 * sevenDaysMs - sevenDaysMs // Range: -7 to +7 days
    );

    const isScheduled = timestamp.getTime() > now;
    const socialMedia =
      socialMediaTypes[Math.floor(Math.random() * socialMediaTypes.length)];
    const status = isScheduled
      ? Math.random() > 0.5
        ? "scheduled"
        : "draft"
      : "published";

    return {
      socialMedia,
      id: `post-${index + 1}`,
      author: {
        id: `user-${Math.floor(Math.random() * 1000)}`,
        name: `User ${Math.floor(Math.random() * 1000)}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
      },
      content: generateContent(socialMedia, index, isScheduled, timestamp),
      timestamp: timestamp.toISOString(),
      status,
      media: generateMedia(socialMedia, index),
    };
  });
};
