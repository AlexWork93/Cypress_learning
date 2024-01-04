/// <reference types="Cypress" />

describe("Test contact us form on the webdriveruniversity page", () =>{

    it("Should be able to submit a successful submission of the form", () => {
        cy.visit("https://www.webdriveruniversity.com/");
        cy.get('#contact-us').find("h1").then(function(contactUsButton){
          console.log(contactUsButton.text());
        })
        cy.get('#contact-us').invoke('removeAttr', 'Target').click();
        cy.get('[name="first_name"]').type("MyName");
        cy.get('[name="last_name"]').type("MyLastName");
        cy.get('[name="email"]').type("example@mail.com")
        cy.get('textarea.feedback-input').should('have.attr', "placeholder").and('equal', 'Comments');
        cy.get('textarea.feedback-input').should('have.attr', "placeholder").and('contain', 'Comm');
        cy.get('textarea.feedback-input').type("some comment");
        cy.get('[type="submit"]').click();
        cy.get('div#fountainG div').should('have.length', 8);
        cy.get('div#contact_reply h1').should('have.text', 'Thank You for your Message!')
    })

    it("Should net be able to submit a form if not all required fields are filled", () => {
      cy.visit("https://www.webdriveruniversity.com/");
      cy.get('#contact-us').invoke('removeAttr', 'Target').click();
      cy.get('[name="first_name"]').type("MyName");
      cy.get('[name="last_name"]').type("MyLastName");
      cy.get('[name="email"]').type("example@mail.com")
      cy.get('[type="submit"]').click();
      cy.get('body').should('contain.text', 'Error: all fields are required');
    })

    it.only("Some approaches to open different origins", () => {
      cy.visit("https://www.webdriveruniversity.com/");
      cy.wait(1000);
      cy.get('#automation-test-store').invoke('removeAttr', 'target').click();
      cy.wait(1000);
      cy.visit("https://www.webdriveruniversity.com/");
      cy.wait(1000);
      cy.origin('automationteststore.com/', () => {
        cy.visit('/');
        cy.wait(1000);
      })
      cy.visit("https://www.webdriveruniversity.com/");
      cy.wait(1000);
      cy.origin('automationteststore.com/', () => {
        cy.visit('/');
        cy.wait(1000);
      })
    })

})
