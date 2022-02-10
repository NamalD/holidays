import { createMonthCalendar } from "./calendar.js";
import { generateMonthDateInfos } from "./dates.js";
import { takeNextBestHoliday } from "./holidayOptimisation.js";

let monthDateInfo = generateMonthDateInfos();

const render = () => {
  const app = document.getElementById("app");

  const monthCalendars = monthDateInfo.map(createMonthCalendar);
  app.replaceChildren(...monthCalendars);
}

let allDateInfo = monthDateInfo.flatMap(m => m);

// TODO: Input for annual leave
const maxAnnualLeaveInput = document.getElementById("max-annual-leave");
let annualLeaveLeft = maxAnnualLeaveInput.nodeValue;
maxAnnualLeaveInput.addEventListener("change", (e) => {
  monthDateInfo = generateMonthDateInfos();
  allDateInfo = monthDateInfo.flatMap(m => m);
  annualLeaveLeft = e.target.value;
})
// TODO: Max consecutive holiday limit

render();
let timeout;
timeout = setInterval(() => {
  if (annualLeaveLeft <= 0)
    return;

  takeNextBestHoliday(allDateInfo);
  annualLeaveLeft--;
  render();
}, 100)
