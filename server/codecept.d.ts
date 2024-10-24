declare namespace CodeceptJS {
  export interface MainConfig {
    tests: string;
    output: string;
    helpers: any;
    include: any;
    name: string;
    plugins?: any;
  }

  export interface I {
    amOnPage(url: string): void;
    see(text: string): void;
    fillField(field: string, value: string): void;
    click(locator: string): void;
  }
}
