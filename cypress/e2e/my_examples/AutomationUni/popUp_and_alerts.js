/// <reference types="Cypress" />

const popUpAlertsButtonLocator = '#popup-alerts';
const button01Locator = '#button1';
const button02Locator = '#button2';
const button03Locator = '#button3';
const button04Locator = '#button4';
const confirmAlertTextLocator = '#confirm-alert-text';

describe('have an experience with handling pup ups and alerts', () => {
    it('Alert', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get(popUpAlertsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(button01Locator).find('p').click();
        cy.on(BasePage.windowAlert, ($text) =>{
            expect($text).to.be.eq('I am an alert box!')
        })
    });

    it('Alert using stub', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get(popUpAlertsButtonLocator).invoke('removeAttr', 'target').click();
        const stub = cy.stub();
        cy.on(BasePage.windowAlert, stub)
        // Alert is automatically confirmed anyway
        cy.get(button01Locator).find('p').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('I am an alert box!')
        });        
    });

    it('Confirm box, click OK', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get(popUpAlertsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(button04Locator).find('p').click();
        cy.on(BasePage.windowConfirm, ($text) =>{
            expect($text).to.be.eq('Press a button!')
            return true;
        })
        cy.get('#confirm-alert-text').should('have.text', 'You pressed OK!');

    });

    it('Confirm box, click OK with stub', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get(popUpAlertsButtonLocator).invoke('removeAttr', 'target').click();
        const stub = cy.stub();
        cy.on(BasePage.windowConfirm, stub);
        cy.get(button04Locator).find('p').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Press a button!')
        }).then(() => {
            return true;
        }).then(() => {
            cy.get(confirmAlertTextLocator).should('have.text', 'You pressed OK!');
        });
    });

    it('Confirm box, click CANCEL', () => {
        cy.visit('https://www.webdriveruniversity.com');
        cy.get(popUpAlertsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(button04Locator).find('p').click();
        cy.on(BasePage.windowConfirm, ($text) =>{
            expect($text).to.be.eq('Press a button!')
            return false;
        })
        cy.get(confirmAlertTextLocator).should('have.text', 'You pressed Cancel!');
    });

    it('Confirm box, click CANCEL with stub', () => {
        //Doesn't work, better use approach with cy.on
    });
});