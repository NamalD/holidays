export const createMonthCalendar = (month) => {
  // Calendar container
  const calendarContainer = document.createElement("div");
  calendarContainer.className = "month";

  // Month name
  const monthName = month[0].date.toLocaleString('default', {month: 'long'});
  const monthLabel = document.createElement("label");
  monthLabel.className = "monthName";
  monthLabel.innerText = monthName;
  calendarContainer.appendChild(monthLabel);

  // Dates wrapper
  const datesWrapper = document.createElement("div");
  datesWrapper.className = "dates";
  calendarContainer.appendChild(datesWrapper);

  // Date elements
  month.map(dateInfo => {
    const dateElement = document.createElement("span");
    dateElement.className = "date";
    if (dateInfo.weekend) {
      dateElement.className += " weekend";
    }
    if (dateInfo.bankHoliday) {
      dateElement.className += " bankHoliday";
    }
    if (dateInfo.annualLeave) {
      dateElement.className += " annualLeave";
    }

    dateElement.innerText = dateInfo.date.getDate();
    return dateElement;
  }).forEach(el => datesWrapper.appendChild(el));

  return calendarContainer;
}
