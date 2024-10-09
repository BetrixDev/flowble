import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ComponentProps, useMemo } from "react";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

type RelativeDateProps = {
  timestamp: number;
} & ComponentProps<"span">;

export function RelativeDate({ timestamp, ...props }: RelativeDateProps) {
  const { data: dateString } = useQuery({
    queryKey: ["relativeDate", timestamp],
    refetchInterval: 1000,
    queryFn: () => {
      const dayjsInstance = dayjs.utc(timestamp).local();

      if (Date.now() - timestamp < 1000 * 60 * 60 * 24 * 7) {
        return dayjsInstance.fromNow();
      } else {
        return new Date(dayjsInstance.valueOf()).toLocaleString(undefined, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      }
    },
  });

  return <span {...props}>{dateString}</span>;
}
