import React, { useState } from "react";
import { CalendarDay } from "../types/calendar";
import SocialMediaPostModal from "./CreatePostModal";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DayCell: React.FC<{ item: CalendarDay }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (item.day && !item.isOutOfMonth) {
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
            ? item.isOutOfMonth
              ? "bg-gray-50 text-gray-400"
              : "hover:bg-blue-50 cursor-pointer"
            : "bg-gray-100 text-gray-300"
        } ${item.isCurrentDay ? "bg-blue-100 border-blue-500" : ""}`}
        onMouseEnter={() =>
          item.day && !item.isOutOfMonth && setIsHovered(true)
        }
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.day && (
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full ${
              item.isCurrentDay ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            {item.day}
          </span>
        )}
        {isHovered && item.day && !item.isOutOfMonth && (
          <Button
            type="primary"
            shape="circle"
            size="large"
            onClick={handleOpenModal}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </Button>
        )}
      </div>
      <SocialMediaPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        day={item.day}
      />
    </>
  );
};

export default DayCell;
