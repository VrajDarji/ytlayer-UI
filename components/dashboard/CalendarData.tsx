"use client";
import CalendarFormYTLayer from "@/components/ui/CalendarForm";
import React, { useEffect, useState } from "react";

const CalendarData = () => {
  const [firstDate, setFirstDate] = useState<string>("");
  const [secondDate, setSecondDate] = useState<string>("");
  useEffect(() => {
    console.log(firstDate);
    console.log(secondDate);
  }, [firstDate, secondDate]);
  return (
    <div className="w-full flex items-center justify-center flex-row gap-x-4">
      <CalendarFormYTLayer
        initialDate={new Date("1900-01-01")}
        endDate={new Date()}
        onDateSelect={(date) => setFirstDate(date)}
      />
      <p>-</p>
      <CalendarFormYTLayer
        initialDate={new Date(firstDate)}
        endDate={new Date()}
        onDateSelect={(date) => setSecondDate(date)} // Placeholder for the second date selection handler
      />
    </div>
  );
};

export default CalendarData;
