import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HijriDatePickerComponent } from './lib/hijri-date-picker.component';
import { SelectedDate, DatePickerStyles } from './lib/hijri-date-picker.types';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [HijriDatePickerComponent],
  template: `
    <div class="demo-container">
      <h1>Hijri Date Picker Demo</h1>
      
      <div class="demo-grid">
        <!-- Example 1: Basic Gregorian -->
        <div class="demo-card">
          <h2>Basic Gregorian</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [canChangeMode]="true"
            (dateSelected)="onDateSelected($event, 'basic')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['basic']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['basic'] | json }}</pre>
          </div>
        </div>

        <!-- Example 2: Hijri with Arabic -->
        <div class="demo-card">
          <h2>Hijri Calendar (Arabic)</h2>
          <hijri-date-picker
            [mode]="'hijri'"
            [locale]="'ar'"
            [dir]="'rtl'"
            [canChangeMode]="true"
            [submitTextButton]="'تأكيد'"
            [todaysDateText]="'اليوم'"
            [yearSelectLabel]="'السنة'"
            [monthSelectLabel]="'الشهر'"
            (dateSelected)="onDateSelected($event, 'hijri')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['hijri']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['hijri'] | json }}</pre>
          </div>
        </div>

        <!-- Example 3: Multiple Selection -->
        <div class="demo-card">
          <h2>Multiple Selection</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [multiple]="true"
            [showConfirmButton]="true"
            [submitTextButton]="'Confirm Selection'"
            (dateSelected)="onDateSelected($event, 'multiple')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['multiple']">
            <strong>Selected Dates:</strong>
            <pre>{{ selectedDates['multiple'] | json }}</pre>
          </div>
        </div>

        <!-- Example 4: Custom Styling -->
        <div class="demo-card">
          <h2>Custom Theme</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [styles]="customStyles"
            [canChangeMode]="true"
            (dateSelected)="onDateSelected($event, 'custom')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['custom']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['custom'] | json }}</pre>
          </div>
        </div>

        <!-- Example 5: Future Date Validation -->
        <div class="demo-card">
          <h2>No Future Dates</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [futureValidation]="true"
            [futureYearsLimit]="0"
            [todaysDateText]="'Select Today'"
            (dateSelected)="onDateSelected($event, 'validation')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['validation']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['validation'] | json }}</pre>
          </div>
        </div>

        <!-- Example 6: Minimal UI -->
        <div class="demo-card">
          <h2>Minimal UI</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [canChangeMode]="false"
            [todaysDateSection]="false"
            [disableYearPicker]="true"
            [disableMonthPicker]="true"
            (dateSelected)="onDateSelected($event, 'minimal')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['minimal']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['minimal'] | json }}</pre>
          </div>
        </div>

        <!-- Example 7: Date Range with minDate and maxDate -->
        <div class="demo-card">
          <h2>Date Range (Last 30 Days)</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [futureValidation]="false"
            (dateSelected)="onDateSelected($event, 'range')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['range']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['range'] | json }}</pre>
          </div>
        </div>

        <!-- Example 8: Future Dates Only with minDate -->
        <div class="demo-card">
          <h2>Future Dates Only (Next 60 Days)</h2>
          <hijri-date-picker
            [mode]="'greg'"
            [locale]="'en'"
            [minDate]="today"
            [maxDate]="maxFutureDate"
            [futureValidation]="false"
            [todaysDateText]="'Select Today or Future'"
            (dateSelected)="onDateSelected($event, 'futureOnly')">
          </hijri-date-picker>
          <div class="output" *ngIf="selectedDates['futureOnly']">
            <strong>Selected:</strong>
            <pre>{{ selectedDates['futureOnly'] | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: system-ui, -apple-system, sans-serif;
    }

    h1 {
      text-align: center;
      color: #1f2937;
      margin-bottom: 40px;
      font-size: 2.5rem;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
    }

    .demo-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .demo-card h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #374151;
      font-size: 1.25rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 10px;
    }

    .output {
      margin-top: 20px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .output strong {
      display: block;
      margin-bottom: 8px;
      color: #374151;
    }

    .output pre {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    @media (max-width: 768px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DemoComponent {
  selectedDates: { [key: string]: any } = {};
  
  // Date range examples
  today: Date = new Date();
  minDate: Date = new Date(new Date().setDate(new Date().getDate() - 30)); // 30 days ago
  maxDate: Date = new Date(); // Today
  maxFutureDate: Date = new Date(new Date().setDate(new Date().getDate() + 60)); // 60 days from now

  customStyles: DatePickerStyles = {
    primaryColor: '#059669',
    secondaryColor: '#34d399',
    selectedDateBackground: '#059669',
    todayColor: '#f59e0b',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif'
  };

  onDateSelected(date: SelectedDate | SelectedDate[], key: string) {
    this.selectedDates[key] = date;
    console.log(`Date selected for ${key}:`, date);
  }
}

// Bootstrap the demo application
bootstrapApplication(DemoComponent);
