/// <reference types="Cypress" />


describe('handling iframes', () => {
    it('handling iframe and modal', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#iframe').invoke('removeAttr', 'target').click();

        cy.get('#frame').then($frame => {
            const body = $frame.contents().find('body');
            cy.wrap(body).as('iframe');
        })
        cy.get('@iframe').find('#button-find-out-more').click();
        cy.get('@iframe').find('.modal-body').find('p').as('modalBody').should('have.text', 'Welcome to webdriveruniversity.com we sell a wide range of electrical goods such as laptops, game consoles, cameras...')
        cy.get('@modalBody').should('be.visible');
        cy.get('@iframe').find('.btn-default').contains('Close').click();
        cy.get('@modalBody').should('not.be.visible');
        
    });
});