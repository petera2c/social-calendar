import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarHeader from "./CalendarHeader";
import WeekdayHeader from "./WeekdayHeader";
import CalendarGrid from "./CalendarGrid";
import { useSocialPosts } from "../hooks/useSocialPosts";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const handleYearChange = (year: number) =>
    setCurrentDate(currentDate.year(year));

  const { data: posts } = useSocialPosts();

  return (
    <div className="bg-white rounded-lg shadow-lg w-full h-[calc(100vh-2rem)] flex flex-col p-4">
      {/* Full width and height minus padding */}
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onYearChange={handleYearChange}
      />
      <WeekdayHeader />
      <CalendarGrid currentDate={currentDate} posts={posts || []} />
    </div>
  );
};

export default Calendar;
