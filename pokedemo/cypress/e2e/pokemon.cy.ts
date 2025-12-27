describe('Pokemon App E2E Tests', () => {
  beforeEach(() => {
    // Visiter l'application avant chaque test
    cy.visit('/');
  });

  it('should display the application title', () => {
    cy.contains('pokedemo').should('be.visible');
  });

  it('should load pokemon list', () => {
    // Attendre que le select soit présent
    cy.get('select').should('exist');
    
    // Vérifier qu'il y a des options (les pokemon chargés)
    cy.get('select option').should('have.length.greaterThan', 1);
  });

  it('should select a pokemon and display its details', () => {
    // Sélectionner un pokemon par son ID (par exemple, Bulbasaur = 1)
    cy.get('select').select('1');
    
    // Vérifier que les détails du pokemon s'affichent
    cy.contains('bulbasaur', { matchCase: false }).should('be.visible');
  });

  it('should filter pokemon list', () => {
    // Taper dans le champ de filtrage (celui avec placeholder "Filter by name")
    cy.get('input[placeholder="Filter by name"]').type('pika');
    
    // Vérifier que la liste est filtrée
    cy.get('select option').should('have.length.lessThan', 20);
  });

  it('should navigate and interact with pokemon details', () => {
    // Sélectionner Pikachu (ID 25)
    cy.get('select').select('25');
    
    // Vérifier que le nom s'affiche
    cy.contains('pikachu', { matchCase: false }).should('be.visible');
    
    // Vérifier que l'image s'affiche
    cy.get('img').should('have.attr', 'src').and('include', 'pokemon');
  });
});
