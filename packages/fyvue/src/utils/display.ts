import { useTranslation } from './helpers';
import { format as formatDateTimeago } from 'timeago.js';
import { getLocale } from '@karpeleslab/klbfw';

const cropText = (str: string, ml = 100, end = '...') => {
  if (str.length > ml) {
    return `${str.slice(0, ml)}${end}`;
  }
  return str;
};

const tailwindColors = {
  'fv-primary': {
    '50': '#f5f3ff',
    '100': '#ede9fe',
    '200': '#ddd6fe',
    '300': '#c4b5fd',
    '400': '#a78bfa',
    '500': '#8b5cf6',
    '600': '#7c3aed',
    '700': '#6d28d9',
    '800': '#5b21b6',
    '900': '#4c1d95',
  },
  'fv-neutral': {
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a',
  },
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const jpZipcode = (zip: string | number) => {
  const _zip = zip.toString();
  if (_zip.length != 7) return '';
  return '〒' + _zip.slice(0, 3) + '-' + _zip.slice(3, _zip.length);
};

const formatDate = (dt: Date | string) => {
  if (typeof dt == 'string') dt = new Date(dt);

  const translate = useTranslation();
  return translate('global_datetime', {
    val: dt,
    formatParams: {
      val: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  });
};
const formatDatetime = (dt: Date | string) => {
  if (typeof dt == 'string') dt = new Date(dt);

  const translate = useTranslation();
  return translate('global_datetime', {
    val: dt,
    formatParams: {
      val: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
    },
  });
};
const formatTimeago = (dt: Date | string) => {
  if (typeof dt == 'string') dt = new Date(dt);

  return formatDateTimeago(dt, getLocale().replace('_', '-'));
};

export {
  cropText,
  formatBytes,
  formatTimeago,
  formatDatetime,
  jpZipcode,
  formatDate,
};
