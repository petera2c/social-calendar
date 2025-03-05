import React from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface ScheduledDatePickerProps {
  onChange: (date: Dayjs) => void;
  value: Dayjs;
}

const ScheduledDatePicker: React.FC<ScheduledDatePickerProps> = ({
  onChange,
  value,
}) => {
  return (
    <DatePicker
      showTime
      value={value}
      onChange={onChange}
      disabledDate={(current) => current && current < dayjs().startOf("day")}
      format="YYYY-MM-DD HH:mm"
      className="w-full bg-white text-black"
    />
  );
};

export default ScheduledDatePicker;
