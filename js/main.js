import { createMonthCalendar } from "./calendar.js";
import { MONTH_DATE_INFOS } from "./dates.js";
import { takeNextBestHoliday } from "./holidayOptimisation.js";

const render = () => {
  const app = document.getElementById("app");

  const monthCalendars = MONTH_DATE_INFOS.map(createMonthCalendar);
  app.replaceChildren(...monthCalendars);
}

const allDateInfo = MONTH_DATE_INFOS.flatMap(m => m);

// TODO: Input for annual leave
// TODO: Max consecutive holiday limit
let annualLeaveLeft = 22;

render();
let timeout;
timeout = setInterval(() => {
  if (annualLeaveLeft <= 0)
    return;

  takeNextBestHoliday(allDateInfo);
  annualLeaveLeft--;
  render();
}, 100)
