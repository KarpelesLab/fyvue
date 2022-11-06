export interface FyvueOptions {
}
export type FyVueEvent = {
  name: string;
  data?: any;
};
export type FyVueStep = {
  name: string;
  icon?: string;
};
export type FyVueBreadcrumb = {
  name: string;
  to?: string;
};
export type FyvueConfirm = {
  title: string;
  desc: string;
  onConfirm: Function
}
