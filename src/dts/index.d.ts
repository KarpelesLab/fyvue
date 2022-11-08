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

export interface ObjectS2S {
  [key:string] : string;
}
export interface ObjectS2Any {
  [key:string]: any;
}
export interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}

export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[]|Set<any>|undefined|boolean;
