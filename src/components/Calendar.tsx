import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "./CalendarHeader";
import WeekdayHeader from "./WeekdayHeader";
import CalendarGrid from "./CalendarGrid";
import { useSocialPosts } from "../contexts/SocialPostsContext";
import { PostStatus } from "../types/post";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [selectedStatus, setSelectedStatus] = useState<PostStatus | "all">(
    "all"
  );

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const handleYearChange = (year: number) =>
    setCurrentDate(currentDate.year(year));

  const { posts, isLoading } = useSocialPosts();

  const filteredPosts = posts.filter((post) => {
    if (selectedStatus === "all") return true;
    return post.status === selectedStatus;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg w-full h-[calc(100vh-2rem)] flex items-center justify-center">
        Loading...
      </div>
    );
  }
  console.log(filteredPosts);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full h-[calc(100vh-2rem)] flex flex-col p-4">
      {/* Full width and height minus padding */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onYearChange={handleYearChange}
        onStatusChange={setSelectedStatus}
        selectedStatus={selectedStatus}
      />
      <WeekdayHeader />
      <CalendarGrid currentDate={currentDate} posts={filteredPosts || []} />
    </div>
  );
};

export default Calendar;
