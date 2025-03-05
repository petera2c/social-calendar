import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarDay } from "../types/calendar";
import DayCell from "./DayCell";

interface CalendarGridProps {
  currentDate: Dayjs;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
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
        day,
        isCurrentDay: false,
        isOutOfMonth: true,
      });
    }

    // Add current month's days
    for (let i = 0; i < firstDayOfMonth.daysInMonth(); i++) {
      const day = firstDayOfMonth.add(i, "day");
      const isCurrentDay = day.isSame(today, "day");
      days.push({
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
        return <DayCell key={index} item={item} />;
      })}
    </div>
  );
};

export default CalendarGrid;
