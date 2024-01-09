/// <reference types="Cypress" />

describe('suggested list', () => {
    it('suggested list', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#autocomplete-textfield').invoke('removeAttr', 'target').click();
        cy.get('#myInput').type('i');
        cy.get('#myInputautocomplete-list').find('div').each($element => {
            const text = $element.text().toLowerCase().trim();
            cy.log(text)
            if(text === "ice cream"){
                cy.wrap($element).click();
            }
        })
        cy.get('#submit-button').click();
        cy.url().should($url => {
            expect($url).to.contain('food-item=Ice+cream');
        })


    });
});