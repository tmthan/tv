export type Schedule = {
  channelName: string;
  hour: number; // 10.5 is 10h30
  dayOfWeek: number;
  programeName?: string;
  fptplay?: number; // so kenh tren fpt play
  kplus?: number; // so kenh tren k+
};
