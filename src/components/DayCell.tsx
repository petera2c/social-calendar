import React, { useState } from "react";
import { CalendarDay } from "../types/calendar";
import CreatePostModal from "./CreatePostModal";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Post } from "../types/post";
import PostList from "./PostList";

const DayCell: React.FC<{ item: CalendarDay; posts: Post[] }> = ({
  item,
  posts,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (item.day && item.canCreatePost) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`h-20 flex items-start justify-start p-2 text-sm bg-white relative ${
          item.day
            ? item.canCreatePost
              ? "hover:bg-blue-50 cursor-pointer"
              : "bg-gray-50 text-gray-400"
            : "bg-gray-100 text-gray-300"
        } ${item.isCurrentDay ? "bg-blue-100 border-blue-500" : ""}`}
        onMouseEnter={() =>
          item.day && item.canCreatePost && setIsHovered(true)
        }
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenModal}
      >
        {item.day && (
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full ${
              item.isCurrentDay ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            {item.day.date()}
          </span>
        )}
        {posts.length > 0 && (
          <div>
            <PostList posts={posts} />
          </div>
        )}
        {isHovered && item.canCreatePost && (
          <Button
            type="primary"
            shape="circle"
            size="large"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </Button>
        )}
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        day={item.day}
        isOutOfMonth={item.isOutOfMonth}
      />
    </>
  );
};

export default DayCell;
