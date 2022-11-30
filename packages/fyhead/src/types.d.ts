export interface FyHeadLazy {
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
  canonical?: string;
  locale?: string;
  robots?: string;
  url?: string;
}
export interface FyHeadEntry {
  key: string;
}
export interface FyHeadProperty extends FyHeadEntry {
  type?: 'property' | 'name';
  value: string;
  content: string;
}
export interface FyHeadLink extends FyHeadEntry {
  rel: string;
  href: string;
}
export interface FyHeadScript extends FyHeadEntry {
  src: string;
  nonce?: string;
  async?: boolean;
}
export interface FyHeadScripts {
  [key: string]: FyHeadScript;
}
export interface FyHeadProperties {
  [key: string]: FyHeadProperty;
}
export interface FyHeadLinks {
  [key: string]: FyHeadLink;
}
