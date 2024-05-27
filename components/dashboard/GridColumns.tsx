import { cn } from "@/lib/utils";
import { AlarmClockMinus, AudioLines, Eye, Users } from "lucide-react";
import React from "react";

interface GridColumnsProps {
  data: {
    tag: string;
    value: string;
  }[];
}

type Tag =
  | "subscribers"
  | "views"
  | "estimated Minutes Watched"
  | "average View Duration";

const isTag = (key: string): key is Tag => {
  return [
    "subscribers",
    "views",
    "estimated Minutes Watched",
    "average View Duration",
  ].includes(key);
};

const Icons: Record<Tag, JSX.Element> = {
  subscribers: <Users size={20} />,
  views: <Eye size={20} />,
  "estimated Minutes Watched": <AlarmClockMinus size={20} />,
  "average View Duration": <AudioLines size={20} />,
};

const bgColors: Record<Tag, string> = {
  subscribers: "#EFF4FF",
  views: "#FFF7E1",
  "estimated Minutes Watched": "#FFF4F0",
  "average View Duration": "#EFEFFF",
};

const iconColors: Record<Tag, string> = {
  subscribers: "#5B93FF",
  views: "#FFC42B",
  "estimated Minutes Watched": "#FF8F6B",
  "average View Duration": "#625DFF",
};

const GridColumns: React.FC<GridColumnsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-4">
      {data.map((item) => {
        if (!isTag(item.tag)) {
          return null;
        }

        return (
          <div
            className="flex flex-row p-4 gap-x-4 items-center bg-white dark:bg-black rounded-md shadow-sm"
            key={item.tag}
          >
            <div
              className={cn(
                "p-3 flex items-center justify-center rounded-full"
              )}
              style={{
                background: bgColors[item.tag],
                color: iconColors[item.tag],
              }}
            >
              {Icons[item.tag]}
            </div>
            <div className="flex flex-col gap-y-[-.5rem] items-start justify-start">
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.tag}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridColumns;
