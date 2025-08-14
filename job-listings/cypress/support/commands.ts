/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// Extend Cypress' Chainable interface


/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      loginAsUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginAsUser", () => {
  cy.request("POST", "https://akil-backend.onrender.com/login", {
    email: "nanatiwakjira432@gmail.com",
    password: "nana111",
  }).then((resp) => {
    const token: string = resp.body?.data?.accessToken;
    expect(token).to.exist;

    cy.window().then((win) => {
      win.localStorage.setItem("token", token); 
    });
  });
});



export {};
