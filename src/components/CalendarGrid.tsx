import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarDay } from "../types/calendar";
import CalendarGridBox from "./DayCell";

interface CalendarGridProps {
  currentDate: Dayjs;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDayOfMonth = currentDate.startOf("month");
    const lastDayOfMonth = currentDate.endOf("month");
    const startDay = firstDayOfMonth.day(); // 0 = Sunday, 6 = Saturday
    const totalDays = lastDayOfMonth.date();
    const today = dayjs();

    // Calculate days from previous month
    const prevMonth = currentDate.subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();
    const prevMonthDaysToShow = startDay; // Number of days to show before 1st

    for (
      let i = daysInPrevMonth - prevMonthDaysToShow + 1;
      i <= daysInPrevMonth;
      i++
    ) {
      days.push({ day: i, isCurrentDay: false, isOutOfMonth: true });
    }

    // Add current month's days
    for (let day = 1; day <= totalDays; day++) {
      const isCurrentDay =
        day === today.date() &&
        currentDate.month() === today.month() &&
        currentDate.year() === today.year();
      days.push({ day, isCurrentDay, isOutOfMonth: false });
    }

    // Calculate days from next month to fill the grid (aim for 42 slots total, 6 weeks)
    const remainingSlots = 42 - days.length; // 42 = 7 cols * 6 rows
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, isCurrentDay: false, isOutOfMonth: true });
    }

    return days;
  };

  return (
    <div className="grid gap-px grid-cols-7 bg-slate-200 border border-slate-300 rounded-lg overflow-hidden">
      {generateDays().map((item, index) => {
        return <CalendarGridBox key={index} item={item} />;
      })}
    </div>
  );
};

export default CalendarGrid;
