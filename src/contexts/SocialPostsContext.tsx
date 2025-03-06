import React, { createContext, useContext, useState, useEffect } from "react";
import { Post } from "../types/post";
import { generateFakePosts } from "../hooks/useSocialPosts";

interface SocialPostsContextType {
  posts: Post[];
  isLoading: boolean;
  setPosts: (posts: Post[]) => void;
}

export const SocialPostsContext = createContext<
  SocialPostsContextType | undefined
>(undefined);

export const SocialPostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePosts = () => {
      // Check sessionStorage first
      const storedPosts = sessionStorage.getItem("socialPosts");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
        setIsLoading(false);
        return;
      }

      // Generate new posts if none exist
      const newPosts = generateFakePosts();
      sessionStorage.setItem("socialPosts", JSON.stringify(newPosts));
      setPosts(newPosts);
      setIsLoading(false);
    };
    initializePosts();
  }, []);

  return (
    <SocialPostsContext.Provider
      value={{
        posts,
        isLoading,
        setPosts: (posts: Post[]) => {
          setPosts(posts);
          sessionStorage.setItem("socialPosts", JSON.stringify(posts));
        },
      }}
    >
      {children}
    </SocialPostsContext.Provider>
  );
};

export const useSocialPosts = () => {
  const context = useContext(SocialPostsContext);

  if (context === undefined) {
    throw new Error("useSocialPosts must be used within a SocialPostsProvider");
  }
  return context;
};
