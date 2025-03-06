import React from "react";
import { Button, Select } from "antd";
import { CalendarProps } from "../types/calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import StatusFilter from "./StatusFilter";

const { Option } = Select;

const CalendarHeader: React.FC<CalendarProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onYearChange,
  onStatusChange,
  selectedStatus,
}) => {
  // Generate year options (e.g., +10 years from current year)
  const currentYear = currentDate.year();
  const years = Array.from({ length: 21 }, (_, i) => currentYear + i);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <div>
          <StatusFilter
            selectedStatus={selectedStatus}
            onStatusChange={onStatusChange}
          />
        </div>
        <div className="flex items-center gap-2">
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
            {years.map((year, index) => (
              <Option key={index} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {/* Month Display */}
      <h1 className="text-2xl font-bold text-center">
        {currentDate.format("MMMM YYYY")}
      </h1>
    </div>
  );
};

export default CalendarHeader;
