// https://github.com/zane-programs/schoop-v2/blob/master/web/src/pages/Home/HomeSchedule/index.tsx
// Either:
// { number: number, type: "PERIOD", start: string, end: string }
// { name: string, type: string, start: string, end: string }

export interface ScheduleItem {
  name?: string; // example: "Lunch"
  number?: number; // example: 1
  type: string; // example: "PERIOD"
  start: string; // "13:10" for 1:20 PM
  end: string; // "14:20" for 2:30 PM
  overrideSignifier?: string; // example: "MEET"
  overrideLink?: string; // override schedule link (for assemblies and such)
}

export type ScheduleItemTool = ScheduleItem & {
  id: string;
};

export interface StudentScheduleWithMessage {
  message: string;
}

// either an actual schedule or just a message
export type StudentSchedule = ScheduleItem[] | StudentScheduleWithMessage;
