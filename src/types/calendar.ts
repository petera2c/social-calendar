import { Dayjs } from "dayjs";

export interface CalendarDay {
  day: number;
  isCurrentDay: boolean;
  isOutOfMonth: boolean;
}

export interface CalendarProps {
  currentDate: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
}
