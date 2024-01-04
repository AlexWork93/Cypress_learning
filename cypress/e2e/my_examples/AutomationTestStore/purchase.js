/// <reference types="Cypress" />

describe('Automation test store make a purchase', () => {

    it('User should be able to see only 4 products on the product page section featured', () => {
        cy.visit("https://automationteststore.com/");
        cy.get("#featured").find(".prdocutname").should('have.length', 4)
    });

    it('User should be able to see only 4 products on the product page section featured', () => {
        cy.visit("https://automationteststore.com/");
        cy.get("#featured").find(".prdocutname").eq(0).parent().parent().parent().find(".productcart").invoke('attr', 'title').as('title');
        cy.get('@title').should('eq', 'Add to Cart')
    });

    it('User scould be able to open detailed item page', () => {
        let titles = [];

        cy.visit("https://automationteststore.com/");
        cy.get("#featured").find(".prdocutname").each(($element, index, $list) => {
            cy.log($element.text())
            cy.wrap($element).invoke('text').as('text')
            cy.get('@text').then((text) => {
                cy.log(text);
                titles.push(text);
                cy.log(titles)
            })
        })
        cy.then(() => {
            for (let i = 0; i < titles.length; i++){
                cy.log(titles[i]);
                cy.get(".prdocutname").each(($link) => {
                    cy.log(i)
                    if ($link.text() == titles[i]) {
                        cy.wrap($link).click();
                        cy.get("#product_details").find(".productname").should("have.text", titles[i]);
                        cy.go('back');
                        cy.log(`[ ${titles[i]} ] verified`);
                        return false;
                    }
                })

            }
        })
    });
});