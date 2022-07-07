import { getDaysInMonth as fnsGetDaysInMonth } from "date-fns";
import type { Dictionary } from "../interfaces/dictionary.interface";

interface DateCell {
  day: number;
  date: Date;
  className?: Dictionary;
}

interface UseDateGrid {
  getDaysGrid: (date: Date) => DateCell[]
}

function useDateGrid(): UseDateGrid {
  const getDaysInMonth = (year: number, month: number): DateCell[] => {
    const pickerDate = new Date(year, month, 1);

    return [...Array(fnsGetDaysInMonth(pickerDate)).keys()].map<DateCell>(day => {
      day = day + 1;

      return {
        day: day,
        date: new Date(year, month, day)
      }
    })
  }

  const getRemainingDaysInPreviousMonth = (year: number, month: number): DateCell[] => {
    const pickerDate = new Date(year, month, 1).getDay() - 1;
    const daysInMonth = getDaysInMonth(year, month - 1);

    return daysInMonth.slice(daysInMonth.length - pickerDate);
  }

  const getRemainingDaysInNextMonth = (year: number, month: number): DateCell[] => {
    const pickerDay = new Date(year, month + 1, 0).getDay();
    const daysInMonth = getDaysInMonth(year, month + 1);

    const DAYS_IN_WEEKS = 7;
    if (pickerDay !== 0) {
      return daysInMonth.slice(0, DAYS_IN_WEEKS - pickerDay);
    }

    return [];
  }

  const setDaysArgs = (date: Date): [number, number] => [date.getFullYear(), date.getMonth()];

  const getDaysGrid = (date: Date): DateCell[] => {
    if (!date) {
      return [];
    }

    return [
      ...getRemainingDaysInPreviousMonth(...setDaysArgs(date)),
      ...getDaysInMonth(...setDaysArgs(date)),
      ...getRemainingDaysInNextMonth(...setDaysArgs(date))
    ];
  };

  return {
    getDaysGrid
  }
}

export { useDateGrid }