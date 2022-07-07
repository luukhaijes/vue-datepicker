import { ref, unref } from "vue";
import type  { Ref } from "vue"
import addYears from 'date-fns/addYears';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

interface UseDateFn {
  date: Ref<Date>
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setCurrentDate: (newCurrentDate: Date) => void;
}

export function useDate(): UseDateFn {
  const date = ref<Date>(new Date);

  const setYear = (year: number) => {
    const newDate = addYears(date.value, year);
    setCurrentDate(newDate);
  }

  const setMonth = (month: number) => {
    const MONTH_AMOUNT = 1;
    let newDate: Date;
    if (month > 0) {
      newDate = addMonths(date.value, MONTH_AMOUNT);
    } else {
      newDate = subMonths(date.value, MONTH_AMOUNT)
    }

    setCurrentDate(newDate);
  }

  const setCurrentDate = (newCurrentDate: Date) => {
    if (newCurrentDate) {
      date.value = new Date(newCurrentDate);
    }
  }

  return {
    date,
    setYear,
    setMonth,
    setCurrentDate
  }
}