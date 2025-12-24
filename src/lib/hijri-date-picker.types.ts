/**
 * Date picker mode types
 */
export type DateMode = 'greg' | 'hijri';

/**
 * Text direction types
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Locale types
 */
export type Locale = 'en' | 'ar';

/**
 * Selected date information
 */
export interface SelectedDate {
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

/**
 * Time format types
 */
export type TimeFormat = '12' | '24';

/**
 * Custom styling configuration
 */
export interface DatePickerStyles {
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

/**
 * Label configuration
 */
export interface DatePickerLabels {
  submitTextButton?: string;
  todaysDateText?: string;
  ummAlQuraDateText?: string;
  yearSelectLabel?: string;
  monthSelectLabel?: string;
}

/**
 * Display configuration
 */
export interface DatePickerDisplay {
  todaysDateSection?: boolean;
  markToday?: boolean;
  disableYearPicker?: boolean;
  disableMonthPicker?: boolean;
  disableDayPicker?: boolean;
}

/**
 * Month names in different locales
 */
export const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const GREGORIAN_MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

export const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani',
  'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

export const HIJRI_MONTHS_AR = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الثانية',
  'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

export const WEEKDAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAY_NAMES_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
