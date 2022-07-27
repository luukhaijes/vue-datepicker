import type { Ref } from "vue"
import { ref } from "vue";
import changeYear from 'date-fns/setYear';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import setMonthFn from 'date-fns/setMonth';
import format from "date-fns/format";

interface UseDateFn {
  date: Ref<Date>
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setMonthIncremental: (month: number) => void;
  setCurrentDate: (newCurrentDate: Date) => void;
  getMonthStrings: (year: number) => string[];
  getYearRange: number[];
}

export function useDate(): UseDateFn {
  const date = ref<Date>(new Date);
  const yearRange = ref<number[]>([]);

  const setYear = (year: number) => {
    const newDate = changeYear(date.value, year);
    setCurrentDate(newDate);
  }

  const setMonthIncremental = (month: number) => {
    const MONTH_AMOUNT = 1;
    let newDate: Date;
    if (month > 0) {
      newDate = addMonths(date.value, MONTH_AMOUNT);
    } else {
      newDate = subMonths(date.value, MONTH_AMOUNT)
    }

    setCurrentDate(newDate);
  }

  const setMonth = (month: number) => {
    let newDate = setMonthFn(date.value, month);
    setCurrentDate(newDate);
  }

  const setCurrentDate = (newCurrentDate: Date) => {
    if (newCurrentDate) {
      date.value = new Date(newCurrentDate);
    }
  }

  const getMonthStrings = (year: number) => [...Array(12).keys()].map(monthNumber => format(new Date(year, monthNumber, 1), 'MMMM'));

  const getYearRange = () => {
    const years = yearRange.value;
    if (!years.length) {
      for (let i = 1900; i < 2101; i++) {
        years.push(i);
      }
    }

    return years;
  }

  return {
    date,
    setYear,
    setMonth,
    setMonthIncremental,
    setCurrentDate,
    getMonthStrings,
    getYearRange: getYearRange()
  }
}