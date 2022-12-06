//import '../../typings/env';
//import '../../typings/components';

export interface FyvueOptions {
  loadKlb: boolean;
}

export interface FetchResult {
  [key: string]: any;
  fvReject?: boolean;
  data?: any;
  raw: any;
  status: any;
}
export interface ObjectS2S {
  [key: string]: string;
}
export interface ObjectS2Any {
  [key: string]: any;
}
/*
export interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}*/

export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[] | Set<any> | undefined | boolean;

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
