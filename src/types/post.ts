export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  media?: {
    type: "image" | "video";
    url: string;
  }[];
  socialMedia: "x" | "facebook" | "instagram" | "linkedin";
  status: PostStatus;
}

export type PostStatus = "draft" | "published" | "scheduled";
