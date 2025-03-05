import { Dayjs } from "dayjs";

export interface CalendarDay {
  day: number | null; // null for empty slots
  isCurrentDay: boolean;
  isOutOfMonth: boolean;
}

export interface CalendarProps {
  currentDate: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void; // New for year selector
}
