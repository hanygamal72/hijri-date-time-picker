import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
import {
  DateMode,
  Direction,
  Locale,
  SelectedDate,
  DatePickerStyles,
  DatePickerLabels,
  DatePickerDisplay,
  TimeFormat,
  GREGORIAN_MONTHS_EN,
  GREGORIAN_MONTHS_AR,
  HIJRI_MONTHS_EN,
  HIJRI_MONTHS_AR,
  WEEKDAY_NAMES_EN,
  WEEKDAY_NAMES_AR
} from './hijri-date-picker.types';

@Component({
  selector: 'hijri-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hijri-date-picker.component.html',
  styleUrls: ['./hijri-date-picker.component.css']
})
export class HijriDatePickerComponent implements OnInit, OnChanges {
  // Mode & Configuration
  @Input() canChangeMode: boolean = true;
  @Input() mode: DateMode = 'greg';
  @Input() dir: Direction = 'ltr';
  @Input() locale: Locale = 'en';

  // Validation
  @Input() futureValidation: boolean = true;
  @Input() futureYearsLimit: number = 10;
  @Input() isRequired: boolean = false;
  @Input() minDate?: Date; // Minimum selectable date
  @Input() maxDate?: Date; // Maximum selectable date

  // Selection
  @Input() multiple: boolean = false;
  @Input() showConfirmButton: boolean = false;
  @Input() initialSelectedDate?: Date; // For single selection mode - bind initial date
  @Input() initialSelectedDates?: Date[]; // For multiple selection mode - bind initial dates

  // Labels
  @Input() submitTextButton: string = 'Submit';
  @Input() todaysDateText: string = 'Today';
  @Input() ummAlQuraDateText: string = 'Umm Al-Qura Calendar';
  @Input() yearSelectLabel: string = 'Year';
  @Input() monthSelectLabel: string = 'Month';

  // Display Options
  @Input() todaysDateSection: boolean = true;
  @Input() markToday: boolean = true;
  @Input() disableYearPicker: boolean = false;
  @Input() disableMonthPicker: boolean = false;
  @Input() disableDayPicker: boolean = false;

  // Styling
  @Input() styles: DatePickerStyles = {};

  // Time Configuration
  @Input() enableTime: boolean = false;
  @Input() timeFormat: TimeFormat = '24';
  @Input() minuteStep: number = 1;
  @Input() enableSeconds: boolean = false;
  @Input() defaultTime?: { hours: number; minutes: number; seconds?: number };

  // Outputs
  @Output() dateSelected = new EventEmitter<SelectedDate | SelectedDate[]>();
  @Output() modeChanged = new EventEmitter<DateMode>();

  // Internal State
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  currentHijriYear: number = 0;
  currentHijriMonth: number = 0;
  
  selectedDates: SelectedDate[] = [];
  calendarDays: any[] = [];
  today: Date = new Date();
  
  years: number[] = [];
  months: string[] = [];
  weekdays: string[] = [];

  // Time state
  selectedTime: { hours: number; minutes: number; seconds: number } = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  isPM: boolean = false;

  ngOnInit(): void {
    this.initializeCalendar();
    this.initializeSelectedDates();
    this.initializeTime();
    this.updateLocaleData();
    this.generateYears();
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode'] || changes['locale']) {
      this.updateLocaleData();
      this.generateCalendar();
    }
    
    // Handle changes to initial selected dates
    if (changes['initialSelectedDate'] || changes['initialSelectedDates']) {
      this.initializeSelectedDates();
      this.generateCalendar();
    }

