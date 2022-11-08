//import '../../typings/env';
//import '../../typings/components';

interface FyvueOptions {
}

interface FyVueStep {
  name: string;
  icon?: string;
}

interface FyVueBreadcrumb {
  name: string;
  to?: string;
}

interface FyvueConfirm {
  title: string;
  desc: string;
  onConfirm: Function
}
interface KLBPaging {
  page_no: number;
  results_per_page: number;
  page_max: 1;
  page_max_relation: string;
  count: number;
}
interface KLBApiResult {
  result: string;
  time: number;
  data: Object | Array<any>;
  es_q_debug?: any;
  paging: KLBPaging;
}
interface FyDatatableHeader {
  [key:string] : string;
}
interface FyDatatableValue {
  [key:string]: any;
}
interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}

type modelValueType = string | number | string[] | undefined;
type checkboxValueType = any[]|Set<any>|undefined|boolean;

export { FyDatatableHeader, FyDatatableValue, FyVueBreadcrumb, FyVueStep, FyVuevalidate, FyvueConfirm, FyvueOptions, KLBApiResult, KLBPaging, checkboxValueType, modelValueType };
