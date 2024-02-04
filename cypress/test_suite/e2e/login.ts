/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import { validateSettingsPage } from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
describe('Login Test', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});
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
		cy.get(pageObj.contact_list_page.header_contact_text).should('have.text', 'Contacts');
		cy.get(pageObj.contact_list_page.contact_list_table).should.length > 0;
		cy.wait(1000);
		// Navigate to Contact Details page
		cy.get(pageObj.contact_list_page.contact_name).eq(0).click({multiple:true});
		cy.wait(2000);
		cy.get(pageObj.contact_detail_page.contact_details_header_note_text).should('have.text', 'Note');
		cy.wait(2000);
		// Navigate to Company Page
		cy.get(pageObj.sidenav_button.company).click();
		cy.get(pageObj.company_list_page.header_company_text).should('have.text', 'Companies');
		cy.get(pageObj.company_list_page.company_list_table).should.length > 0;
		cy.wait(1000);
		// Navigate to Company Details page
		cy.get(pageObj.company_list_page.company_name).eq(0).click();
		cy.get(pageObj.company_detail_page.company_details_header_note_text).should('have.text', 'Note');
		cy.get(pageObj.company_detail_page.company_details_activity_text).should('have.text', 'Activity');
		cy.wait(1000);
		// Navigate to Deals Page
		cy.get(pageObj.sidenav_button.deal).click();
		cy.get(pageObj.deal_list_kanban_page.header_company_text).should('have.text', 'Deals');
		cy.wait(1000);
		// Navigate to Dashboard Page
		cy.get(pageObj.sidenav_button.dashboard).click();
		cy.get(pageObj.dashboard_page.header_dashboard_text).should('have.text', 'Dashboard');
		cy.wait(1000);
		// Navigate to Reports Page
		cy.get(pageObj.sidenav_button.report).click();
		cy.get(pageObj.reports_page.header_reports_text).should('have.text', 'Reports');
		cy.wait(1000);
		// Validating the settings page
		validateSettingsPage();
	});
});
