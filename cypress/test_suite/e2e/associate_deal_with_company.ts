/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';

describe('Associate Existing Deal With Company', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	it('Associate existing deal with company', () => {
		// Navigate to deal page and create deal
		cy.get(pageObj.sidenav_button.deal).click();
		cy.wait(5000);
		cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
		common.createDeal();
		cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
		cy.wait(1000);
		// Validate created deal
		common.validateCreatedDealDetail();
		//Navigate to company page and create company
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(2000);
		cy.get(pageObj.company_list_page.add_company_btn).click();
		common.createCompany();
		cy.get(pageObj.company_detail_page.create_btn).click();
		// Validate created company
		common.validateCreatedCompanyDetails();
		// Associate existence deal with company
		common.searchCompany();
		cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click();
		cy.wait(2000);
		common.associateExistingDealWithCompany();
	});

	it('Verify the associated deal', () => {
		// Navigate to Company page
		cy.wait(5000);
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(2000);
		common.searchCompany();
		cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click();
		cy.wait(2000);
		// View associated deal and verify in deal page
		common.viewAssociatedDeal();
	});

	it('Removing the associated deal', () => {
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(2000);
		common.searchCompany();
		cy.get(pageObj.company_list_page.company_name).should('have.text', common.companyName).click();
		cy.wait(2000);
		common.removeAssociatedDeal();
		// Delete Created Company
		cy.get(pageObj.dashboard_page.crm_logo_side_nav).click();
		cy.wait(3000);
		cy.get(pageObj.sidenav_button.company).click();
		cy.wait(1000);
		common.searchCompany();
		cy.get(pageObj.contact_list_page.contact_select_check_box).click({ force: true} );
		cy.wait(1000);
		common.deleteCompany();
		// Delete Created Deal
		cy.get(pageObj.dashboard_page.crm_logo_side_nav).click();
		cy.wait(3000);
		cy.get(pageObj.sidenav_button.deal).click();
		cy.wait(1000);
		cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
		common.searchDeal();
		cy.get(pageObj.deal_list_kanban_page.deal_select_check_box).click();
		common.deleteDeal();
	})
});
