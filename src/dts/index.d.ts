//import '../../typings/env';
//import '../../typings/components';

export interface FyvueOptions {
}

export interface FyVueStep {
  name: string;
  icon?: string;
}

export interface FyVueBreadcrumb {
  name: string;
  to?: string;
}

export interface FyvueConfirm {
  title: string;
  desc: string;
  onConfirm: Function
}
export interface KLBPaging {
  page_no: number;
  results_per_page: number;
  page_max: 1;
  page_max_relation: string;
  count: number;
}
export interface KLBApiResult {
  result: string;
  time: number;
  data: Object | Array<any>;
  es_q_debug?: any;
  paging: KLBPaging;
}
export interface FyDatatableHeader {
  [key:string] : string;
}
export interface FyDatatableValue {
  [key:string]: any;
}
export interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}

export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[]|Set<any>|undefined|boolean;
