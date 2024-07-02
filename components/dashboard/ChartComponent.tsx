"use client";
import React, { useEffect, useState } from "react";
import Chart from "./LineChart";
import SelectDurationDropdown from "../ui/SelectMonthDropdown";
import SelectTypeDropdown from "../ui/SelectTypeDropdown";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

const ChartComponent = () => {
  const [valueString, setValueString] = useState<string>("Last Week");
  const [typeString, setTypeString] = useState<string>("views");
  const [isLoding, setIsLoading] = useState<boolean>(false);
  const [chartData, setChartData] =
    useState<{ tag: string; value: number }[]>();
  const params = useParams();
  const onValueChange = (value: string) => {
    setValueString(value);
  };
  const onTypeChange = (value: string) => {
    setTypeString(value);
  };
  const fetchData = async (
    metricString: string,
    dateString: string,
    channelId: string
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/youtube/report", {
        metrics: metricString,
        dateString,
        channelId,
      });
      const formattedData = data?.rows?.map((r: any) => ({
        tag: r[0],
        value: r[1],
      }));
      console.log(data?.rows);

      console.log(formattedData);
      setChartData(formattedData);
      // const formattedData=data
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(typeString, valueString, params.channelId as string);
  }, [typeString, valueString, params.channelId]);
  return (
    <div className="bg-white dark:bg-black rounded-md shadow-md flex flex-col gap-y-6 p-6">
      <div className="w-full flex flex-row items-center">
        <h1 className="text-2xl font-medium capitalize">
          {typeString} Report - {valueString}
        </h1>
        <div className="ml-auto flex flex-row gap-x-4">
          <SelectDurationDropdown onChange={onValueChange} />
          <SelectTypeDropdown onChange={onTypeChange} />
        </div>
      </div>
      <>
        {isLoding ? (
          <div className="w-full aspect-[2.5/1] flex justify-center items-center rounded-md border flex-col gap-x-2">
            <Loader2 className="animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <Chart data={chartData} />
        )}
      </>
    </div>
  );
};

export default ChartComponent;
