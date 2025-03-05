import React from "react";

interface PostContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PostContainer: React.FC<PostContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default PostContainer;
