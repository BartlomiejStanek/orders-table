describe('Order table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('should display order table', () => {
    cy.get('app-orders-table').should('exist');
  });
  it('should display expanded order group after click', () => {
    cy.get('app-orders-table tbody tr').first().click();
    cy.get('[data-cy=orders-row]').should('have.length', 3);
  });
  it('should close order after click close icon', () => {
    cy.get('app-orders-table tbody tr').first().click();
    cy.get('[data-cy=orders-row] td div').first().find('div').should('have.length', 3);
    cy.get('[data-cy=orders-count]').first().should('contain', '3');
    cy.get('[data-cy=close-order]').first().click();
    cy.get('[data-cy=orders-row] td div').first().find('div').should('have.length', 2);
    cy.get('[data-cy=orders-count]').first().should('contain', '2');
  });
  it('should close order group after click close icon', () => {
    cy.get('app-orders-table tbody tr').first().click();
    cy.get('[data-cy=orders-row] td div').first().find('div').should('have.length', 3);
    cy.get('[data-cy=close-group]').first().click();
    cy.get('[data-cy=orders-row]').should('have.length', 2);
  });
});
