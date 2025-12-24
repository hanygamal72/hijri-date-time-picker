# Initial Date Binding - Usage Guide

## Overview

The Hijri Date Picker now supports binding initial/pre-selected dates through input properties. This allows you to programmatically set which date(s) should be selected when the calendar loads.

## Single Selection Mode

Use the `initialSelectedDate` input to bind a single date:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <hijri-date-picker
      [initialSelectedDate]="myDate"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  // Set initial date to today
  myDate = new Date();
  
  // Or set to a specific date
  // myDate = new Date(2024, 11, 24); // December 24, 2024
  
  onDateSelected(date: SelectedDate) {
    console.log('Selected:', date);
  }
}
```

## Multiple Selection Mode

Use the `initialSelectedDates` input to bind multiple dates:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <hijri-date-picker
      [multiple]="true"
      [initialSelectedDates]="myDates"
      [showConfirmButton]="true"
      (dateSelected)="onDatesSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  // Pre-select multiple dates
  myDates = [
    new Date(2024, 11, 24),  // December 24, 2024
    new Date(2024, 11, 25),  // December 25, 2024
    new Date(2024, 11, 31)   // December 31, 2024
  ];
  
  onDatesSelected(dates: SelectedDate[]) {
    console.log('Selected dates:', dates);
  }
}
```

## Dynamic Updates

The component automatically updates when the input values change:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="setToday()">Set to Today</button>
    <button (click)="setCustomDate()">Set Custom Date</button>
    
    <hijri-date-picker
      [initialSelectedDate]="selectedDate"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  selectedDate = new Date();
  
  setToday() {
    this.selectedDate = new Date();
  }
  
  setCustomDate() {
    this.selectedDate = new Date(2024, 0, 1); // January 1, 2024
  }
  
  onDateSelected(date: SelectedDate) {
    console.log('Selected:', date);
  }
}
```

## Hijri Mode Example

Works seamlessly with Hijri calendar mode:

```typescript
@Component({
  selector: 'app-hijri-example',
  template: `
    <hijri-date-picker
      [mode]="'hijri'"
      [locale]="'ar'"
      [dir]="'rtl'"
      [initialSelectedDate]="myDate"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class HijriExampleComponent {
  myDate = new Date(); // Gregorian date - will be converted to Hijri
  
  onDateSelected(date: SelectedDate) {
    console.log('Gregorian:', date.gregorian);
    console.log('Hijri:', date.hijri);
    console.log('Formatted Hijri:', date.formatted.hijri);
  }
}
```

## Key Points

- **Single mode**: Use `initialSelectedDate` (singular) with a single `Date` object
- **Multiple mode**: Use `initialSelectedDates` (plural) with an array of `Date` objects
- **Automatic conversion**: Gregorian dates are automatically converted to Hijri when in Hijri mode
- **Reactive**: Changes to the input properties automatically update the calendar
- **Type-safe**: Full TypeScript support with proper type definitions

## Complete Example

```typescript
import { Component } from '@angular/core';
import { HijriDatePickerComponent, SelectedDate } from 'hijri-date-picker';

@Component({
  selector: 'app-date-picker-demo',
  standalone: true,
  imports: [HijriDatePickerComponent],
  template: `
    <div class="demo">
      <h2>Pre-selected Date Example</h2>
      
      <hijri-date-picker
        [mode]="'greg'"
        [locale]="'en'"
        [initialSelectedDate]="preselectedDate"
        [canChangeMode]="true"
        (dateSelected)="handleDateSelection($event)">
      </hijri-date-picker>
      
      <div *ngIf="result">
        <h3>Selected Date:</h3>
        <p>Gregorian: {{ result.formatted.gregorian }}</p>
        <p>Hijri: {{ result.formatted.hijri }}</p>
      </div>
    </div>
  `
})
export class DatePickerDemoComponent {
  // Pre-select tomorrow's date
  preselectedDate = new Date();
  result?: SelectedDate;
  
  constructor() {
    this.preselectedDate.setDate(this.preselectedDate.getDate() + 1);
  }
  
  handleDateSelection(date: SelectedDate) {
    this.result = date;
  }
}
```
