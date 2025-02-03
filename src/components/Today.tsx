"use client";
import { Schedule as ScheduleType } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import _sortBy from "lodash/sortBy";
import _groupBy from "lodash/groupBy";
import _get from "lodash/get";
import _round from "lodash/round";
import _toNumber from "lodash/toNumber";
import { Timeline, TimelineItemProps, Typography } from "antd";

type TodayProps = {
  schedules: ScheduleType[];
};

function getTimeFormat(hour: number) {
  const hourMod = _round(hour % 1, 2);
  const hourDiv = Math.floor(hour);
  if (hourMod === 0.25) {
    return `${hourDiv}:15`;
  }
  if (hourMod === 0.5) {
    return `${hourDiv}:30`;
  }
  if (hourMod === 0.75) {
    return `${hourDiv}:45`;
  }
  return `${hourDiv}:00`;
}

export function Today({ schedules }: TodayProps) {
  const [timeLine, setTimeLine] = useState<TimelineItemProps[]>([]);

  useEffect(() => {
    const dayOfWeek = dayjs().day();
    const scheduleToday = schedules.filter(
      (item) => item.dayOfWeek === dayOfWeek
    );
    const scheduleTodaySorted = _sortBy(scheduleToday, "hour");
    const groupByTime = _groupBy(scheduleTodaySorted, "hour");

    setTimeLine(
      Object.keys(groupByTime)
        .sort((a, b) => (_toNumber(a) > _toNumber(b) ? 1 : -1))
        .map((hour) => {
          const list = _get(groupByTime, hour, [])
            .map((item) => item.channelName)
            .join(", ");
          return {
            children: `(${getTimeFormat(_toNumber(hour))}) ${list}`,
          };
        })
    );
  }, [schedules]);
  return (
    <Typography>
      <Typography.Title>Hôm nay</Typography.Title>
      <Timeline items={timeLine} />
    </Typography>
  );
}
