import React from "react";
import { Select } from "antd";
import { CalendarProps } from "../types/calendar";

const { Option } = Select;

const CalendarHeader: React.FC<CalendarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onYearChange,
}) => {
  // Generate year options (e.g., ±10 years from current year)
  const currentYear = currentDate.year();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="mb-6">
      {/* Navigation Icons Above */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={onPrevMonth}
            className="text-gray-600 hover:text-gray-800 text-xl"
            aria-label="Previous Month"
          >
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button
            onClick={onNextMonth}
            className="text-gray-600 hover:text-gray-800 text-xl"
            aria-label="Next Month"
          >
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
        {/* Year Selector */}
        <Select
          value={currentYear}
          onChange={onYearChange}
          style={{ width: 120 }}
          dropdownMatchSelectWidth={false}
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
