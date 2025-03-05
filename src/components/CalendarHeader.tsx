import React from "react";
import { Button, Select } from "antd";
import { CalendarProps } from "../types/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

const CalendarHeader: React.FC<CalendarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onYearChange,
}) => {
  // Generate year options (e.g., +10 years from current year)
  const currentYear = currentDate.year();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  return (
    <div className="mb-6">
      {/* Navigation Icons Above */}
      <div className="flex justify-end items-center mb-4 gap-4">
        <div className="flex gap-2">
          <Button
            onClick={onPrevMonth}
            aria-label="Previous Month"
            icon={<FontAwesomeIcon icon={faChevronLeft} />}
          />
          <Button
            onClick={onNextMonth}
            aria-label="Next Month"
            icon={<FontAwesomeIcon icon={faChevronRight} />}
          />
        </div>
        {/* Year Selector */}
        <Select
          value={currentYear}
          onChange={onYearChange}
          style={{ width: 120 }}
          popupMatchSelectWidth={false}
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      {/* Month Display */}
      <h1 className="text-2xl font-bold text-center">
        {currentDate.format("MMMM YYYY")}
      </h1>
    </div>
  );
};

export default CalendarHeader;
