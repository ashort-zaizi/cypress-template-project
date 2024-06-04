declare namespace Cypress {
    interface Chainable<Subject = any> {
      navigateToUrl(url: string): Chainable<any>;
      enterText(selector: string, text: string): Chainable<any>;
      clickButton(selector: string): Chainable<any>;
    }
  }
  