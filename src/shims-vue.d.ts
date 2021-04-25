declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare var AMap;
declare module 'weixin-js-sdk';
declare global {
  interface Window {
    AMap: any;
  }
}