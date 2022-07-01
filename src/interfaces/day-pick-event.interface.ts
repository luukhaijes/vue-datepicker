export interface DayPickEvent {
  state: 'past' | 'present' | 'future',
  day?: number;
  year?: number;
  date?: Date;
  month?: number;
}