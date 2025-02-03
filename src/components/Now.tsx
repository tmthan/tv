"use client";
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
    const channelNow = scheduleToday.filter(
      (item) => item.hour >= currentHour && item.hour < currentHour + 1
    );
    if (!channelNow.length) {
      return "Không có dữ liệu";
    }
    return channelNow.map((schedule) => schedule.channelName).join(", ");
  }, [schedules]);
  return (
    <Typography>
      <Typography.Title>Đang phát</Typography.Title>
      {channelNow}
    </Typography>
  );
}
