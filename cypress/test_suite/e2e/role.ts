/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('Role scenarios', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(5000);
	});

	// Role Creation
	it('Create Role', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.role_nav_btn).click();
		// creating the Role
		common.createRole();
		// validate created role in the list
		cy.get(pageObj.role_tab.table_role_name).should('contain', common.roleName);
	});

	// Role Editing
	it('Edit Role', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.role_nav_btn).click();
		// editing the role
		common.editRole();
		// validate Edited role in the list
		cy.get(pageObj.role_tab.table_role_name).should('contain', common.roleName);
	});

    // Role Delete
	it('Delete Role', () => {
		cy.get(pageObj.settings.settings_btn).click();
		cy.get(pageObj.settings_user_management.role_nav_btn).click();
		// deleting the role
		common.deleteRole();
	});
});
