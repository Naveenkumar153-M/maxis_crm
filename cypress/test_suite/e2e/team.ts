/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json'
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('Team scenarios', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(5000);
	});

	// Team Creation
	it('Create Team', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.team_nav_btn).click();
		// creating the team
		common.createTeam();
		// validate created team in the list
		cy.get(pageObj.team_tab.table_team_name).should('contain', common.teamName)
	});

    // Team Editing
	it('Edit Team', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.team_nav_btn).click();
		// editing the team
		common.editTeam();
		// validate Edited team in the list
		cy.get(pageObj.team_tab.table_team_name).should('contain', common.teamName)
	});

	// Team Delete
	it('Delete Team', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.team_nav_btn).click();
		// deleting the team
		common.deleteTeam();
	})
});
