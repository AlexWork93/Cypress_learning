/// <reference types="Cypress" />


describe('have an experience with handling pup ups and alerts', () => {
    it('Alert', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button1').find('p').click();
        cy.on('window:alert', ($text) =>{
            expect($text).to.be.eq('I am an alert box!')
        })
        
        
    });

    it('Alert using stub', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        const stub = cy.stub();
        cy.on('window:alert', stub)
        // Alert is automatically confirmed anyway
        cy.get('#button1').find('p').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('I am an alert box!')
        });        
    });

    it('Confirm box, click OK', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button4').find('p').click();
        cy.on('window:confirm', ($text) =>{
            expect($text).to.be.eq('Press a button!')
            return true;
        })
        cy.get('#confirm-alert-text').should('have.text', 'You pressed OK!');

    });

    it('Confirm box, click OK with stub', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('#button4').find('p').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(() => {
            return true;
        }).then(() => {
            cy.get('#confirm-alert-text').should('have.text', 'You pressed OK!');
        });
    });

    it('Confirm box, click CANCEL', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get('#popup-alerts').invoke('removeAttr', 'target').click();
        cy.get('#button4').find('p').click();
        cy.on('window:confirm', ($text) =>{
            expect($text).to.be.eq('Press a button!')
            return false;
        })
        cy.get('#confirm-alert-text').should('have.text', 'You pressed Cancel!');
    });

    it('Confirm box, click CANCEL with stub', () => {
        //Doesn't work, better use approach with cy.on
    });
});