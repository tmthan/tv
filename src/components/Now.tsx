"use client";
import { Schedule as ScheduleType } from "@/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

type NowProps = {
  schedules: ScheduleType[];
};

export function Now({ schedules }: NowProps) {
  const [channelNow, setChannelNow] = useState("");

  useEffect(() => {

    const dayOfWeek = dayjs().day();
    const currentHour = dayjs().hour();
    const scheduleToday = schedules.filter(
      (item) => item.dayOfWeek === dayOfWeek
    );
    const _channelNow = scheduleToday.filter(
      (item) => item.hour >= currentHour && item.hour < currentHour + 1
    );
    if (!_channelNow.length) {
      setChannelNow("Không có dữ liệu")
    } else {
      setChannelNow(
        _channelNow.map((schedule) => schedule.channelName).join(", ")
      );
    }
  }, [schedules]);

  return (
    <Typography>
      <Typography.Title>Đang phát</Typography.Title>
      {channelNow}
    </Typography>
  );
}
