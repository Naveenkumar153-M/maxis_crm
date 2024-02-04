const yargs = require('yargs')
const cypress = require('cypress')
const fs = require('fs-extra');
let webBaseUrl = null;

// Web Base Url
const qaUrl = 'https://testin-accounts.cloudmaxis.com/accounts/login';
const stageUrl = 'https://stagein-accounts.cloudmaxis.com/accounts/login';
const prodUrl = 'https://beta.maxiscrm.com/maxis/accounts/login';

const argv = yargs.options({
		browser: {
			alias: 'b',
			describe: 'choose browser that you wanna run tests on',
			default: 'chrome',
			choices: ['chrome', 'electron', 'firefox', 'chromium']
		},
		spec: {
			alias: 's',
			describe: 'run test with specific spec file',
			default: 'cypress/test_suite/**/*',
		}
	}).help()
	.argv;

console.log(`==========================================================================\n`);
console.log(`Removing the Environment config\n`);
fs.removeSync(__dirname + '/environment.json');
console.log(`==========================================================================\n`);
console.log(`Removing the page object mapping files\n`);
console.log(`==========================================================================\n`);
fs.removeSync(__dirname + '/cypress/cucumber-json');
fs.removeSync(__dirname + '/cypress/report/cucumber_report.html');
fs.removeSync(__dirname + '/cypress/report/assets/');

// Generate Environments
function generateEnvironment() {
	argv.env = argv.env;

	switch (argv.env) {
		case 'dev':
			webBaseUrl = qaUrl;
			break;
		case 'stage':
			webBaseUrl = stageUrl;
			break;
		case 'prod':
			webBaseUrl = prodUrl;
			break;
		default:
			webBaseUrl = qaUrl;
	}

	// Environment Base URL
	let obj = {
		CYPRESS_WEB_BASE_URL: webBaseUrl
	};

	fs.writeFile(__dirname + '/environment.json', JSON.stringify(obj, null, 2), function () {
		console.log('Environment config generated Successfully');
	});
}

// Generate Environments
generateEnvironment();

// report generation
const {
	merge
} = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')
const rm = require('rimraf')
const cypressConfig = require('./cypress.config.js')
const ls = require('ls')

const reportDir = cypressConfig.e2e.reporterOptions.reportDir
const reportFiles = `${reportDir}/*.json`
const reportHtml = `${reportDir}/*.html`

// list all of existing report files
ls(reportFiles, {
	recurse: true
}, file => console.log(`removing ${file.full}`))

// delete all existing json report files before execution
rm(reportFiles, (error) => {
	if (error) {
		console.error(`Error while removing existing json report files: ${error}`)
		process.exit(1)
	}
	console.log('Removing all existing json report files successfully!')
})

// delete all existing Html report files
rm(reportHtml, (error) => {
	if (error) {
		console.error(`Error while removing existing Html report files: ${error}`)
		process.exit(1)
	}
	console.log('Removing all existing Html report files successfully!')
})

// Cypress runner
cypress.run({
	browser: argv.browser,
	spec: argv.spec,
	detached: false,
	defaultCommandTimeout: 3600000
}).then(() => {}).catch((error) => {
	console.error('errors: ', error)
	process.exit(1)
})
