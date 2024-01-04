/// <reference types="Cypress" />

describe("Test contact us form on the Automation Test Store page", () =>{

    it("Should be able to submit a successful submission of the form", () => {
        cy.visit("https://automationteststore.com/");
        cy.xpath("//a[text()='Contact Us']").invoke('attr', 'href')
          .then(href => {
          cy.visit(`${href}`);
        });
        cy.get('#ContactUsFrm_first_name').type("MyName");
        cy.get('#ContactUsFrm_email').type("example@mail.com")
        cy.get('#ContactUsFrm_enquiry').type("some comment");
        cy.get('[title="Submit"]').click();
        cy.xpath("//h1/span[text()=' Contact Us']/ancestor::div[@class='container-fluid']//div[@class='contentpanel']").should(($m) => {
          expect($m).to.contain('Your enquiry has been successfully sent to the store owner!')
        })
        cy.xpath("//h1/span[text()=' Contact Us']/ancestor::div[@class='container-fluid']//div[@class='contentpanel']").should('contain.text', "Your enquiry has been successfully sent to the store owner!")
        cy.xpath("//h1/span[text()=' Contact Us']/ancestor::div[@class='container-fluid']//div[@class='contentpanel']").should('not.have.text', 'Your enquiry has been successfully sent to the store owner!')
        cy.pause();
        cy.wait(1000);
    })

    it("Should net be able to submit a form if not all required fields are filled", () => {
        
    })

})
