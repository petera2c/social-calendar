import { Dayjs } from "dayjs";
import { PostStatus } from "./post";

export interface CalendarDay {
  canCreatePost: boolean;
  day: Dayjs;
  isCurrentDay: boolean;
  isOutOfMonth: boolean;
}

export interface CalendarProps {
  currentDate: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
  onStatusChange: (status: PostStatus | "all") => void;
  selectedStatus: PostStatus | "all";
}
