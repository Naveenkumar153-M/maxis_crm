/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('field scenarios', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(5000);
	});

	// Field Creation Test
	it('Create field', () => {
		common.navigateFieldTab();
		// Field creation
		common.createField();
		cy.get(pageObj.create_field_drawer.single_line_text).eq(0).click();
		cy.get(pageObj.create_field_drawer.create_field_btn).click()
		// Validate the created field in the list by searching
		common.searchField();
		common.validateFieldInList();
	});
	// Field Edit Test
	it('Edit a Field', () => {
		common.navigateFieldTab();
		common.typesFilter();
		common.searchField();
		//Field edit
		common.editField();
		// Validate the edited field in the list by searching
		common.searchField();
		common.validateFieldInList();
	});
	// Validating move to group option
	it('Move field to another group', () => {
		common.navigateFieldTab();
		common.typesFilter();
		common.searchField();
		// Moving the field to another group
		common.moveField();
		// Validating the moved field
		common.searchField();
		common.validateFieldInList();
		cy.get(pageObj.field_tab.group_name).should('contain', 'Social Media Information')
	})
	// Field Delete Test
	it('Delete a Field', () => {
		common.navigateFieldTab();
		common.typesFilter();
		common.searchField();
		// Validating the searched field
		common.validateFieldInList();
		// Deleting the field
		common.deleteField();
		// Validate after deleting the field
		common.validateFieldDelete();
	})
});

describe('Create all the seven types of fields', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(5000);
	});

	// Field Creation Test
	it('Create seven types of field', () => {
		common.navigateFieldTab();
		// Field creation
		for (let i = 0; i <= 6; i++) {
			common.createField();
			cy.get(pageObj.create_field_drawer.single_line_text).eq(i).click();
			if (i === 4 || i === 5) {
				for (let i = 0; i <= 2; i++) {
					cy.get(pageObj.create_field_drawer.label_box_1).type(common.labelName).type('{enter}');
				}
			}
			cy.get(pageObj.create_field_drawer.create_field_btn).click()
			//Validate the created field in the list by searching
			common.searchField();
			common.validateFieldInList();
			common.deleteField();
		}
	});

	// Validating the Singleline custom Field
	it('Single custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addSinglelineCustomField();
		cy.wait(2000);
		common.assignCustomFieldsToContact();
		// Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateSingleCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	});

	// Validating the Multiline custom Field
	it('Multiline custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addMultilineCustomField();
		cy.wait(2000);
		common.assignCustomFieldsToContact();
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		});
		cy.wait(3000);
		common.validateMultilineCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	});

	//Validating the Number custom Field
	it('Number Custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addNumberCustomField();
		cy.wait(2000);
		common.assignCustomFieldsToContact();
		// Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateNumberCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	})

	//Validating the Currency custom Field
	it('Currency Custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addCurrencyCustomField();
		cy.wait(2000);
		common.assignCustomFieldsToContact();
		// Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateNumberCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	})

	//Validating the Dropdown custom Field
	it('Dropdown custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addDropdownField();
		cy.wait(2000);
		common.assignCustomFieldsToContactDropdown();
		//Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateDropdownCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	})

	//Validating the Multi select custom Field
	it.only('Multi select custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addMultiselectField();
		cy.wait(2000);
		common.assignCustomFieldsToContactDropdown();
		//Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateMultiselectCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	})

	//Validating the Date picker custom Field
	it('Date picker custom field validation in contact add drawer and details page', () => {
		common.navigateFieldTab();
		common.addDatepickerField();
		cy.wait(2000);
		common.assignCustomFieldsToContact();
		// Navigate to Contact
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true,
			force: true
		})
		cy.wait(3000);
		common.validateDatepickerCustomFieldContactlistpage();
		common.validateCustomFieldContactDetailspage();
		// Delete the created custom field
		common.deleteCreatedCustomField();
	});
})





