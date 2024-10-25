declare namespace CodeceptJS {
  interface I {
    amOnPage(url: string): void;
    see(text: string): void;
    fillField(field: string, value: string): void;
    click(locator: string): void;
    say(message: string): void;
    useAI(description: string): Promise<void>;
  }

  interface MainConfig {
    tests: string;
    output: string;
    helpers: any;
    include: any;
    name: string;
    plugins?: any;
  }
}

declare const Feature: (title: string) => void;
declare const Scenario: (title: string, callback: Function) => void;