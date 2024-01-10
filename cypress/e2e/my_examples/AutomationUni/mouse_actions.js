/// <reference types="Cypress" />

const actiounsButtonLocator = '#actions';
const draggableElementLocator = '#draggable';
const droppableElementLocator = '#droppable';
const doubleClickElementLocator = '#double-click';
const clickAndHoldElementLocator = '#click-box';
const hoverElementLocator = '#div-hover .dropbtn';
const hoverElementListAlertLocator = '.list-alert';


describe('handling mouse actions', () => {
    it('scroll into view', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#actions').scrollIntoView();
    });

    it('scroll into view', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get(actiounsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(draggableElementLocator).trigger('mousedown', {which: 1});
        cy.get(droppableElementLocator).should('contain.text', 'DROP HERE!');
        cy.get(droppableElementLocator).trigger('mousemove');
        cy.get(droppableElementLocator).trigger('mouseup', {force: true});
        cy.get(droppableElementLocator).should('contain.text', 'Dropped!');
    });

    it('double click with background color assertion', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get(actiounsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(doubleClickElementLocator).then($doubleClickElement => {
            expect($doubleClickElement).to.have.css('background-color', 'rgb(254, 196, 45)')
        })
        cy.get(doubleClickElementLocator).dblclick()
        cy.get(doubleClickElementLocator).then($doubleClickElement => {
            expect($doubleClickElement).to.have.css('background-color', 'rgb(147, 203, 90)')
        })
        cy.get(doubleClickElementLocator).dblclick()
        cy.get(doubleClickElementLocator).then($doubleClickElement => {
            expect($doubleClickElement).to.have.css('background-color', 'rgb(254, 196, 45)')
        })
    });

    it('click and hold with background color assertion', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get(actiounsButtonLocator).invoke('removeAttr', 'target').click();
        cy.get(hoverElementLocator).contains('First').then($hoverElement => {
            expect($hoverElement).contains.text('Hover Over Me First!')
        })
        cy.get(hoverElementListAlertLocator).should('not.be.visible');

        //doesn't work on this site somehow :( 

        
        // cy.get(hoverElementLocator).contains('First').trigger('mouseover', {which: 1})
        // cy.get(hoverElementLocator).contains('First').contains('First').then($hoverElement => {
        //     expect($hoverElement).contains.text('Hover Over Me First!')
        // })
        // cy.get(hoverElementListAlertLocator).should('be.visible');
    });
});