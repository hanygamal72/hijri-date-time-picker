# Hijri Date Picker Component

An Angular standalone component for dual-mode Gregorian and Hijri date selection using the Umm Al-Qura calendar system.

## Features

✨ **Dual Calendar Support**: Switch between Gregorian and Hijri (Umm Al-Qura) calendars  
🌍 **Localization**: Full support for English and Arabic languages  
↔️ **RTL/LTR**: Automatic layout direction based on locale  
📅 **Multiple Selection**: Single or multiple date selection modes  
🎨 **Customizable Styling**: Comprehensive theming via CSS variables  
✅ **Validation**: Future date validation with configurable limits  
📱 **Responsive**: Mobile-friendly design  
♿ **Accessible**: ARIA labels and keyboard navigation support

## Installation

```bash
npm install hijri-date-picker hijri-date-time
```

## Dependencies

- `@angular/core` >= 15.0.0
- `@angular/common` >= 15.0.0
- `hijri-date-time` ^1.0.0

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { HijriDatePickerComponent, SelectedDate } from 'hijri-date-picker';

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
    console.log('Gregorian:', date.formatted.gregorian);
    console.log('Hijri:', date.formatted.hijri);
  }
}
```

### Advanced Example with All Options

```typescript
import { Component } from '@angular/core';
import { HijriDatePickerComponent, SelectedDate, DatePickerStyles } from 'hijri-date-picker';

@Component({
  selector: 'app-advanced',
  standalone: true,
  imports: [HijriDatePickerComponent],
  template: `
    <hijri-date-picker
      [canChangeMode]="true"
      [mode]="'hijri'"
      [dir]="'rtl'"
      [locale]="'ar'"
      [futureValidation]="false"
      [futureYearsLimit]="20"
      [multiple]="true"
      [isRequired]="true"
      [showConfirmButton]="true"
      [submitTextButton]="'تأكيد'"
      [todaysDateText]="'اليوم'"
      [ummAlQuraDateText]="'التقويم الهجري (أم القرى)'"
      [yearSelectLabel]="'السنة'"
      [monthSelectLabel]="'الشهر'"
      [todaysDateSection]="true"
      [markToday]="true"
      [disableYearPicker]="false"
      [disableMonthPicker]="false"
      [disableDayPicker]="false"
      [styles]="customStyles"
      (dateSelected)="onMultipleDatesSelected($event)"
      (modeChanged)="onModeChanged($event)">
    </hijri-date-picker>
  `
})
export class AdvancedComponent {
  customStyles: DatePickerStyles = {
    primaryColor: '#059669',
    secondaryColor: '#34d399',
    selectedDateBackground: '#059669',
    todayColor: '#f59e0b',
    borderRadius: '12px',
    fontFamily: 'Cairo, sans-serif'
  };

  onMultipleDatesSelected(dates: SelectedDate[]) {
    console.log('Selected dates:', dates);
  }

  onModeChanged(mode: 'greg' | 'hijri') {
    console.log('Calendar mode changed to:', mode);
  }
}
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

#### Validation

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `futureValidation` | `boolean` | `true` | Prevent selecting dates beyond limit |
| `futureYearsLimit` | `number` | `10` | Maximum years in the future |
| `isRequired` | `boolean` | `false` | Require date selection before submit |

#### Selection

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `multiple` | `boolean` | `false` | Enable multiple date selection |
| `showConfirmButton` | `boolean` | `false` | Show submit button |

#### Labels

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `submitTextButton` | `string` | `'Submit'` | Submit button text |
| `todaysDateText` | `string` | `'Today'` | Today button text |
| `ummAlQuraDateText` | `string` | `'Umm Al-Qura Calendar'` | Calendar type label |
| `yearSelectLabel` | `string` | `'Year'` | Year dropdown label |
| `monthSelectLabel` | `string` | `'Month'` | Month dropdown label |

#### Display Options

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `todaysDateSection` | `boolean` | `true` | Show today button |
| `markToday` | `boolean` | `true` | Highlight today's date |
| `disableYearPicker` | `boolean` | `false` | Hide year selector |
| `disableMonthPicker` | `boolean` | `false` | Hide month selector |
| `disableDayPicker` | `boolean` | `false` | Hide day grid |

#### Styling

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `styles` | `DatePickerStyles` | `{}` | Custom style configuration |

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
  formatted: {
    gregorian: string;
    hijri: string;
  };
}
```

#### DatePickerStyles

```typescript
interface DatePickerStyles {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  selectedDateColor?: string;
  selectedDateBackground?: string;
  todayColor?: string;
  disabledColor?: string;
  borderColor?: string;
  hoverColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
}
```

## Styling Examples

### Custom Theme

```typescript
const customTheme: DatePickerStyles = {
  primaryColor: '#6366f1',
  secondaryColor: '#818cf8',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  selectedDateBackground: '#6366f1',
  selectedDateColor: '#ffffff',
  todayColor: '#10b981',
  borderRadius: '8px',
  fontFamily: 'Inter, sans-serif'
};
```

### Dark Theme

```typescript
const darkTheme: DatePickerStyles = {
  primaryColor: '#818cf8',
  secondaryColor: '#6366f1',
  backgroundColor: '#1f2937',
  textColor: '#f9fafb',
  borderColor: '#374151',
  hoverColor: '#374151',
  selectedDateBackground: '#818cf8'
};
```

## Localization

The component automatically adjusts:
- Month names (Gregorian/Hijri)
- Weekday names
- Date formatting
- Text direction (RTL for Arabic)

### Arabic Example

```html
<hijri-date-picker
  [locale]="'ar'"
  [dir]="'rtl'"
  [mode]="'hijri'"
  [submitTextButton]="'إرسال'"
  [todaysDateText]="'اليوم'">
</hijri-date-picker>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Built with:
- [Angular](https://angular.io/)
- [hijri-date-time](https://www.npmjs.com/package/hijri-date-time) - Hijri calendar conversions
