import { Schedule as ScheduleType } from "@/types";
import { Table, TableProps } from "antd";
import { useMemo } from "react";
import _groupBy from "lodash/groupBy";
import _get from "lodash/get";
import _flatten from "lodash/flatten";
import _set from "lodash/set";

type Calendar = {
  hourNumber: number;
  hourString: string;
};

export const hours: Calendar[] = _flatten(
  [...Array(24).keys()].map((hours) => [
    {
      hourNumber: hours,
      hourString: `${hours}:00`,
    },
    {
      hourNumber: hours + 0.25,
      hourString: `${hours}:15`,
    },
    {
      hourNumber: hours + 0.5,
      hourString: `${hours}:30`,
    },
    {
      hourNumber: hours + 0.75,
      hourString: `${hours}:45`,
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
key?: string,
  time?: string;
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
};

export function Schedule({ schedules }: ScheduleProps) {
    const columns:TableProps<TableRow>["columns"] = [
        {
            title: ' ',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'CN',
            dataIndex: 'sunday',
            key: 'sunday',
        },
        {
            title: 'T2',
            dataIndex: 'monday',
            key: 'monday',
        },
        {
            title: 'T3',
            dataIndex: 'tuesday',
            key: 'tuesday',
        },
        {
            title: 'T4',
            dataIndex: 'wednesday',
            key: 'wednesday',
        },
        {
            title: 'T5',
            dataIndex: 'thursday',
            key: 'thursday',
        },
        {
            title: 'T6',
            dataIndex: 'friday',
            key: 'friday',
        },
        {
            title: 'T7',
            dataIndex: 'saturday',
            key: 'saturday',
        },
    ]
  const data: TableRow[] =
    useMemo((): TableRow[] => {
      const groupByHours = _groupBy(schedules, "hour");
      const result: TableRow[] = [];
      for (const hour of hours) {
        const hourString = hour.hourString;
        const hourNumber = hour.hourNumber;
        const programInHours = _get(groupByHours, hourNumber) as unknown as ScheduleType[];
        const programByDayOfWeek = _groupBy(programInHours, "dayOfWeek");
        const rowCells: TableRow = {};
        rowCells.time = hourString;
        rowCells.key = hourString;
        for (const dayOfWeek of days) {
            _set(rowCells, dayOfWeek.key, programByDayOfWeek[dayOfWeek.day]?.map(schedule => schedule.channelName)?.join(", ") ?? "");
        }
        result.push(rowCells)
      }
      return result;
    }, [schedules]);
  return <Table columns={columns} dataSource={data} pagination={false}/>;
}
