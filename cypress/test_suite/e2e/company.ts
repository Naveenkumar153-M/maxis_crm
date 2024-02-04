/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import { fullName, createCompany, validateCreatedCompanyDetails, searchCompany, validateCompanyInList, validateCompanyDetailPageElements, editCompany, validateEditedCompanyDetailPage, validateEditedCompanyListPage, deleteCompany, validateDeletedCompany, validateCompanyFooterElements } from '../../../common';

describe('Company Validations', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	// Create Company
	it('Create Company', () => {
		cy.wait(5000);
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(3000);
		cy.get(pageObj.company_detail_page.add_company_btn).click();
		// Text label validation
		cy.get('.justify-content-between > .d-flex > .heading').should('have.text', 'Add Company');
		cy.get('.inner-content-section > :nth-child(1) > :nth-child(1)').should('contain', 'Company Name');
		cy.get(pageObj.company_detail_page.company_name_input).should('be.visible');
		cy.get('.MuiFormControl-root.form-control-section > .form-label').should('have.text', 'Phone Number');
		cy.get(pageObj.company_detail_page.company_phone_number_input).should('be.visible');
		cy.get('#guest').should('contain', fullName);
		cy.get(pageObj.company_detail_page.cancel_btn).should('be.visible');
		cy.get(pageObj.company_detail_page.create_and_add_new_btn).should('be.visible');
		cy.get(pageObj.company_detail_page.create_btn).should('be.visible');
		// Company creation
		createCompany();
		cy.get(pageObj.company_detail_page.create_btn).click();
		// Validate created company details
		validateCreatedCompanyDetails();
		// Validate the Company details in the list page by searching
		searchCompany();
		validateCompanyInList();
	});

	// Edit Company
	it('Edit Company', () => {
		cy.wait(4000);
		cy.get(pageObj.sidenav_button.company).click({
			multiple: true, force: true
		});
		cy.wait(1000);
		searchCompany();
		cy.get(pageObj.company_list_page.company_name).click();
		//Validate the company detail page elements
		validateCompanyDetailPageElements();
		// Company Edit
		cy.get(pageObj.company_details_page_elements.three_dot_menu).click();
		cy.wait(1000);
		cy.get(pageObj.company_detail_page.three_dot_menu_edit_option).should('have.text', 'Edit Company');
		cy.get(pageObj.company_detail_page.three_dot_menu_edit_option).click();
		editCompany();
		// Validate the edited Company in details page
		validateEditedCompanyDetailPage();
		// Validate the edited Company in list page
		validateEditedCompanyListPage();
	});

	// Delete Company
	it('delete Company', () => {
		cy.wait(4000);
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(1000);
		// Searching the company to delete
		searchCompany();
		// Validate footer elements
		validateCompanyFooterElements();
		// Deleting the company
		deleteCompany();
		//Validating the deleted Company
		validateDeletedCompany();
	});
});
