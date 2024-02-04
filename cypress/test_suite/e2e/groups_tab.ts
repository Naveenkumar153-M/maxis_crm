/// <reference types="cypress" />

import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('Group scenarios', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	// Group Creation Test
	it('Create Group', () => {
		common.navigateGroupTab();
		// Group creation
		common.createGroup();
		// Validate the created Group in the list by searching
		common.searchGroup();
		common.validateGroupInList();
	});

	// Group Edit Test
	it('Edit a Group', () => {
		common.navigateGroupTab();
		common.typesFilter();
		common.searchGroup();
		//Group edit
		common.editGroup();
		// Validate the edited Group in the list by searching
		common.searchGroup();
		common.validateGroupInList();
	});

	// validating view field option
	it('View field in group', () => {
		common.navigateGroupTab();
		common.typesFilter();
		// viewing the field
		common.viewField();
		// Validating the view field
		common.validateViewField();
	})

	// Group Delete Test
	it('Delete a Group', () => {
		common.navigateGroupTab();
		common.typesFilter();
		common.searchGroup();
		// Validating the searched Group
		common.validateGroupInList();
		// Deleting the Group
		common.deleteGroup();
		// Validate after deleting the Group
		common.validateGroupDelete();
	})
});
