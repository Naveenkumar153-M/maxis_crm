/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedFirstName: JQuery<HTMLTableRowElement> | string;

/**
 * function to perform more filter actions
 * @return {void}
 */
function navigateToMoreFilter() {
	cy.wait(9000);
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
function firstnameFilterActions(value: JQuery<HTMLTableRowElement>) {
    selectedFirstName = value;
    cy.get('.MuiInputBase-input').type(((selectedFirstName).toString()).trim());
    cy.wait(5000);
    cy.get(pageObj.contact_list_page.more_filter_btn).click();
    cy.get(pageObj.contact_list_page.field_to_filter).click();
    cy.get(pageObj.contact_list_page.search_field_input).type('First name');
    cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value(doesn't contain)
* @return {void}
 */
function firstnameNotContainFilterActions(value: JQuery<HTMLTableRowElement>) {
    selectedFirstName = value;
    cy.get(pageObj.contact_list_page.more_filter_btn).click();
    cy.get(pageObj.contact_list_page.field_to_filter).click();
    cy.get(pageObj.contact_list_page.search_field_input).type('First name');
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

    it('Validate Contact List First name Filter - Type as Doesn\'t contain', () => {
        common.getFirstNameFromContactList();
        common.getFirstNameFromContactList().then((value) => {
            if (common.tableIndex > 0) {
                firstnameNotContainFilterActions(value);
                cy.get(pageObj.contact_list_page.filter_email_does_not_contain_radio_btn).click();
                cy.get(pageObj.contact_list_page.filter_email_does_not_contain_input).type(((selectedFirstName).toString()).trim().split(' ')[0]);
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
                cy.wait(500);
                // validate First name list
                common.validateFirstNameContactListFilter('not contain');
            } else {
                cy.get('.dashboard-table-nodata > .heading').should('be.visible');
            }
        });
    });
});


