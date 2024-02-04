/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
let contactEmail;

describe('Smoke Test', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.wait(2000);
		cy.login();
	});

	describe('Validate Successful Login', () => {
		it('Navigate to all the pages and verify the elements', () => {
			cy.wait(5000);
			// Navigate to Activity Page
			cy.get(pageObj.sidenav_button.activity).click();
			cy.get(pageObj.activity_list_page.header_activity_text).should('have.text', 'Activities');
			cy.get(pageObj.activity_list_page.activity_list_table).should.length > 0;
			cy.wait(1000);
			// Navigate to Contact Page
			cy.get(pageObj.sidenav_button.contact).click({
				multiple: true,
				force: true
			});
			cy.wait(3000);
			cy.get(pageObj.contact_list_page.header_contact_text).should('have.text', 'Contacts');
			cy.get(pageObj.contact_list_page.contact_list_table).should.length > 0;
			// Navigate to Contact Details page
			cy.get(pageObj.contact_list_page.contact_name).eq(0).click();
			cy.wait(3000);
			cy.get(pageObj.contact_detail_page.contact_details_header_note_text).should('have.text', 'Note');
			cy.get(pageObj.contact_detail_panel.email).should.length > 0;
			// Navigate to Company Page
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(3000);
			cy.get(pageObj.company_list_page.header_company_text).should('have.text', 'Companies');
			cy.get(pageObj.company_list_page.company_list_table).should.length > 0;
			// Navigate to Company Details page
			cy.get(pageObj.company_list_page.company_name).eq(0).click();
			cy.wait(3000);
			cy.get(pageObj.company_detail_page.company_details_header_note_text).should('have.text', 'Note');
			cy.get(pageObj.company_detail_page.company_details_activity_text).should('have.text', 'Activity');
			// Navigate to Deals Page
			cy.get(pageObj.sidenav_button.deal).click();
			cy.wait(3000);
			cy.get(pageObj.deal_list_kanban_page.header_company_text).should('have.text', 'Deals');
			// Navigate to Dashboard Page
			cy.get(pageObj.sidenav_button.dashboard).click();
			cy.wait(3000);
			cy.get(pageObj.dashboard_page.header_dashboard_text).should('have.text', 'Dashboard');
			// Navigate to Reports Page
			cy.get(pageObj.sidenav_button.report).click();
			cy.wait(3000);
			cy.get(pageObj.reports_page.header_reports_text).should('have.text', 'Reports');
			// Validating the settings page
			common.validateSettingsPage();
		});
	})

	describe('Create, Edit and Delete Contact', () => {
		it('create contact', () => {
			cy.get(pageObj.sidenav_button.contact).click({
				multiple: true, force: true
			});
			cy.wait(5000);
			cy.get(pageObj.contact_list_page.add_Contact_btn).click();
			cy.wait(7000);
			// contact creation
			cy.get(pageObj.add_contact_fields.cancel_btn).should('be.visible');
			cy.get(pageObj.add_contact_fields.add_and_create_new_contact_btn).should('be.visible');
			cy.get(pageObj.add_contact_fields.create_contact_btn).should('be.visible');
			common.createContact();
			contactEmail = common.email;
			cy.get(pageObj.add_contact_fields.create_contact_btn).click();
			cy.wait(5000);
			// Validate created contact details
			cy.get(pageObj.contact_detail_page.contact_name).contains(common.firstName);
			cy.get(pageObj.contact_detail_page.company_name_sub_title).contains(common.company);
			cy.get(pageObj.contact_detail_panel.first_name).contains(common.firstName);
			cy.get(pageObj.contact_detail_panel.email).contains(common.email);
			cy.get(pageObj.company_detail_page.back_button).click();
			cy.wait(2000);
			// Validate the contact details in the list page by searching
			cy.get(pageObj.contact_list_page.contact_search).type(contactEmail);
			cy.get(pageObj.contact_list_page.contact_search).type('{enter}');
			cy.wait(3000);
			cy.get(pageObj.contact_list_page.contact_list).should('contain', common.firstName);
			cy.get(pageObj.contact_list_page.contact_list).should('contain', common.email);
		});

		it('Edit a contact', () => {
			cy.get(pageObj.sidenav_button.contact).click({
				multiple: true, force: true
			});
			cy.wait(3000);
			cy.get(pageObj.contact_list_page.contact_search).type(contactEmail);
			cy.get(pageObj.contact_list_page.contact_search).type('{enter}');
			cy.wait(5000);
			cy.get(pageObj.contact_list_page.contact_name).click();
			cy.wait(3000);
			//Validate the contact detail page elements
			common.validateContactDetailPageElements();
			// Contact Edit
			cy.get(pageObj.contact_details_page_elements.three_dot_menu).click();
			cy.wait(1000);
			cy.get(pageObj.contact_detail_page.three_dot_menu_edit_contact_option).should('have.text', 'Edit Contact');
			cy.get(pageObj.contact_detail_page.three_dot_menu_edit_contact_option).click();
			common.editContact();
			cy.wait(3000);
			cy.get(pageObj.contact_detail_page.contact_name).should('contain', common.firstName);
			cy.get(pageObj.contact_detail_page.company_name_sub_title).should('contain', common.company);
			cy.get(pageObj.contact_detail_page.back_button).click();
			cy.wait(3000);
			// Validate the Edited contact in list page
			cy.get(pageObj.contact_list_page.contact_search).clear().type(contactEmail);
			cy.get(pageObj.contact_list_page.contact_search).type('{enter}');
			cy.wait(2000);
			cy.get(pageObj.contact_list_page.contact_name).should('contain', common.firstName);
			cy.get(pageObj.contact_list_page.contact_list).should('contain', common.phoneNumber);
		});
		it('Delete a contact', () => {
			cy.get(pageObj.sidenav_button.contact).click({
				multiple: true, force: true
			});
			cy.wait(5000);
			cy.get(pageObj.contact_list_page.contact_search).type(contactEmail);
			cy.get(pageObj.contact_list_page.contact_search).type('{enter}');
			cy.wait(3000)
			cy.get(pageObj.contact_list_page.contact_select_check_box).click();
			cy.wait(3000)
			// Validate footer elements
			cy.wait(3000);
			cy.get(pageObj.contact_list_page_footer.assign_to_btn).should('be.visible');
			cy.get(pageObj.contact_list_page_footer.create_task_btn).should('be.visible');
			cy.get(pageObj.contact_list_page_footer.export_btn).should('be.visible');
			cy.get(pageObj.contact_list_page.delete_btn).should('be.visible');
			cy.get(pageObj.contact_list_page_footer.edit_btn).should('be.visible');
			cy.get(pageObj.contact_list_page_footer.cancel_btn).should('be.visible');
			// Deleting the contact
			cy.get(pageObj.contact_list_page.delete_btn).click();
			cy.wait(4000);
			cy.get(pageObj.contact_delete_popup.contact_list_delete_btn).click();
			cy.wait(3000);
			//Validating the deleted contact
			cy.get(pageObj.contact_list_page.contact_search).click().clear().type(contactEmail);
			cy.get(pageObj.contact_list_page.contact_search).type('{enter}');
			cy.wait(3000);
			cy.get(pageObj.contact_list_page.contact_empty_page_text).should('contain', 'No Contact Found');
		});
	});

	describe('Create, Edit and Delete Company', () => {
		it('Create Company', () => {
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(3000);
			cy.get(pageObj.company_detail_page.add_company_btn).click();
			cy.wait(3000);
			cy.get(pageObj.company_detail_page.cancel_btn).should('be.visible');
			cy.get(pageObj.company_detail_page.create_and_add_new_btn).should('be.visible');
			cy.get(pageObj.company_detail_page.create_btn).should('be.visible');
			// Company creation
			common.createCompany();
			cy.get(pageObj.company_detail_page.create_btn).click();
			cy.wait(3000);
			// Validate created company details
			common.validateCreatedCompanyDetails();
			// Validate the Company details in the list page by searching
			common.searchCompany();
			common.validateCompanyInList();
		});

		it('Edit a Company', () => {
			cy.get(pageObj.sidenav_button.company).click({
				multiple: true, force: true
			});
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).click();
			//Validate the company detail page elements
			common.validateCompanyDetailPageElements();
			// Company Edit
			cy.get(pageObj.company_details_page_elements.three_dot_menu).click();
			cy.wait(1000);
			cy.get(pageObj.company_detail_page.three_dot_menu_edit_option).should('have.text', 'Edit Company');
			cy.get(pageObj.company_detail_page.three_dot_menu_edit_option).click();
			common.editCompany();
			// Validate the edited Company in details page
			common.validateEditedCompanyDetailPage();
			// Validate the edited Company in list page
			common.validateEditedCompanyListPage();
		});

		it('Delete a Company', () => {
			cy.wait(5000);
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(5000);
			// Searching the company to delete
			common.searchCompany();
			// Validate footer elements
			common.validateCompanyFooterElements();
			// Deleteing the company
			common.deleteCompany();
			//Validating the deleted Company
			common.validateDeletedCompany();
		});
	});

	describe('Deal Validations', () => {
		it('Create, Edit and Delete Deal', () => {
			cy.wait(4000);
			// Create deal
			cy.get(pageObj.sidenav_button.deal).click();
			cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
			common.createDeal();
			cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
			// Edit Deal
			cy.wait(4000);
			cy.get(pageObj.sidenav_button.deal).click();
			cy.wait(2000);
			cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
			common.searchDeal();
			cy.get(pageObj.deal_list_kanban_page.deal_name).click();
			// Deal Edit
			cy.get(pageObj.deal_detail_page.deal_details_three_dot_menu).click();
			cy.get(pageObj.deal_detail_page.deal_detail_edit_btn).eq(0).click({ multiple: true, force: true });
			cy.wait(5000);
			common.editDeal();
			cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
			cy.wait(5000);
			// Deal Deletion
			cy.get(pageObj.sidenav_button.deal).click();
			cy.wait(6000);
			cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
			common.searchDeal();
			cy.get(pageObj.deal_list_kanban_page.deal_select_check_box).click();
			// Deleting the Deal
			common.deleteDeal();
		});
	});

	describe('Associate Contact with Company', () => {
		// Navigate to contact page and create contact
		it('Associate Contact', () => {
			cy.wait(4000);
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.contact_list_page.add_Contact_btn).click();
			// Contact creation
			common.createContact();
			cy.get(pageObj.add_contact_fields.create_contact_btn).click();
			cy.wait(8000);
			//Navigate to company page and create company
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(8000);
			cy.get(pageObj.company_list_page.add_company_btn).click();
			common.createCompany();
			cy.get(pageObj.company_detail_page.create_btn).click();
			cy.wait(8000);
			// Associate existing contact with company
			cy.get(pageObj.company_detail_page.back_button).click();
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click({ force: true });
			cy.wait(2000);
			common.associateExistingContactWithCompany();
			// Verify the associate contact in the Company details page
			common.verifyAssociateContactWithCompany();
			//Removing the associate contact in the Company details page
			cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click();
			cy.wait(2000);
			common.removeAssociatedContact();
		});
	});

	describe('Associate Company with Contact', () => {
		it('Associate Company', () => {
			// Navigate to company page and create company
			cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.company_list_page.add_company_btn).click();
			common.createCompany();
			cy.get(pageObj.company_detail_page.create_btn).click();
			cy.wait(5000);
			// Navigate to contact page and create contact
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.contact_list_page.add_Contact_btn).click();
			// Contact creation without company
			common.createContactWithoutCompany();
			cy.get(pageObj.add_contact_fields.create_contact_btn).click();
			cy.wait(8000);
			// Associate existing company with contact
			cy.get(pageObj.company_detail_page.back_button).click();
			cy.wait(2000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click();
			cy.wait(2000);
			common.associateExistingCompanyWithContact();
			// Verify the associate company in the Contact details page
			common.verifyAssociateCompanyWithContact();
			//Removing the associate company in the Contact details page
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click();
			cy.wait(2000);
			common.removeAssociatedCompany();
		});
	});

	describe('Associate Deal with Company', () => {
		// Navigate to deal page and create deal
		it('Associate Deal', () => {
			cy.get(pageObj.sidenav_button.deal).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
			// Deal creation
			common.createDeal();
			cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
			cy.wait(5000);
			//Navigate to company page and create company
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(8000);
			cy.get(pageObj.company_list_page.add_company_btn).click();
			common.createCompany();
			cy.get(pageObj.company_detail_page.create_btn).click();
			cy.wait(8000);
			// Associate existing deal with company
			cy.get(pageObj.company_detail_page.back_button).click();
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click({ force: true });
			cy.wait(2000);
			common.associateExistingDealWithCompany();
			// Verify the associate deal in the Company details page
			common.viewAssociatedDeal();
			//Removing the associate deal in the Company details page
			cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click();
			cy.wait(2000);
			common.removeAssociatedDeal();
		});
	});

	describe('Associate Deal with Contact', () => {
		// Navigate to deal page and create deal
		it('Associate Deal', () => {
			cy.get(pageObj.sidenav_button.deal).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
			// Deal creation
			common.createDeal();
			cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
			cy.wait(5000);
			//Navigate to contact page and create contact
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.contact_list_page.add_Contact_btn).click();
			// Contact creation without company
			common.createContactWithoutCompany();
			cy.get(pageObj.add_contact_fields.create_contact_btn).click();
			cy.wait(8000);
			// Associate existing deal with contact
			cy.get(pageObj.contact_detail_page.back_button).click();
			cy.wait(2000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click({ force: true });
			cy.wait(2000);
			common.associateExistingDealWithContact();
			// Verify the associate deal in the Contact details page
			common.viewAssociateDealWithContact();
			//Remove the associate deal in the Contact details page
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click();
			cy.wait(2000);
			common.removeAssociateDealWithContact();
		});
	});

	describe('Associate Deal with Contact and Company', () => {
		// Navigate to deal page and create deal
		it('Associate Deal', () => {
			cy.get(pageObj.sidenav_button.deal).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
			// Deal creation
			common.createDeal();
			cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
			cy.wait(5000);
			// Associate existing deal with contact
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(8000);
			cy.get(pageObj.contact_list_page.add_Contact_btn).click();
			// Contact creation without company
			common.createContactWithoutCompany();
			cy.get(pageObj.add_contact_fields.create_contact_btn).click();
			cy.wait(8000);
			common.associateExistingDealWithContact();
			// Associate existing deal with company
			cy.wait(5000);
			cy.get(pageObj.sidenav_button.company).click();
			cy.wait(8000);
			cy.get(pageObj.company_list_page.add_company_btn).click();
			common.createCompany();
			cy.get(pageObj.company_detail_page.create_btn).click();
			cy.wait(8000);
			common.associateExistingDealWithCompany();
			// Verify the associate deal in the Contact/Deal details page
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(8000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click({ force: true });
			cy.wait(2000);
			common.viewAssociateDealWithContact();
			// Verify the associate deal in the Company/Deal details page
			cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).click();
			common.viewAssociatedDeal();
			// Remove the associate deal in the Contact details page
			cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchContact();
			cy.get(pageObj.contact_list_page.contact_name).click();
			cy.wait(2000);
			common.removeAssociateDealWithContact();
			// Remove the associate deal in the Contact details page
			cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
			cy.wait(2000);
			common.searchCompany();
			cy.get(pageObj.company_list_page.company_name).click();
			cy.wait(2000);
			common.removeAssociatedDeal();
		});
	});
});
