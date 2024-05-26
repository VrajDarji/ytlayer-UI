"use client";
import React from "react";
import {
  LineChart,
  Tooltip,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";
interface ChartData {
  tag: string;
  value: number;
}

interface ChartProps {
  data: ChartData[] | undefined;
}

// @ts-ignore
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload as ChartData;
    return (
      <div className="custom-tooltip p-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded shadow-md">
        <p className="label font-semibold">{`Tag: ${dataPoint.tag}`}</p>
        <p className="intro">{`Value: ${dataPoint.value}`}</p>
      </div>
    );
  }

  return null;
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer
      className={"w-full aspect-[2.5/1] border rounded-md p-4"}
    >
      <LineChart data={data}>
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid vertical={false} strokeDasharray={"3 3"} />
        {/* <Legend /> */}
        <Line
          type="monotone" // Changed from "bump" to "monotone" for compatibility
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
