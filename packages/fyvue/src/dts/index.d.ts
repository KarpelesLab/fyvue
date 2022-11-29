//import '../../typings/env';
//import '../../typings/components';

export interface FyvueOptions {
  loadKlb: boolean;
}

export interface FyVueStep {
  name: string;
  icon?: string;
}

export interface FyVueBreadcrumb {
  name: string;
  to?: string;
}

export interface FetchResult {
  [key: string]: any;
  fvReject?: boolean;
}

export interface FyvueConfirm {
  title: string;
  desc: string;
  onConfirm: Function;
}

export interface ObjectS2S {
  [key: string]: string;
}
export interface ObjectS2Any {
  [key: string]: any;
}
export interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}

export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[] | Set<any> | undefined | boolean;
export type NavLink = {
  to: string;
  isExternal?: boolean;
  name: string;
  childrens?: NavLink[];
};

export interface SeoData {
  name?: string;
  title?: string;
  image?: string;
  imageType?: string;
  imageWidth?: string;
  imageHeight?: string;
  description?: string;
  published?: string;
  modified?: string;
  keywords?: string;
  type?: 'blog' | 'search' | 'article' | 'website';
  searchAction?: string;
  next?: string;
  prev?: string;
}
