declare module 'hijri-date/lib/safe' {
  export default class HijriDate {
    constructor();
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    getDay(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;
    
    setFullYear(year: number): void;
    setMonth(month: number): void;
    setDate(day: number): void;
    setHours(hours: number): void;
    setMinutes(minutes: number): void;
    setSeconds(seconds: number): void;
    setMilliseconds(milliseconds: number): void;
    
    toGregorian(): Date;
    toString(): string;
    format(format: string): string;
    
    isToday(): boolean;
    isYesterday(): boolean;
    isTomorrow(): boolean;
    
    clone(): HijriDate;
    ignoreTime(): HijriDate;
  }
  
  export function toHijri(date: Date): HijriDate;
}

declare module 'hijri-date' {
  import HijriDate from 'hijri-date/lib/safe';
  export default HijriDate;
  export { toHijri } from 'hijri-date/lib/safe';
}
