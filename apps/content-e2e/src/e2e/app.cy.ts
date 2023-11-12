describe('content-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display navlinks', () => {
    expect(cy.get('a')).contains(/Title of article demo for tests/);
  });
});
