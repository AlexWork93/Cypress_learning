/// <reference types="Cypress" />

describe('Checkboxes dropdowns and radiobuttons', () => {
    it('checkboxes', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#checkboxes').find('[value="option-1"]').should('not.be.checked');
        cy.get('#checkboxes').find('[value="option-2"]').should('not.be.checked');
        cy.get('#checkboxes').find('[value="option-3"]').should('be.checked');
        cy.get('#checkboxes').find('[value="option-4"]').should('not.be.checked');

        cy.get('[type="checkbox"]').each(($element) => {
            if(['option-1', 'option-2', 'option-4'].includes($element.attr('value'))){
                cy.wrap($element).should('not.be.checked');
                expect($element).not.be.checked;
            }
        })

        cy.get('[type="checkbox"]').check(['option-1', 'option-2', 'option-4']);
        cy.get('#checkboxes').find('[value="option-3"]').uncheck();

        cy.get('#checkboxes').find('[value="option-1"]').should('be.checked');
        cy.get('#checkboxes').find('[value="option-2"]').should('be.checked');
        cy.get('#checkboxes').find('[value="option-3"]').should('not.be.checked');
        cy.get('#checkboxes').find('[value="option-4"]').should('be.checked');
    });

    it('Radiobuttons initially unchecked', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#radio-buttons').find('input').each(($rButton) => {
            expect($rButton).not.checked;
        })

        cy.get('#radio-buttons').find('input').check('green');
        cy.get('#radio-buttons').find('input').each(($rButton) => {
            if ($rButton.attr('value') == 'green'){
                expect($rButton).checked;
            } else {
                expect($rButton).not.checked;
            }
            
        })
    });

    it('Radiobuttons initially checked or disabled', () => {
        cy.visit('https://www.webdriveruniversity.com/')
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#radio-buttons-selected-disabled').find('input').each(($rButton) => {
            if ($rButton.attr('value') == 'lettuce'){
                expect($rButton).not.checked;
            } else if ($rButton.attr('value') == 'cabbage'){
                expect($rButton).disabled;
            } else if ($rButton.attr('value') == 'pubpkin'){
                expect($rButton).checked;
            }
        })

        cy.get('#radio-buttons-selected-disabled').find('input').check('lettuce');

        cy.get('#radio-buttons-selected-disabled').find('input').each(($rButton) => {
            if ($rButton.attr('value') == 'lettuce'){
                expect($rButton).checked;
            } else if ($rButton.attr('value') == 'cabbage'){
                expect($rButton).disabled;
            } else if ($rButton.attr('value') == 'pubpkin'){
                expect($rButton).not.checked;
            }
        })
    });

    it('dropdowns', () => {
        cy.visit('https://www.webdriveruniversity.com/');
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click();
        cy.get('#dropdowm-menu-1 option:selected').invoke('text').should('be.equal', 'JAVA');
        cy.get('#dropdowm-menu-2 option:selected').invoke('text').should('be.equal', 'Eclipse');
        cy.get('#dropdowm-menu-3 option:selected').invoke('text').should('be.equal', 'HTML');

        cy.get('#dropdowm-menu-1').select('c#');
        cy.get('#dropdowm-menu-2').select('testng');
        cy.get('#dropdowm-menu-3').select('javascript');


        cy.get('#dropdowm-menu-1 option:selected').invoke('text').should('be.equal', 'C#');
        cy.get('#dropdowm-menu-2 option:selected').invoke('text').should('be.equal', 'TestNG');
        cy.get('#dropdowm-menu-3 option:selected').invoke('text').should('be.equal', 'JavaScript');

        
        // disabled dropdown option

        cy.get('#fruit-selects').find('[value="orange"]').invoke('attr', 'disabled').should('be.equal', 'disabled');
        cy.get('#fruit-selects option:selected').invoke('text').should('be.equal', 'Grape');
        cy.get('#fruit-selects').select('apple');
        cy.get('#fruit-selects option:selected').invoke('text').should('be.equal', 'Apple');

    });
});