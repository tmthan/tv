"use client";
import { Schedule as ScheduleType } from "@/types";
import { Spin, Table, TableProps, Typography } from "antd";
import { StyleHTMLAttributes, useEffect, useState } from "react";
import _groupBy from "lodash/groupBy";
import _get from "lodash/get";
import _flatten from "lodash/flatten";
import _set from "lodash/set";
import _toNumber from "lodash/toNumber";
import dayjs from "dayjs";

type Calendar = {
  hourNumber: number;
  hourString: string;
};

function getFormetHour(hour: number) {
  if (hour < 1) {
    return "00";
  }
  return hour;
}

const hours: Calendar[] = _flatten(
  [...Array(24).keys()].map((hours) => [
    {
      hourNumber: hours,
      hourString: `${getFormetHour(hours)}:00`,
    },
    {
      hourNumber: hours + 0.25,
      hourString: `${getFormetHour(hours)}:15`,
    },
    {
      hourNumber: hours + 0.5,
      hourString: `${getFormetHour(hours)}:30`,
    },
    {
      hourNumber: hours + 0.75,
      hourString: `${getFormetHour(hours)}:45`,
    },
  ])
);

type DayOfWeekMapping = {
  day: number;
  key: string;
};
export const days: DayOfWeekMapping[] = [
  {
    day: 0,
    key: "sunday",
  },
  {
    day: 1,
    key: "monday",
  },
  {
    day: 2,
    key: "tuesday",
  },
  {
    day: 3,
    key: "wednesday",
  },
  {
    day: 4,
    key: "thursday",
  },
  {
    day: 5,
    key: "friday",
  },
  {
    day: 6,
    key: "saturday",
  },
];

type ScheduleProps = {
  schedules: ScheduleType[];
};

type TableRow = {
  key?: string;
  time?: string;
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
};

function renderCell(dayOfWeek: number, record: TableRow): StyleHTMLAttributes<HTMLTableCellElement> {
  if (!record?.time) {
    return {};
  }
  const currentDayOfWeek = dayjs().day();
  const currentHour = dayjs().hour();
  if (dayOfWeek === currentDayOfWeek) {
    const recordHour = dayjs()
      .hour(record.time ? _toNumber(record.time.split(":")[0]) : 0)
      .hour();
    return {
      style: {
        backgroundColor: recordHour === currentHour ? "#DD88CF" : "#fafafa",
      },
    };
  }
  return {};
}

export function Schedule({ schedules }: ScheduleProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<TableRow[]>([]);

  const columns: TableProps<TableRow>["columns"] = [
    {
      title: " ",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "CN",
      dataIndex: "sunday",
      key: "sunday",
      onCell: (record) => renderCell(0, record),
    },
    {
      title: "T2",
      dataIndex: "monday",
      key: "monday",
      onCell: (record) => renderCell(1, record),
    },
    {
      title: "T3",
      dataIndex: "tuesday",
      key: "tuesday",
      onCell: (record) => renderCell(2, record),
    },
    {
      title: "T4",
      dataIndex: "wednesday",
      key: "wednesday",
      onCell: (record) => renderCell(3, record),
    },
    {
      title: "T5",
      dataIndex: "thursday",
      key: "thursday",
      onCell: (record) => renderCell(4, record),
    },
    {
      title: "T6",
      dataIndex: "friday",
      key: "friday",
      onCell: (record) => renderCell(5, record),
    },
    {
      title: "T7",
      dataIndex: "saturday",
      key: "saturday",
      onCell: (record) => renderCell(6, record),
    },
  ];

  useEffect(() => {
    const groupByHours = _groupBy(schedules, "hour");
    const result: TableRow[] = [];
    for (const hour of hours) {
      const hourString = hour.hourString;
      const hourNumber = hour.hourNumber;
      const programInHours = _get(
        groupByHours,
        hourNumber
      ) as unknown as ScheduleType[];
      const programByDayOfWeek = _groupBy(programInHours, "dayOfWeek");
      const rowCells: TableRow = {};
      rowCells.time = hourString;
      rowCells.key = hourString;
      for (const dayOfWeek of days) {
        _set(
          rowCells,
          dayOfWeek.key,
          programByDayOfWeek[dayOfWeek.day]
            ?.map((schedule) => schedule.channelName)
            ?.join(", ") ?? ""
        );
      }
      result.push(rowCells);
    }
    setDataSource(result);
    setIsLoading(false)
  }, [schedules]);

  return (
    <Typography>
      <Typography.Title>Tất cả</Typography.Title>
      { isLoading ? <Spin /> : <Table columns={columns} dataSource={dataSource} pagination={false} bordered />}
    </Typography>
  );
}
