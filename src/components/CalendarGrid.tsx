import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarDay } from "../types/calendar";
import DayCell from "./DayCell";
import { Post } from "../types/post";

interface CalendarGridProps {
  currentDate: Dayjs;
  posts: Post[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, posts }) => {
  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDayOfMonth = currentDate.startOf("month");
    const lastDayOfMonth = currentDate.endOf("month");
    const startDay = firstDayOfMonth.day();
    const today = dayjs();

    // Calculate days from previous month
    const prevMonth = currentDate.subtract(1, "month");
    for (let i = 0; i < startDay; i++) {
      const day = prevMonth.endOf("month").subtract(startDay - i - 1, "day");
      days.push({
        canCreatePost: false,
        day,
        isCurrentDay: false,
        isOutOfMonth: true,
      });
    }

    // Add current month's days
    for (let i = 0; i < firstDayOfMonth.daysInMonth(); i++) {
      const day = firstDayOfMonth.add(i, "day");
      const isCurrentDay = day.isSame(today, "day");
      const canCreatePost = day.isSame(today, "day") || day.isAfter(today);
      days.push({
        canCreatePost,
        day,
        isCurrentDay,
        isOutOfMonth: false,
      });
    }

    // Calculate days from next month
    const remainingSlots = 42 - days.length;
    for (let i = 0; i < remainingSlots; i++) {
      const day = lastDayOfMonth.add(i + 1, "day");
      days.push({
        canCreatePost: true,
        day,
        isCurrentDay: false,
        isOutOfMonth: true,
      });
    }

    return days;
  };

  return (
    <div className="grid gap-px grid-cols-7 bg-slate-200 border border-slate-300 rounded-lg overflow-hidden">
      {generateDays().map((item, index) => {
        // Filter posts for this specific day
        const dayPosts = posts.filter(
          (post) =>
            dayjs(post.timestamp).format("YYYY-MM-DD") ===
            item.day.format("YYYY-MM-DD")
        );

        return <DayCell key={index} item={item} posts={dayPosts} />;
      })}
    </div>
  );
};

export default CalendarGrid;
