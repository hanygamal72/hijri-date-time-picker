# Hijri Date Time Picker Component

An Angular standalone component for dual-mode Gregorian and Hijri date selection with time support using the Umm Al-Qura calendar system.

## Features

✨ **Dual Calendar Support**: Switch between Gregorian and Hijri (Umm Al-Qura) calendars  
🌍 **Localization**: Full support for English and Arabic languages  
↔️ **RTL/LTR**: Automatic layout direction based on locale  
📅 **Multiple Selection**: Single or multiple date selection modes  
🕒 **DateTime Support**: Integrated time selection with modern styling  
🎨 **Customizable Styling**: Comprehensive theming via CSS variables  
✅ **Validation**: Future date validation with configurable limits  
📱 **Responsive**: Mobile-friendly design  
♿ **Accessible**: ARIA labels and keyboard navigation support

## Installation

```bash
npm install hijri-date-time-picker hijri-date
```

## Dependencies

- `@angular/core` >= 15.0.0
- `@angular/common` >= 15.0.0
- `hijri-date` ^0.2.2

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { HijriDatePickerComponent, SelectedDate } from 'hijri-date-time-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HijriDatePickerComponent],
  template: `
    <hijri-date-picker
      [mode]="'greg'"
      [locale]="'en'"
      (dateSelected)="onDateSelected($event)">
    </hijri-date-picker>
  `
})
export class AppComponent {
  onDateSelected(date: SelectedDate) {
    console.log('Selected date:', date);
  }
}
```

### DateTime Picker Example

```html
<hijri-date-picker
  [enableTime]="true"
  [timeFormat]="'12'"
  [minuteStep]="15"
  [enableSeconds]="false"
  (dateSelected)="onDateTimeSelected($event)">
</hijri-date-picker>
```

### Initial Date Binding

```html
<!-- Single Date Selection -->
<hijri-date-picker
  [initialSelectedDate]="myDate">
</hijri-date-picker>

<!-- Multiple Dates Selection -->
<hijri-date-picker
  [multiple]="true"
  [initialSelectedDates]="myDates">
</hijri-date-picker>
```

## API Reference

### Inputs

#### Mode & Configuration

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `canChangeMode` | `boolean` | `true` | Enable/disable mode toggle button |
| `mode` | `'greg' \| 'hijri'` | `'greg'` | Initial calendar mode |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Text direction |
| `locale` | `'en' \| 'ar'` | `'en'` | Language locale |

#### DateTime Configuration (NEW)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `enableTime` | `boolean` | `false` | Enable time selection UI |
| `timeFormat` | `'12' \| '24'` | `'24'` | Time display format |
| `minuteStep` | `number` | `1` | Increment step for minutes |
| `enableSeconds` | `boolean` | `false` | Show seconds selection |
| `defaultTime` | `{ hours, minutes, seconds? }` | `undefined` | Default time to show |

#### Validation

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `futureValidation` | `boolean` | `true` | Prevent selecting dates beyond limit |
| `futureYearsLimit` | `number` | `10` | Maximum years in the future |
| `isRequired` | `boolean` | `false` | Require date selection before submit |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |

#### Selection & Binding

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `multiple` | `boolean` | `false` | Enable multiple date selection |
| `showConfirmButton` | `boolean` | `false` | Show submit button |
| `initialSelectedDate` | `Date` | `undefined` | Pre-select a single date |
| `initialSelectedDates` | `Date[]` | `[]` | Pre-select multiple dates |

#### Labels

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `submitTextButton` | `string` | `'Submit'` | Submit button text |
| `todaysDateText` | `string` | `'Today'` | Today button text |
| `ummAlQuraDateText` | `string` | `'Umm Al-Qura Calendar'` | Calendar type label |
| `yearSelectLabel` | `string` | `'Year'` | Year dropdown label |
| `monthSelectLabel` | `string` | `'Month'` | Month dropdown label |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `dateSelected` | `EventEmitter<SelectedDate \| SelectedDate[]>` | Emits when date(s) selected |
| `modeChanged` | `EventEmitter<'greg' \| 'hijri'>` | Emits when calendar mode changes |

### Types

#### SelectedDate

```typescript
interface SelectedDate {
  gregorian: Date;
  hijri: {
    year: number;
    month: number;
    day: number;
  };
  time?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  formatted: {
    gregorian: string;
    hijri: string;
    time?: string;
  };
}
```

## Styling

The component can be customized using the `styles` input or by overriding CSS variables:

```typescript
const customStyles: DatePickerStyles = {
  primaryColor: '#4f46e5',
  secondaryColor: '#818cf8',
  borderRadius: '8px'
};
```

## License

MIT

## Credits

Built with [Angular](https://angular.io/) and [hijri-date](https://www.npmjs.com/package/hijri-date).
