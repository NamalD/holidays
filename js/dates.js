import { range } from "./utils.js";
import { isBankHoliday } from "./bank-holidays.js";

const YEAR = 2022;
const MONTH_INDICES = range(12);

// Last dates of each month of the year
const LAST_DATES = MONTH_INDICES.map(month => new Date(YEAR, month + 1, 0));

// Milliseconds in a day
const DAY_MILLISECONDS = 1000 * 3600 * 24;

const SATURDAY = 6;
const SUNDAY = 0;
export const isWeekend = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === SATURDAY || dayOfWeek === SUNDAY;
}

export const createDateInfo = (lastDate, date) => {
  const dateObj = new Date(YEAR, lastDate.getMonth(), date);
  return {
    date: dateObj,
    bankHoliday: isBankHoliday(dateObj),
    weekend: isWeekend(dateObj),
  };
}

// Date info for each day of every month
export const MONTH_DATE_INFOS = LAST_DATES.map(lastDate =>
  range(lastDate.getDate())
    .map(date => date + 1)
    .map(date => createDateInfo(lastDate, date))
);

export const calculateDuration = (run) => {
  const timeDiff = run.end.date.getTime() - run.start.date.getTime();
  return (timeDiff / DAY_MILLISECONDS) + 1;
}

export const addDate = (source, duration) => {
  const copy = new Date(source);
  copy.setDate(source.getDate() + duration);
  return copy;
}

export const isHoliday = (dateInfo) => dateInfo.weekend || dateInfo.bankHoliday || dateInfo.annualLeave;
