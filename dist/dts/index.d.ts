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

interface ObjectS2S {
  [key:string] : string;
}
interface ObjectS2Any {
  [key:string]: any;
}
interface FyVuevalidate {
  $model: any;
  $errors: Array<any>;
}

type modelValueType = string | number | string[] | undefined;
type checkboxValueType = any[]|Set<any>|undefined|boolean;

export { FyVueBreadcrumb, FyVueStep, FyVuevalidate, FyvueConfirm, FyvueOptions, ObjectS2Any, ObjectS2S, checkboxValueType, modelValueType };