    // Handle changes to minDate or maxDate
    if (changes['minDate'] || changes['maxDate']) {
      this.generateYears();
      this.generateCalendar();
    }
  }

  private initializeCalendar(): void {
    const hijriToday = new HijriDate();
    this.currentHijriYear = hijriToday.getFullYear();
    this.currentHijriMonth = hijriToday.getMonth();
  }

  private initializeSelectedDates(): void {
    // Handle single selection mode
    if (!this.multiple && this.initialSelectedDate) {
      this.selectedDates = [this.createSelectedDate(this.initialSelectedDate)];
    }
    
    // Handle multiple selection mode
    if (this.multiple && this.initialSelectedDates && this.initialSelectedDates.length > 0) {
      this.selectedDates = this.initialSelectedDates.map(date => this.createSelectedDate(date));
    }
  }

  private initializeTime(): void {
    if (!this.enableTime) {
      return;
    }

    // Set default time if provided
    if (this.defaultTime) {
      this.selectedTime = {
        hours: this.defaultTime.hours,
        minutes: this.defaultTime.minutes,
        seconds: this.defaultTime.seconds || 0
      };
      
      // Set AM/PM for 12-hour format
      if (this.timeFormat === '12') {
        this.isPM = this.selectedTime.hours >= 12;
      }
    } else {
      // Default to current time
      const now = new Date();
      this.selectedTime = {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      };
      this.isPM = this.selectedTime.hours >= 12;
    }
  }

  private updateLocaleData(): void {
    // Update weekday names
    this.weekdays = this.locale === 'ar' ? WEEKDAY_NAMES_AR : WEEKDAY_NAMES_EN;

    // Update month names based on mode and locale
    if (this.mode === 'hijri') {
      this.months = this.locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN;
    } else {
      this.months = this.locale === 'ar' ? GREGORIAN_MONTHS_AR : GREGORIAN_MONTHS_EN;
    }
  }

  private generateYears(): void {
    const currentYear = this.mode === 'hijri' ? this.currentHijriYear : this.currentYear;
    let startYear = currentYear - 100;
    let endYear = currentYear + this.futureYearsLimit;
    
    // Adjust year range based on minDate and maxDate
    if (this.mode === 'greg') {
      if (this.minDate) {
        startYear = Math.max(startYear, this.minDate.getFullYear());
      }
      if (this.maxDate) {
        endYear = Math.min(endYear, this.maxDate.getFullYear());
      }
    } else if (this.mode === 'hijri') {
      if (this.minDate) {
        const minHijri = toHijri(this.minDate);
        startYear = Math.max(startYear, minHijri.getFullYear());
      }
      if (this.maxDate) {
        const maxHijri = toHijri(this.maxDate);
        endYear = Math.min(endYear, maxHijri.getFullYear());
      }
    }
    
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  private generateCalendar(): void {
    this.calendarDays = [];
    
    if (this.mode === 'hijri') {
      this.generateHijriCalendar();
    } else {
      this.generateGregorianCalendar();
    }
  }

  private generateGregorianCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({ day: null, disabled: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const isToday = this.isSameDay(date, this.today);
      const isDisabled = this.isDateDisabled(date);
      const isSelected = this.isDateSelected(date);

      this.calendarDays.push({
        day,
        date,
        isToday,
        isDisabled,
        isSelected,
        disabled: false
      });
    }
  }

  private generateHijriCalendar(): void {
    const hijriDate = new HijriDate(this.currentHijriYear, this.currentHijriMonth, 1);
    const gregorianDate = hijriDate.toGregorian();
    const startingDayOfWeek = gregorianDate.getDay();
    
    // Get days in Hijri month (typically 29 or 30)
    const daysInMonth = this.getDaysInHijriMonth(this.currentHijriYear, this.currentHijriMonth);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({ day: null, disabled: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hijriDay = new HijriDate(this.currentHijriYear, this.currentHijriMonth, day);
      const gregorianDay = hijriDay.toGregorian();
      const isToday = this.isSameDay(gregorianDay, this.today);
      const isDisabled = this.isDateDisabled(gregorianDay);
      const isSelected = this.isDateSelected(gregorianDay);

      this.calendarDays.push({
        day,
        date: gregorianDay,
        hijriDate: hijriDay,
        isToday,
        isDisabled,
        isSelected,
        disabled: false
      });
    }
  }

  private getDaysInHijriMonth(year: number, month: number): number {
    // Try to create the 30th day; if it fails, the month has 29 days
    try {
      new HijriDate(year, month, 30);
      return 30;
    } catch {
      return 29;
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  private isDateDisabled(date: Date): boolean {
    // Check minDate constraint
    if (this.minDate) {
      const minDateOnly = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly < minDateOnly) {
        return true;
      }
    }

    // Check maxDate constraint
    if (this.maxDate) {
      const maxDateOnly = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate());
      const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (dateOnly > maxDateOnly) {
        return true;
      }
    }

    // Check futureValidation constraint
    if (this.futureValidation) {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + this.futureYearsLimit);
      return date > maxDate;
    }

    return false;
  }

  private isDateSelected(date: Date): boolean {
    return this.selectedDates.some(selected => 
      this.isSameDay(selected.gregorian, date)
    );
  }

  onDayClick(dayInfo: any): void {
    if (dayInfo.disabled || dayInfo.isDisabled) {
      return;
    }

    const selectedDate = this.createSelectedDate(dayInfo.date);

    if (this.multiple) {
      const index = this.selectedDates.findIndex(d => 
        this.isSameDay(d.gregorian, dayInfo.date)
      );
      
      if (index > -1) {
        this.selectedDates.splice(index, 1);
      } else {
        this.selectedDates.push(selectedDate);
      }

      if (!this.showConfirmButton) {
        this.dateSelected.emit([...this.selectedDates]);
      }
    } else {
      this.selectedDates = [selectedDate];
      
      if (!this.showConfirmButton) {
        this.dateSelected.emit(selectedDate);
      }
    }

    this.generateCalendar();
  }

  private createSelectedDate(date: Date): SelectedDate {
    const hijriDate = toHijri(date);
    
    // If time is enabled, set the time on the date object
    if (this.enableTime) {
      let hours24 = this.selectedTime.hours;
      if (this.timeFormat === '12') {
        if (this.isPM && this.selectedTime.hours !== 12) {
          hours24 = this.selectedTime.hours + 12;
        } else if (!this.isPM && this.selectedTime.hours === 12) {
          hours24 = 0;
        }
      }
      date.setHours(hours24, this.selectedTime.minutes, this.selectedTime.seconds);
    }
    
    return {
      gregorian: date,
      hijri: {
        year: hijriDate.getFullYear(),
        month: hijriDate.getMonth(),
        day: hijriDate.getDate()
      },
      time: this.enableTime ? {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      } : undefined,
      formatted: {
        gregorian: this.formatGregorianDate(date),
        hijri: this.formatHijriDate(hijriDate),
        time: this.enableTime ? this.formatTime(date.getHours(), date.getMinutes(), date.getSeconds()) : undefined
      }
    };
  }

  private formatGregorianDate(date: Date): string {
    const day = date.getDate();
    const month = this.locale === 'ar' ? GREGORIAN_MONTHS_AR[date.getMonth()] : GREGORIAN_MONTHS_EN[date.getMonth()];
    const year = date.getFullYear();
    
    return this.locale === 'ar' 
      ? `${day} ${month} ${year}`
      : `${month} ${day}, ${year}`;
  }

  private formatHijriDate(hijriDate: HijriDate): string {
    const day = hijriDate.getDate();
    const month = this.locale === 'ar' 
      ? HIJRI_MONTHS_AR[hijriDate.getMonth()] 
      : HIJRI_MONTHS_EN[hijriDate.getMonth()];
    const year = hijriDate.getFullYear();
    
    return this.locale === 'ar' 
      ? `${day} ${month} ${year} هـ`
      : `${day} ${month} ${year} AH`;
  }

  onYearChange(event: Event): void {
    const year = parseInt((event.target as HTMLSelectElement).value);
    
    if (this.mode === 'hijri') {
      this.currentHijriYear = year;
    } else {
      this.currentYear = year;
    }
    
    this.generateCalendar();
  }

  onMonthChange(event: Event): void {
    const month = parseInt((event.target as HTMLSelectElement).value);
    
    if (this.mode === 'hijri') {
      this.currentHijriMonth = month;
    } else {
      this.currentMonth = month;
    }
    
    this.generateCalendar();
  }

  previousMonth(): void {
    if (this.mode === 'hijri') {
      if (this.currentHijriMonth === 0) {
        this.currentHijriMonth = 11;
        this.currentHijriYear--;
      } else {
        this.currentHijriMonth--;
      }
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.mode === 'hijri') {
      if (this.currentHijriMonth === 11) {
        this.currentHijriMonth = 0;
        this.currentHijriYear++;
      } else {
        this.currentHijriMonth++;
      }
    } else {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    }
    
    this.generateCalendar();
  }

  toggleMode(): void {
    if (!this.canChangeMode) {
      return;
    }

    this.mode = this.mode === 'greg' ? 'hijri' : 'greg';
    this.updateLocaleData();
    this.generateYears();
    this.generateCalendar();
    this.modeChanged.emit(this.mode);
  }

  selectToday(): void {
    const today = new Date();
    this.onDayClick({ date: today, disabled: false, isDisabled: false });
  }

  onSubmit(): void {
    if (this.isRequired && this.selectedDates.length === 0) {
      return;
    }

    if (this.multiple) {
      this.dateSelected.emit([...this.selectedDates]);
    } else if (this.selectedDates.length > 0) {
      this.dateSelected.emit(this.selectedDates[0]);
    }
  }

  // Time handling methods
  incrementTime(type: 'hours' | 'minutes' | 'seconds'): void {
    if (type === 'hours') {
      const max = this.timeFormat === '12' ? 12 : 23;
      this.selectedTime.hours = (this.selectedTime.hours + 1) > max ? (this.timeFormat === '12' ? 1 : 0) : this.selectedTime.hours + 1;
    } else if (type === 'minutes') {
      this.selectedTime.minutes = (this.selectedTime.minutes + this.minuteStep) > 59 ? 0 : this.selectedTime.minutes + this.minuteStep;
    } else if (type === 'seconds') {
      this.selectedTime.seconds = (this.selectedTime.seconds + 1) > 59 ? 0 : this.selectedTime.seconds + 1;
    }
    this.updateSelectedDateTime();
  }

  decrementTime(type: 'hours' | 'minutes' | 'seconds'): void {
    if (type === 'hours') {
      const min = this.timeFormat === '12' ? 1 : 0;
      const max = this.timeFormat === '12' ? 12 : 23;
      this.selectedTime.hours = (this.selectedTime.hours - 1) < min ? max : this.selectedTime.hours - 1;
    } else if (type === 'minutes') {
      this.selectedTime.minutes = (this.selectedTime.minutes - this.minuteStep) < 0 ? 59 : this.selectedTime.minutes - this.minuteStep;
    } else if (type === 'seconds') {
      this.selectedTime.seconds = (this.selectedTime.seconds - 1) < 0 ? 59 : this.selectedTime.seconds - 1;
    }
    this.updateSelectedDateTime();
  }

  onTimeChange(type: 'hours' | 'minutes' | 'seconds', event: any): void {
    const value = parseInt(event.target.value) || 0;
    
    if (type === 'hours') {
      const min = this.timeFormat === '12' ? 1 : 0;
      const max = this.timeFormat === '12' ? 12 : 23;
      this.selectedTime.hours = Math.max(min, Math.min(max, value));
    } else if (type === 'minutes') {
      this.selectedTime.minutes = Math.max(0, Math.min(59, value));
    } else if (type === 'seconds') {
      this.selectedTime.seconds = Math.max(0, Math.min(59, value));
    }
    
    this.updateSelectedDateTime();
  }

  setAMPM(pm: boolean): void {
    this.isPM = pm;
    this.updateSelectedDateTime();
  }

  private formatTime(hours: number, minutes: number, seconds: number): string {
    if (this.timeFormat === '12') {
      const displayHours = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const minutesStr = minutes.toString().padStart(2, '0');
      
      if (this.enableSeconds) {
        const secondsStr = seconds.toString().padStart(2, '0');
        return `${displayHours}:${minutesStr}:${secondsStr} ${ampm}`;
      }
      return `${displayHours}:${minutesStr} ${ampm}`;
    } else {
      const hoursStr = hours.toString().padStart(2, '0');
      const minutesStr = minutes.toString().padStart(2, '0');
      
      if (this.enableSeconds) {
        const secondsStr = seconds.toString().padStart(2, '0');
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
      }
      return `${hoursStr}:${minutesStr}`;
    }
  }

  private updateSelectedDateTime(): void {
    if (!this.enableTime || this.selectedDates.length === 0) {
      return;
    }

    // Convert 12-hour to 24-hour if needed
    let hours24 = this.selectedTime.hours;
    if (this.timeFormat === '12') {
      if (this.isPM && this.selectedTime.hours !== 12) {
        hours24 = this.selectedTime.hours + 12;
      } else if (!this.isPM && this.selectedTime.hours === 12) {
        hours24 = 0;
      }
    }

    // Update all selected dates with new time
    this.selectedDates = this.selectedDates.map(selectedDate => {
      const newDate = new Date(selectedDate.gregorian);
      newDate.setHours(hours24, this.selectedTime.minutes, this.selectedTime.seconds);
      
      return {
        ...selectedDate,
        gregorian: newDate,
        time: {
          hours: hours24,
          minutes: this.selectedTime.minutes,
          seconds: this.selectedTime.seconds
        },
        formatted: {
          ...selectedDate.formatted,
          time: this.formatTime(hours24, this.selectedTime.minutes, this.selectedTime.seconds)
        }
      };
    });
  }

  getCustomStyles(): any {
    return {
      '--primary-color': this.styles.primaryColor || '#4f46e5',
      '--secondary-color': this.styles.secondaryColor || '#818cf8',
      '--background-color': this.styles.backgroundColor || '#ffffff',
      '--text-color': this.styles.textColor || '#1f2937',
      '--selected-date-color': this.styles.selectedDateColor || '#ffffff',
      '--selected-date-background': this.styles.selectedDateBackground || '#4f46e5',
      '--today-color': this.styles.todayColor || '#10b981',
      '--disabled-color': this.styles.disabledColor || '#d1d5db',
      '--border-color': this.styles.borderColor || '#e5e7eb',
      '--hover-color': this.styles.hoverColor || '#f3f4f6',
      '--font-family': this.styles.fontFamily || 'system-ui, -apple-system, sans-serif',
      '--font-size': this.styles.fontSize || '14px',
      '--border-radius': this.styles.borderRadius || '8px'
    };
  }
}
