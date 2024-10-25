/// <reference types="codeceptjs" />

declare namespace CodeceptJS {
  interface I extends ReturnType<steps_file> {}
  interface Methods extends I {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}

declare function Feature(title: string): void;
declare function Scenario(title: string, callback: Function): void;