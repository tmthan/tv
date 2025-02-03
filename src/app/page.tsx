import { Now, Schedule, Today } from "@/components";
import { schedules } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Tivi",
  description: "Những chương trình hay ho",
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Now schedules={schedules} />
        <Today schedules={schedules} />
        <Schedule schedules={schedules} />
      </main>
    </div>
  );
}
