/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';
import * as common from '../../../common';
export let selectedCompanyName: JQuery<HTMLTableRowElement> | string;

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
function companynameFilterActions(value: JQuery<HTMLTableRowElement>) {
    selectedCompanyName = value;
    cy.get('.MuiInputBase-input').type(((selectedCompanyName).toString()).trim());
    cy.wait(5000);
    cy.get(pageObj.contact_list_page.more_filter_btn).click();
    cy.get(pageObj.contact_list_page.field_to_filter).click();
    cy.get(pageObj.contact_list_page.search_field_input).type('Company Name');
    cy.get('#menu- > div> ul > div.inside-scroll.add-field-scroll.overflow-auto > li > div').click();
}

/**
*
* @param {JQuery<HTMLTableRowElement>} value - passes the required value(doesn't contain)
* @return {void}
 */
function companynameNotContainFilterActions(value: JQuery<HTMLTableRowElement>) {
    selectedCompanyName = value;
    cy.get(pageObj.contact_list_page.more_filter_btn).click();
    cy.get(pageObj.contact_list_page.field_to_filter).click();
    cy.get(pageObj.contact_list_page.search_field_input).type('Company Name');
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

    it('Validate Contact List Company name Filter - Type as Contains', () => {
        common.getCompanyNameFromContactList();
        // search random company name in the contact list page and perform validation
        common.getCompanyNameFromContactList().then((value) => {
            if (common.tableIndex > 0) {
                companynameFilterActions(value);
                cy.wait(5000);
                cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedCompanyName).toString()).trim());
                //cy.get(pageObj.contact_list_page.filter_email_contains_input).type(((selectedCompanyName).toString()).trim().split(' ')[0]);
                cy.wait(5000);
                cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
                cy.wait(5000);
                cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
                cy.wait(5000);
                common.validateCompanyNameContactListFilter('contains');
            } else {
                cy.get('.dashboard-table-nodata > .heading').should('be.visible');
            }
        });
    });

    it('Validate Contact List Company name Filter - Type as Empty', () => {
        common.getCompanyNameFromContactList();
        common.getCompanyNameFromContactList().then((value) => {
            companynameFilterActions(value);
            cy.get(pageObj.contact_list_page.filter_email_empty_radio_btn).click();
            cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
            cy.wait(500);
            cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
            cy.wait(500);
            common.validateCompanyNameContactListFilter('empty');
        });
    });

    it('Validate Contact List Company name Filter - Type as Has Value', () => {
        common.getCompanyNameFromContactList();
        common.getCompanyNameFromContactList().then((value) => {
            if (common.tableIndex > 0) {
                companynameFilterActions(value);
                cy.get(pageObj.contact_list_page.filter_email_has_value_radio_btn).click();
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
                cy.wait(2000);
                // validate company name list
                common.validateCompanyNameContactListFilter('has value');
            } else {
                cy.get('.dashboard-table-nodata > .heading').should('be.visible');
            }
        });
    });

    it('Validate Contact List Company name Filter - Type as Doesn\'t contain', () => {
        common.getCompanyNameFromContactList();
        common.getCompanyNameFromContactList().then((value) => {
            if (common.tableIndex > 0) {
                companynameNotContainFilterActions(value);
                cy.get(pageObj.contact_list_page.filter_email_does_not_contain_radio_btn).click();
                cy.get(pageObj.contact_list_page.filter_email_does_not_contain_input).type(((selectedCompanyName).toString()).trim());
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_add_filter_btn).click();
                cy.wait(500);
                cy.get(pageObj.contact_list_page.more_filter_apply_filter_btn).click();
                cy.wait(500);
                // validate Company name list
                common.validateCompanyNameContactListFilter('not contain');
            } else {
                cy.get('.dashboard-table-nodata > .heading').should('be.visible');
            }
        });
    });
});

