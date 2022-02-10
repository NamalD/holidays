import { createMonthCalendar } from "./calendar.js";
import { MONTH_DATE_INFOS } from "./dates.js";

const app = document.getElementById("app");
const monthCalendars = MONTH_DATE_INFOS.map(createMonthCalendar);
monthCalendars.forEach(cal => app.appendChild(cal));

// TODO: Figure out max holidays for given annual leave
console.log(MONTH_DATE_INFOS);
