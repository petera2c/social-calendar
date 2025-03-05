import { useQuery } from "react-query";
import { Post } from "../types/post";

const socialMediaTypes = ["x", "facebook", "instagram", "linkedin"] as const;

// Generate fake posts
const generateFakePosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, (_, index) => ({
    socialMedia:
      socialMediaTypes[Math.floor(Math.random() * socialMediaTypes.length)],
    id: `post-${index + 1}`,
    author: {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    },
    content: `This is a sample social media post ${
      index + 1
    }. It contains some random content to demonstrate the post structure.`,
    timestamp: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(), // Random time within last week
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
  }));
};

export const useSocialPosts = (count: number = 10) => {
  return useQuery({
    queryKey: ["socialPosts", count],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return generateFakePosts(count);
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
};
