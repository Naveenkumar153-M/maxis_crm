/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedContactStage: JQuery<HTMLTableRowElement> | string;

/**
 * function to perform more filter actions
 * @return {void}
 */
function navigateToMoreFilter() {
	cy.get(pageObj.sidenav_button.contact).click();
	cy.wait(2000);
	cy.get('.ml-1 > .MuiButtonBase-root > .MuiButton-label').click();
	cy.wait(2000);
	cy.get('.edit-options > :nth-child(4)').click();
	cy.wait(2000);
	cy.get(pageObj.contact_list_page.more_filter_btn).should('be.visible');
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value
* @return {void}
*/
function contactstageFilterActions(value: JQuery<HTMLTableRowElement>) {
	cy.wait(4000);
	selectedContactStage = value;
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('Contact Stage');
	cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
}

describe('Validate Contact List Filter', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.wait(2000);
		cy.login();
		cy.wait(2000);
		navigateToMoreFilter();
	});

	it('Validate Contact List Contact stage Filter - Type as contain', () => {
		cy.get(pageObj.contact_list_page.more_filter_btn).click();
		cy.get(pageObj.contact_list_page.field_to_filter).click();
		cy.get(pageObj.contact_list_page.search_field_input).type('Contact Stage');
		cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
		cy.get('#demo-simple-select > p').click();
		cy.get('#menu- > div> ul > div:nth-child(1) > div > label > div > span').eq(0).click();
		common.getContactStageFromContactList().then(() => {
			cy.get('body > div> div> div > div > div:nth-child(2) > div:nth-child(1) > div> div > div > div').click({ force: true });
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click({ force: true });
			cy.wait(5000);
			cy.get('body > div> div> div > div > div.mt-3 > div:nth-child(2) > div.d-flex.align-items-center.mt-2.mb-2.justify-content-between.p-3.my-1.more-filter-list > div').should('be.visible');
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(5000);
			const table = cy.get('.table-body').find('tr');
			if (Cypress.$(table).length > 0) {
				common.validateContactStageContactListFilter('contains');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Contact stage Filter - Type as Doesn\'t contain', () => {
		cy.get(pageObj.contact_list_page.more_filter_btn).click();
		cy.get(pageObj.contact_list_page.field_to_filter).click();
		cy.get(pageObj.contact_list_page.search_field_input).type('Contact Stage');
		cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
		cy.wait(3000);
		cy.get(':nth-child(3) > .details').click();
		cy.get('#demo-simple-select > p').click();
		cy.get('#menu- > div> ul > div:nth-child(1) > div > label > div > span').eq(0).click();
		common.getContactStageFromContactList().then(() => {
			cy.get('body > div> div> div > div > div:nth-child(2) > div:nth-child(1) > div> div > div > div').click({ force: true });
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click({ force: true });
			cy.wait(5000);
			cy.get('body > div> div> div > div > div.mt-3 > div:nth-child(2) > div.d-flex.align-items-center.mt-2.mb-2.justify-content-between.p-3.my-1.more-filter-list > div').should('be.visible');
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(5000);
			const table = cy.get('.table-body').find('tr');
			if (Cypress.$(table).length > 0) {
				common.validateContactStageContactListFilter('not contain');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Contact stage Filter - Type as has value', () => {
		cy.get(pageObj.contact_list_page.more_filter_btn).click();
		cy.get(pageObj.contact_list_page.field_to_filter).click();
		cy.get(pageObj.contact_list_page.search_field_input).type('Contact Stage');
		cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
		cy.wait(3000);
		cy.get(pageObj.contact_list_page.filter_email_has_value_radio_btn).click();
		cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click({ force: true });
		cy.wait(5000);
		cy.get('body > div> div> div > div > div.mt-3 > div:nth-child(2) > div.d-flex.align-items-center.mt-2.mb-2.justify-content-between.p-3.my-1.more-filter-list > div').should('be.visible');
		cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
		cy.wait(4000);
		common.validateContactStageContactListFilter('has value');
	});

	it('Validate Contact List Contact stage Filter - Type as empty', () => {
		cy.get(pageObj.contact_list_page.more_filter_btn).click();
		cy.get(pageObj.contact_list_page.field_to_filter).click();
		cy.get(pageObj.contact_list_page.search_field_input).type('Contact Stage');
		cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
		cy.wait(3000);
		cy.get(pageObj.contact_list_page.filter_email_empty_radio_btn).click();
		cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click({ force: true });
		cy.wait(5000);
		cy.get('body > div> div> div > div > div.mt-3 > div:nth-child(2) > div.d-flex.align-items-center.mt-2.mb-2.justify-content-between.p-3.my-1.more-filter-list > div').should('be.visible');
		cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
		cy.wait(3000);
		common.validateContactStageContactListFilter('empty');
	});
});








