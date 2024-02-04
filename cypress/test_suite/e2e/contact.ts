/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('contact Creation', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	// Contact creation
	it('create contact', () => {
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		});
		cy.wait(6000);
		cy.get(pageObj.contact_list_page.add_Contact_btn).click();
		// Text label and button validation in Add Contact drawer
		cy.get('.justify-content-between > .d-flex > .heading').should('have.text', 'Add Contact');
		cy.get('.inner-content-section > :nth-child(1) > :nth-child(1)').should('contain', 'First Name');
		cy.get('.drawer-content > div > div > div:nth-child(2) > div').should('be.visible');
		cy.get('.inner-content-section > :nth-child(1) > :nth-child(3)').should('contain', 'Last Name');
		cy.get('.drawer-content > div > div > div:nth-child(4) > div').should('be.visible');
		cy.get('.drawer-content > div > div > label:nth-child(5)').should('contain', 'Email');
		cy.get('.drawer-content > div > div > div:nth-child(6) > div').should('be.visible');
		cy.get('.drawer-content > div > div > label:nth-child(7)').should('contain', 'Company');
		cy.get('.drawer-content > div > div > div:nth-child(8) >div').should('be.visible');
		cy.get('.MuiFormControl-root.form-control-section.mb-3 > label').should('contain', 'Phone Number');
		cy.get('.drawer-content > div > div > div.form-control-section.mb-3 > div').should('be.visible');
		cy.get('.drawer-content > div > div > div:nth-child(10) > label').should('contain', 'Contact Stage');
		cy.get('div:nth-child(11) > div > div').should('contain', common.fullName);
		cy.get(pageObj.add_contact_fields.cancel_btn).should('be.visible');
		cy.get(pageObj.add_contact_fields.add_and_create_new_contact_btb).should('be.visible');
		cy.get(pageObj.add_contact_fields.create_contact_btn).should('be.visible');
		//Contact creation
		common.createContact();
		cy.get(pageObj.add_contact_fields.create_contact_btn).click();
		cy.wait(5000);
		// Validate created contact details
		common.validateCreatedContactDetailsPage();
		// Validate the contact details in the list page by searching
		common.validateCreatedContactListPage();
	});

	// Edit contact
	it('Edit a contact', () => {
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		});
		cy.wait(6000);
		common.searchContact();
		cy.get(pageObj.contact_list_page.contact_name).click();
		// Validate the contact detail page elements
		common.validateContactDetailPageElements();
		// Contact Edit
		cy.get(pageObj.contact_details_page_elements.three_dot_menu).click();
		cy.wait(1000);
		cy.get(pageObj.contact_detail_page.three_dot_menu_edit_contact_option).should('have.text', 'Edit Contact');
		cy.get(pageObj.contact_detail_page.three_dot_menu_edit_contact_option).click();
		common.editContact();
		// Validate the edited contact in details page
		common.validateEditedContactDetailPage();
		// Validate the edited contact in list page
		common.validateEditedContactListPage();
	});

	// Delete contact
	it('delete a contact', () => {
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		});
		cy.wait(6000);
		// Searching the contact to delete
		common.searchContact();
		// Validate Contact footer elements
		common.validateContactFooterElements();
		// Deleting the contact
		common.deleteContact();
		// Validating the deleted contact
		common.validateDeletedContact();
	});
});
