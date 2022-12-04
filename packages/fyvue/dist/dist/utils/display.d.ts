declare const cropText: (str: string, ml?: number, end?: string) => string;
declare const formatKlbRecurringPaymentCycle: (cycle?: string) => string;
declare const formatBytes: (bytes: number, decimals?: number) => string;
declare const jpZipcode: (zip: string | number) => string;
declare const formatDate: (dt: Date | string | number) => string;
declare const formatDatetime: (dt: Date | string | number) => string;
declare const formatTimeago: (dt: Date | string | number) => string;
export { cropText, formatBytes, formatTimeago, formatDatetime, jpZipcode, formatKlbRecurringPaymentCycle, formatDate, };