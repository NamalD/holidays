import { ENGLAND_BANK_HOLIDAYS, isBankHoliday } from "./bank-holidays.js";
import { createMonthCalendar } from "./calendar";

const range = (to) => [...Array(to).keys()];

const YEAR = 2022;
const MONTH_INDICES = range(12);

const SATURDAY = 6;
const SUNDAY = 0;
const isWeekend = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === SATURDAY || dayOfWeek === SUNDAY;
}

const lastDates = MONTH_INDICES.map(month => new Date(YEAR, month + 1, 0));

const createDateInfo = (lastDate, date) => {
  const dateObj = new Date(YEAR, lastDate.getMonth(), date);
  return {
    date: dateObj,
    bankHoliday: isBankHoliday(dateObj),
    weekend: isWeekend(dateObj),
  };
}

const months = lastDates.map(lastDate =>
  range(lastDate.getDate())
    .map(date => date + 1)
    .map(date => createDateInfo(lastDate, date))
);

const app = document.getElementById("app");
const monthCalendars = months.map(createMonthCalendar);
monthCalendars.forEach(cal => app.appendChild(cal));

console.log(ENGLAND_BANK_HOLIDAYS);
