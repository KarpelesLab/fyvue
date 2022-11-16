declare const cropText: (str: string, ml?: number, end?: string) => string;
declare const formatBytes: (bytes: number, decimals?: number) => string;
declare const jpZipcode: (zip: string | number) => string;
declare const formatDate: (dt: Date | string) => string;
declare const formatDatetime: (dt: Date | string) => string;
declare const formatTimeago: (dt: Date | string) => string;
export { cropText, formatBytes, formatTimeago, formatDatetime, jpZipcode, formatDate, };
