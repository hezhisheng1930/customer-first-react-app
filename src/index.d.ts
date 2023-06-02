declare const PROCESS: {
  a: string
}

declare module '*.module.less' {
  const styles: { [className: string]: string };
  export default styles;
}
