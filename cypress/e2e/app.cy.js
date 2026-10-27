describe('Navigation', () => {
  const labelToProt = 'Show protected information if';

  const assertAppShell = () => {
    cy.contains('h1', 'React Practical');
    cy.contains('h2', "The topic 'Routes'");
  };

  const expectExactDivText = (text) => {
    cy.contains('div', text).should(($div) => {
      expect($div.text().trim()).to.eq(text);
    });
  };

  const expectTextAbsent = (text) => {
    cy.contains(text).should('not.exist');
  };

  it('Should navigate to the start page', () => {
    cy.visit('/');

    assertAppShell();
    cy.contains(labelToProt);
    cy.contains('div', 'Go to the component programmatically, by checking the box:');
    cy.get('input[type="number"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
  });

  [2, 3, 5].forEach((parameter) => {
    it(`Should render /subtask1/${parameter} with the route parameter`, () => {
      cy.visit(`/subtask1/${parameter}`);

      assertAppShell();
      cy.location('pathname').should('eq', `/subtask1/${parameter}`);
      expectExactDivText(`Subtask1, parameter: ${parameter}`);
    });
  });

  [
    'author=alan&age=20',
    'name=user1',
    'name=usr&role=admin',
  ].forEach((query) => {
    it(`Should render /subtask2 query parameters (${query})`, () => {
      cy.visit(`/subtask2?${query}`);

      assertAppShell();
      cy.location('pathname').should('eq', '/subtask2');
      expectExactDivText(
        `Subtask2, query parameters: ${query.replaceAll('&', ', ')}`,
      );
    });
  });

  describe('Test /subtask3', () => {
    const path = '/subtask3';
    const benchmarkContent = 'Subtask3, protected information';

    it('Should navigate to /subtask3 by clicking if the number is odd', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('3');
      cy.contains(labelToProt).click();

      assertAppShell();
      cy.location('pathname').should('eq', path);
      expectExactDivText(benchmarkContent);
    });

    it('Should not navigate to /subtask3 by clicking if the input is empty', () => {
      cy.visit('/');
      cy.contains(labelToProt).click();

      assertAppShell();
      cy.location('pathname').should('not.eq', path);
      expectTextAbsent(benchmarkContent);
    });

    it('Should not navigate to /subtask3 by clicking if the number is even', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('4');
      cy.contains(labelToProt).click();

      assertAppShell();
      cy.location('pathname').should('not.eq', path);
      expectTextAbsent(benchmarkContent);
    });

    it('Should not show protected information via the address bar if the condition is false', () => {
      cy.visit(path);

      assertAppShell();
      expectTextAbsent(benchmarkContent);
    });

    it('Protected information should disappear as soon as the number becomes even', () => {
      cy.visit('/');
      cy.get('input[type="number"]').type('5');
      cy.contains(labelToProt).click();
      expectExactDivText(benchmarkContent);
      cy.location('pathname').should('eq', path);

      cy.get('input[type="number"]').clear().type('2');
      expectTextAbsent(benchmarkContent);
    });
  });

  describe('Test /subtask4', () => {
    const path = '/subtask4';
    const benchmarkContent = 'Subtask4, navigated programmatically';

    it('Should navigate to /subtask4 through the address bar', () => {
      cy.visit(path);

      assertAppShell();
      cy.location('pathname').should('eq', path);
      expectExactDivText(benchmarkContent);
    });

    it('Should navigate to /subtask4 programmatically when the checkbox is checked', () => {
      cy.visit('/');
      expectTextAbsent(benchmarkContent);

      cy.get('input[type="checkbox"]').check();

      assertAppShell();
      cy.location('pathname').should('eq', path);
      expectExactDivText(benchmarkContent);
    });
  });
});
