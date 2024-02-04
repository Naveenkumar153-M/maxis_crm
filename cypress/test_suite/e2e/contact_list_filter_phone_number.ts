/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedPhoneNumber: JQuery<HTMLTableRowElement> | string;

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
function phonenumberFilterActions(value: JQuery<HTMLTableRowElement>) {
	selectedPhoneNumber = value;
	cy.get('.MuiInputBase-input').type(((selectedPhoneNumber).toString()).trim());
	cy.wait(5000);
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('Phone Number');
	cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value(doesn't contain)
* @return {void}
 */
function phonenumberNotContainFilterActions(value: JQuery<HTMLTableRowElement>) {
	selectedPhoneNumber = value;
	cy.get(pageObj.contact_list_page.more_filter_btn).click();
	cy.get(pageObj.contact_list_page.field_to_filter).click();
	cy.get(pageObj.contact_list_page.search_field_input).type('Phone Number');
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

	it('Validate Contact List Phone number Filter - Type as is', () => {
		common.getPhoneNumberFromContactList();
		//search random phone number in the contact list page and perform validation
		common.getPhoneNumberFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				phonenumberFilterActions(value);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedPhoneNumber).toString()).trim().split(' ')[0]);
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(5000);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(5000);
				common.validatePhoneNumberContactListFilter('is');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
		});
	});

	it('Validate Contact List Phone number Filter - Type as Empty', () => {
		common.getPhoneNumberFromContactList();
		common.getPhoneNumberFromContactList().then((value) => {
			phonenumberFilterActions(value);
			cy.get(pageObj.contact_list_page.filter_phone_number_empty_radio_btn).click();
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
			cy.wait(500);
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(500);
			common.validatePhoneNumberContactListFilter('empty');
		});
	});

	it('Validate Contact List Phone number Filter - Type as Has Value', () => {
		common.getPhoneNumberFromContactList();
		common.getPhoneNumberFromContactList().then((value) => {
			phonenumberFilterActions(value);
			cy.get(pageObj.contact_list_page.filter_phone_number_has_value_radio_btn).click();
			cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
			cy.wait(500);
			cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
			cy.wait(500);
			common.validatePhoneNumberContactListFilter('has value');
		});
	});

	it('Validate Contact List Phone number Filter - Type as Doesn\'t contain', () => {
		common.getPhoneNumberFromContactList();
		common.getPhoneNumberFromContactList().then((value) => {
			if (common.tableIndex > 0) {
				phonenumberNotContainFilterActions(value);
				cy.get(pageObj.contact_list_page.filter_phone_number_does_not_contain_radio_btn).click();
				cy.get(pageObj.contact_list_page.filter_email_does_not_contain_input).type(((selectedPhoneNumber).toString()).trim());
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
				cy.wait(500);
				cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
				cy.wait(8000);
				// validate Phone number list
				common.validatePhoneNumberContactListFilter('not equal to');
			} else {
				cy.get('.dashboard-table-nodata > .heading').should('be.visible');
			}
			// validate No Contact found page
			cy.get('.MuiInputBase-input').type(((selectedPhoneNumber).toString()).trim());
			cy.get('.crm-details-panel > div > div > div > div> div > div > img').should('be.visible');
			cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
			cy.get('p.small-two.font-normal.line-normal.txt-darken1').should('have.text','There’s no contact found for your search.');
		});
	});
});
