import React from "react";

const WeekdayHeader: React.FC = () => {
  const weekdays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid grid-cols-7 text-center text-gray-500 font-semibold mb-2">
      {weekdays.map((day) => (
        <div key={day} className="p-2">
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayHeader;
