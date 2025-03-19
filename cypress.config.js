const { defineConfig } = require("cypress");

module.exports = defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // Supprimez ou commentez la ligne problématique si vous n'avez pas besoin de plugins spécifiques
      // return require('./cypress/plugins/index.ts').default(on, config)
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
});
