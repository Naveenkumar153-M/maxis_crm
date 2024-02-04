/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedLastName: JQuery<HTMLTableRowElement> | string;

/**
 * function to perform more filter actions
 * @return {void}
 */
function navigateToMoreFilter() {
	cy.wait(5000);
	cy.get(pageObj.sidenav_button.contact).click();
	cy.wait(5000);
	cy.get('.ml-1 > .MuiButtonBase-root > .MuiButton-label').click();
	cy.wait(5000);
	cy.get('.edit-options > :nth-child(4)').click();
	cy.wait(5000);
	cy.get(pageObj.contact_list_page.more_filter_btn).should('be.visible');
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value
* @return {void}
*/
function lastnameFilterActions(value: JQuery<HTMLTableRowElement>) {
	selectedLastName = value;
	cy.get('.MuiInputBase-input').type(((selectedLastName).toString()).trim());
	cy.wait(5000);
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('Last name');
	cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value(doesn't contain)
* @return {void}
 */
function lastnameNotContainFilterActions(value: JQuery<HTMLTableRowElement>) {
	selectedLastName = value;
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('Last name');
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

	it('Validate Contact List Last name Filter - Type as Contains', () => {
		common.getLastNameFromContactList();
		// search random last name in the contact list page and perform validation
		common.getLastNameFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				lastnameFilterActions(value);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedLastName).toString()).trim().split(' ')[1]);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(5000);
				common.validateLastNameContactListFilter('contains');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Last name Filter - Type as Empty', () => {
		common.getLastNameFromContactList();
		common.getLastNameFromContactList().then((value) => {
			lastnameFilterActions(value);
			cy.get(pageObj.contact_list_page.filter_email_empty_radio_btn).click();
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
			cy.wait(500);
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(500);
			common.validateLastNameContactListFilter('empty');
		});
	});

	it('Validate Contact List Last name Filter - Type as Has Value', () => {
		common.getLastNameFromContactList();
		common.getLastNameFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				lastnameFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_has_value_radio_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(2000);
				// validate last name list
				common.validateLastNameContactListFilter('has value');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Last name Filter - Type as Doesn\'t contain', () => {
		common.getLastNameFromContactList();
		common.getLastNameFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				lastnameNotContainFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_does_not_contain_radio_btn).click();
				cy.get(pageObj.contact_list_page.filter_email_does_not_contain_input).type(((selectedLastName).toString()).trim().split(' ')[1]);
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(500);
				// validate Last name list
				common.validateLastNameContactListFilter('not contain');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});
});
