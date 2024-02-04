const {
	defineConfig
} = require('cypress')

module.exports = defineConfig({
	e2e: {
		"chromeWebSecurity": false,
		"trashAssetsBeforeRuns": true,
		"watchForFileChanges": false,
		"supportFile": false,
		"specPattern": "cypress/test_suite/**/*",
		"viewportWidth": 1536,
		"viewportHeight": 864,
		"pageLoadTimeout": 60000,
		"video": false,
		"reporter": "mochawesome",
		"screenshotsFolder": "cypress/report/mochawesome-report/assets",
		"reporterOptions": {
			"reportDir": "cypress/report/mochawesome-report",
			"overwrite": true,
			"html": true,
			"json": true,
			"timestamp": "mmddyyyy_HHMMss"
		},
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js')(on, config)
		},
	}
})
