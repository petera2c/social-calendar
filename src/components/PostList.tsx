import React from "react";
import { Post } from "../types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

interface PostListProps {
  posts: Post[];
}

const socialMediaColors = {
  x: "bg-neutral-100 border-neutral-200",
  facebook: "bg-blue-100 border-blue-200",
  instagram: "bg-pink-100 border-pink-200",
  linkedin: "bg-blue-900/10 border-blue-900/20",
};

const socialMediaIcons = {
  x: faXTwitter,
  facebook: faFacebookF,
  instagram: faInstagram,
  linkedin: faLinkedinIn,
};

const socialMediaIconColors = {
  x: "text-neutral-900",
  facebook: "text-blue-600",
  instagram: "text-pink-600",
  linkedin: "text-blue-900",
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <div className="space-y-1 mt-1 max-h-[120px] overflow-y-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`text-xs p-1.5 rounded border ${
            socialMediaColors[post.socialMedia]
          } flex items-start gap-1.5`}
        >
          <span className={`${socialMediaIconColors[post.socialMedia]} w-3.5`}>
            <FontAwesomeIcon
              icon={socialMediaIcons[post.socialMedia]}
              className="h-3.5"
            />
          </span>
          <span className="truncate">{post.content}</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
