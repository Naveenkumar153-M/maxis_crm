/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedEmail: JQuery<HTMLTableRowElement> | string;
export let getEmailList: never | string;
export let selectedFirstName: JQuery<HTMLTableRowElement> | string;

/**
 * function to perform more filter actions
 * @return {void}
 */
function navigateToMoreFilter() {
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
function emailFilterActions(value: JQuery<HTMLTableRowElement>) {
	selectedEmail = value;
	cy.get('.MuiInputBase-input').type(((selectedEmail).toString()).trim());
	cy.wait(500);
	cy.get('table > tbody > tr > td > #email-id').eq(0).should('have.text', selectedEmail);
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('email');
	cy.get('[data-testid="teamList-1"]').click();
}

describe('Validate Contact List Filter', () => {

	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.wait(2000);
		cy.login();
		cy.wait(2000);
		navigateToMoreFilter();
	});

	it('Validate Contact List Email Filter - Type as Contains', () => {
		common.getEmailFromContactList();
		// search random email in the contact list page and perform validation
		common.getEmailFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				emailFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedEmail).toString()).trim());
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(500);
				common.validateEmailContactListFilter('contains');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Email Filter - Type as Empty', () => {
		common.getEmailFromContactList();
		common.getEmailFromContactList().then((value) => {
			emailFilterActions(value);
			cy.get(pageObj.contact_list_page.filter_email_empty_radio_btn).click();
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
			cy.wait(500);
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(500);
			common.validateEmailContactListFilter('empty');
		});
	});

	it('Validate Contact List Email Filter - Type as Doesn\'t contain', () => {
		common.getEmailFromContactList();
		common.getEmailFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				emailFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_does_not_contain_radio_btn).click();
				cy.get(pageObj.contact_list_page.filter_email_does_not_contain_input).type(((selectedEmail).toString()).trim());
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(500);
				// validate email list
				common.validateEmailContactListFilter('not contain');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Email Filter - Type as Has Value', () => {
		common.getEmailFromContactList();
		common.getEmailFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				emailFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_has_value_radio_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(2000);
				// validate email list
				common.validateEmailContactListFilter('has value');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	/**
	 *
	 * @param {JQuery<HTMLTableRowElement>} value - passes the required value
	 * @return {void}
	 */
	function firstnameFilterActions(value: JQuery<HTMLTableRowElement>) {
		selectedFirstName = value;
		cy.get('.MuiInputBase-input').type(((selectedFirstName).toString()).trim());
		cy.wait(5000);
		cy.get(pageObj.contact_list_page.more_filter_btn).click();
		cy.get(pageObj.contact_list_page.field_to_filter).click();
		cy.get(pageObj.contact_list_page.search_field_input).type('First name');
		cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
	}

	it('Validate Contact List First name Filter - Type as Contains', () => {
		common.getFirstNameFromContactList();
		// search random first name in the contact list page and perform validation
		common.getFirstNameFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				firstnameFilterActions(value);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedFirstName).toString()).trim().split(' ')[0]);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(5000);
				common.validateFirstNameContactListFilter('contains');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List First name Filter - Type as Empty', () => {
		common.getFirstNameFromContactList();
		common.getFirstNameFromContactList().then((value) => {
			firstnameFilterActions(value);
			cy.get(pageObj.contact_list_page.filter_email_empty_radio_btn).click();
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
			cy.wait(500);
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(500);
			common.validateFirstNameContactListFilter('empty');
		});
	});

	it('Validate Contact List First name Filter - Type as Has Value', () => {
		common.getFirstNameFromContactList();
		common.getFirstNameFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				firstnameFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_email_has_value_radio_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(2000);
				// validate first name list
				common.validateFirstNameContactListFilter('has value');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});
});
