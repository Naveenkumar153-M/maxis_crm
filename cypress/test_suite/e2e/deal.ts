/// <reference types="cypress" />

import * as pageObj from '../../page_objects/crm.po.json';
import { createDeal, deleteDeal, editDeal, getLoginData, searchDeal, validateCreatedDealDetail, validateCreatedDealInBoard, validateCreatedDealInList, validateDealDetailPageElements, validateDealListFooterButtons, validateDeletedDeal, validateEditedDealInBoardPage, validateEditedDealInDetailPage, validateEditedDealInListPage } from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('Deal Creation', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	// Deal Creation
	it('Create Deal', () => {
		cy.wait(2000);
		cy.get(pageObj.sidenav_button.deal).click();
		cy.get(pageObj.deal_list_kanban_page.add_deal_btn).click();
		// Text Label and Button Validation in Add Deal Drawer
		cy.get('.justify-content-between > .d-flex > .heading').should('have.text', 'Add Deal');
		cy.get('.inner-content-section > :nth-child(1) > :nth-child(1)').should('contain', 'Deal Name');
		cy.get('.drawer-content > div > div > div:nth-child(2) > div').should('be.visible');
		cy.get('.MuiFormControl-root.form-control-section.mb-3 > label').should('contain', 'Amount');
		cy.get('.form-control-section.mb-3 > div').should('contain', '$').should('be.visible');
		cy.get('.drawer-content > div > div > label:nth-child(4)').should('contain', 'Closing Date');
		cy.get('.MuiGrid-justify-xs-space-around > div > div').should('be.visible');
		cy.get('.drawer-content > div > div > div:nth-child(6) > label').should('contain', 'Pipeline');
		cy.get('.drawer-content > div > div > div:nth-child(6) > div').should('be.visible');
		cy.get('.drawer-content > div > div > div:nth-child(7) > label').should('contain', 'Deal Stages');
		cy.get('.drawer-content > div > div > div:nth-child(7) > div').should('be.visible');
		cy.get(pageObj.add_deal_fields.cancel_btn).should('be.visible');
		cy.get(pageObj.add_deal_fields.add_and_create_new_deal_btb).should('be.visible');
		cy.get(pageObj.add_deal_fields.create_deal_btn).should('be.visible');
		// Deal Creation
		createDeal();
		cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
		cy.wait(1000);
		// Validate Created Deal Details
		validateCreatedDealDetail();
		// Validate the Deal Details in the Board View Page by Searching
		validateCreatedDealInBoard();
		// Validate the Deal Details in the List View Page by Searching
		validateCreatedDealInList();
	});

	// Edit Deal
	it('Edit Deal', () => {
		cy.get(pageObj.sidenav_button.deal).click();
		cy.wait(6000);
		cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
		searchDeal();
		cy.get(pageObj.deal_list_kanban_page.deal_name).click();
		// Deal Edit
		cy.get(pageObj.deal_detail_page.deal_details_three_dot_menu).click();
		cy.get(pageObj.deal_detail_page.deal_detail_edit_btn).eq(0).click({ multiple: true, force: true });
		cy.wait(5000);
		editDeal();
		cy.get(pageObj.add_deal_fields.create_deal_btn).click({ force: true });
		cy.wait(1000)
		// Validate the Edited Deal in Detail Page
		validateEditedDealInDetailPage();
		// Validate the Edited Deal in List Page
		validateEditedDealInListPage();
		// Validate the Edited Deal in Board Page
		validateEditedDealInBoardPage();
	});

	// Delete Deal
	it('Delete Deal', () => {
		cy.get(pageObj.sidenav_button.deal).click();
		cy.wait(6000);
		cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
		searchDeal();
		cy.get(pageObj.deal_list_kanban_page.deal_select_check_box).click();
		// Validate the Footer Buttons in deal List Page
		validateDealListFooterButtons();
		// Deleting the Deal
		deleteDeal();
		//Validating the Deleted Deal
		validateDeletedDeal();
	})
});
