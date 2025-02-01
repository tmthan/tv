import { Schedule as ScheduleType } from "@/types";
import { useMemo } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

type NowProps = {
  schedules: ScheduleType[];
};

export function Now({ schedules }: NowProps) {
  const channelNow = useMemo(() => {
    const dayOfWeek = dayjs().day();
    const currentHour = dayjs().hour();
    const scheduleToday = schedules.filter(
      (item) => item.dayOfWeek === dayOfWeek
    );
    console.log("currentHour", currentHour, currentHour + 1);
    console.log("scheduleToday", scheduleToday);
    const channelNow = scheduleToday.filter(
      (item) => item.hour >= currentHour && item.hour <= currentHour + 1
    );
    console.log("channelNow", channelNow);

    return channelNow.map((schedule) => schedule.channelName).join(", ");
  }, [schedules]);
  return (
    <Typography>
      Đang phát
      <br />
      {channelNow}
    </Typography>
  );
}
