import { addDate, calculateDuration, isHoliday } from "./dates.js";

export const calculateHolidayRuns = (allDateInfo) => {
  // Calculate consecutive holiday runs
  let inRun = false;
  let runStart = null;
  let runEnd = null;
  let runs = [];
  const lastDate = allDateInfo[allDateInfo.length - 1];

  for (const date of allDateInfo) {
    if (isHoliday(date)) {
      inRun = true;

      // Set start if it hasn't been set yet
      runStart = runStart ?? date;
      runEnd = date;

      // Finish run if last date
      if (date === lastDate) {
        runs.push({
          start: runStart,
          end: runEnd,
        });
      }
    } else {
      inRun = false

      if (runStart && runEnd) {
        runs.push({
          start: runStart,
          end: runEnd,
        });
      }

      runStart = null;
      runEnd = null;
    }
  }

  runs = runs.map(run => ({
    ...run,
    duration: calculateDuration(run)
  }));

  return runs;
}

export const calculateBestHolidayRuns = (runs) => {
  // Best run is the one which has the highest duration and is closest to current date
  const bestRun = runs.sort((left, right) => right.duration - left.duration)[0];
  const otherRuns = runs.filter(run => run !== bestRun);

  // Calculate the closest previous and next up runs
  const previousRun = otherRuns.reduce((prev, curr) => {
    const bestStartTime = bestRun.start.date.getTime();

    const currCloseness = bestStartTime - curr.end.date.getTime();
    if (currCloseness < 0)
      return prev;

    const prevCloseness = bestStartTime - prev.end.date.getTime();
    if (prevCloseness < 0)
      return curr;

    return (currCloseness < prevCloseness) ? curr : prev;
  });

  const nextRun = otherRuns.reduce((prev, curr) => {
    const bestEndTime = bestRun.end.date.getTime();

    const currCloseness = curr.start.date.getTime() - bestEndTime;
    if (currCloseness < 0)
      return prev;

    const prevCloseness = prev.start.date.getTime() - bestEndTime;
    if (prevCloseness < 0)
      return curr;

    return (currCloseness < prevCloseness) ? curr : prev;
  })

  // Check which is closer
  const previousDuration = bestRun.start.date.getTime() - previousRun.end.date.getTime();
  const nextDuration = previousRun.start.date.getTime() - bestRun.end.date.getTime();

  const closestRun = (nextDuration < previousDuration) ? nextRun : previousRun;

  return {
    best: bestRun,
    closest: closestRun,
    direction: closestRun === nextRun ? "next" : "previous"
  };
}

export const takeSingleHoliday = (allDateInfo, best, direction) => {
  const holidayToTake = direction === "next"
    ? addDate(best.end.date, 1)
    : addDate(best.start.date, -1)

  let holidayToTakeDateInfo = allDateInfo.find(info => info.date.getTime() === holidayToTake.getTime());
  holidayToTakeDateInfo.annualLeave = true;

  return holidayToTakeDateInfo;
}

export const takeNextBestHoliday = (allDateInfo) => {
  const runs = calculateHolidayRuns(allDateInfo);
  const { best, direction } = calculateBestHolidayRuns(runs);
  takeSingleHoliday(allDateInfo, best, direction);
}

