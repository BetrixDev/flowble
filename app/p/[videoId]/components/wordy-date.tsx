import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useMemo } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

type WordyDateProps = {
  timestamp: number | string;
};

export function WordyDate({ timestamp }: WordyDateProps) {
  const date = useMemo(() => {
    return dayjs.utc(timestamp).local().format("MMMM D, YYYY");
  }, [timestamp]);

  return date;
}
