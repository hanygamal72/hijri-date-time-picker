# Min/Max Date Feature Guide

This guide demonstrates how to use the `minDate` and `maxDate` features in the Hijri Date Time Picker component to restrict date selection within specific ranges.

## Overview

The `minDate` and `maxDate` inputs allow you to define the earliest and latest dates that users can select. Dates outside this range will be disabled and cannot be selected.

## Basic Usage

### Setting a Minimum Date

```typescript
import { Component } from '@angular/core';
import { HijriDatePickerComponent } from 'hijri-date-time-picker';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HijriDatePickerComponent],
  template: `
    <hijri-date-picker
      [minDate]="minDate"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  // Only allow dates from today onwards
  minDate = new Date();

  onDateSelected(date: any) {
    console.log('Selected:', date);
  }
}
```

### Setting a Maximum Date

```typescript
@Component({
  template: `
    <hijri-date-picker
      [maxDate]="maxDate"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  // Only allow dates up to today
  maxDate = new Date();
  
  onDateSelected(date: any) {
    console.log('Selected:', date);
  }
}
```

### Combining Min and Max Dates

```typescript
@Component({
  template: `
    <hijri-date-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      [futureValidation]="false"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class ExampleComponent {
  // Allow only dates within the last 30 days
  minDate = new Date(new Date().setDate(new Date().getDate() - 30));
  maxDate = new Date();
  
  onDateSelected(date: any) {
    console.log('Selected:', date);
  }
}
```

## Common Use Cases

### 1. Booking System (Future Dates Only)

```typescript
export class BookingComponent {
  // Start from today
  minDate = new Date();
  
  // Allow bookings up to 90 days in advance
  maxDate = new Date(new Date().setDate(new Date().getDate() + 90));
}
```

### 2. Historical Data Entry (Past Dates Only)

```typescript
export class HistoricalDataComponent {
  // Allow dates from January 1, 2000
  minDate = new Date('2000-01-01');
  
  // Up to yesterday
  maxDate = new Date(new Date().setDate(new Date().getDate() - 1));
}
```

### 3. Event Registration (Specific Date Range)

```typescript
export class EventRegistrationComponent {
  // Registration opens on a specific date
  minDate = new Date('2024-01-15');
  
  // Registration closes on event date
  maxDate = new Date('2024-03-30');
}
```

### 4. Age Verification (Date of Birth)

```typescript
export class AgeVerificationComponent {
  // Must be at least 18 years old
  maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );
  
  // Maximum age of 100 years
  minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100)
  );
}
```

### 5. Dynamic Date Range

```typescript
export class DynamicRangeComponent {
  minDate: Date;
  maxDate: Date;

  constructor() {
    this.updateDateRange('last30days');
  }

  updateDateRange(range: string) {
    const today = new Date();
    
    switch(range) {
      case 'last7days':
        this.minDate = new Date(today.setDate(today.getDate() - 7));
        this.maxDate = new Date();
        break;
      
      case 'last30days':
        this.minDate = new Date(today.setDate(today.getDate() - 30));
        this.maxDate = new Date();
        break;
      
      case 'next30days':
        this.minDate = new Date();
        this.maxDate = new Date(today.setDate(today.getDate() + 30));
        break;
    }
  }
}
```

## Working with Hijri Calendar

The `minDate` and `maxDate` work seamlessly with both Gregorian and Hijri calendars. The component automatically converts the dates to the appropriate calendar system.

```typescript
@Component({
  template: `
    <hijri-date-picker
      [mode]="'hijri'"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [locale]="'ar'"
      [dir]="'rtl'"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class HijriRangeComponent {
  // The dates are in Gregorian, but will be converted to Hijri
  minDate = new Date('2024-01-01');
  maxDate = new Date('2024-12-31');
  
  onDateSelected(date: any) {
    // date object contains both Gregorian and Hijri representations
    console.log('Gregorian:', date.gregorian);
    console.log('Hijri:', date.hijri);
  }
}
```

## Disabling Future Validation

When using `minDate` and `maxDate`, you may want to disable the default `futureValidation` feature:

```typescript
@Component({
  template: `
    <hijri-date-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      [futureValidation]="false"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class CustomRangeComponent {
  minDate = new Date('2024-01-01');
  maxDate = new Date('2025-12-31');
}
```

## Year and Month Picker Behavior

When `minDate` and `maxDate` are set:

- The **year dropdown** will only show years within the valid range
- The **month navigation** remains functional, but disabled dates will be shown as disabled
- Users cannot select disabled dates even if they navigate to those months

## Tips and Best Practices

1. **Always set both min and max**: For the best user experience, set both `minDate` and `maxDate` to clearly define the valid range.

2. **Disable futureValidation**: When using custom date ranges, set `[futureValidation]="false"` to avoid conflicts.

3. **Provide feedback**: Consider showing the valid date range in your UI:
   ```html
   <p>Please select a date between {{ minDate | date }} and {{ maxDate | date }}</p>
   ```

4. **Dynamic ranges**: Update `minDate` and `maxDate` dynamically based on user input or business logic.

5. **Time considerations**: The date comparison ignores the time component, so:
   ```typescript
   minDate = new Date(); // Today at current time
   // Will allow selection of today's date, regardless of current time
   ```

## Combining with Other Features

### With Multiple Selection

```typescript
@Component({
  template: `
    <hijri-date-picker
      [multiple]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [showConfirmButton]="true"
      (dateSelected)="onDatesSelected($event)">
    </hijri-date-picker>
  `
})
export class MultipleWithRangeComponent {
  minDate = new Date(new Date().setDate(new Date().getDate() - 7));
  maxDate = new Date();
  
  onDatesSelected(dates: any[]) {
    console.log('Selected dates:', dates);
  }
}
```

### With Time Selection

```typescript
@Component({
  template: `
    <hijri-date-picker
      [enableTime]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [futureValidation]="false"
      (dateSelected)="onDateTimeSelected($event)">
    </hijri-date-picker>
  `
})
export class DateTimeWithRangeComponent {
  minDate = new Date();
  maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
  
  onDateTimeSelected(dateTime: any) {
    console.log('Selected date and time:', dateTime);
  }
}
```

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minDate` | `Date \| undefined` | `undefined` | Minimum selectable date. Dates before this will be disabled. |
| `maxDate` | `Date \| undefined` | `undefined` | Maximum selectable date. Dates after this will be disabled. |

## Browser Compatibility

The minDate/maxDate feature works in all modern browsers that support the Date object and Angular framework.

## Troubleshooting

### Dates not being disabled

- Verify that `minDate` and `maxDate` are valid Date objects
- Check that `futureValidation` is set to `false` if you're using custom ranges
- Ensure dates are in the correct format

### Year dropdown showing wrong years

- The year dropdown automatically adjusts based on `minDate` and `maxDate`
- If you see unexpected years, check your date values

### Timezone issues

- The component uses local timezone for all date comparisons
- Be aware of timezone differences when setting dates programmatically
