// All common logics, configurations, credentials should be present here
/// <reference types="cypress" />
import faker from '@faker-js/faker';
import * as pageObj from "./cypress/page_objects/crm.po.json";
import { selectedEmail } from './cypress/test_suite/e2e/contact_list_filter_email';
import { selectedFirstName } from './cypress/test_suite/e2e/contact_list_filter_first_name';
import { selectedCompanyName } from './cypress/test_suite/e2e/contact_list_filter_company_name';
import { selectedPhoneNumber } from './cypress/test_suite/e2e/contact_list_filter_phone_number';
import { selectedLastName } from './cypress/test_suite/e2e/contact_list_filter_last_name';

/*
 * Global variables for generating data
 */
export let firstName: string;
export let lastName: string;
export let email: string;
export let phoneNumber: string;
export let company: string;
export let emailID: string;
export let password: string;
export let fullName: string;
export let amount: string;
export let amount1: string;
export let amount2: string;
export let getUrl: any;
export let dealName: any;
export let contactEmail: string;
export let contactFullName: string;
export let updatedDealName: string;
export let companyName: string;
export let companyPhoneNumber: string;
export let fieldName: string;
export let updatedField: string;
export let labelName: string;
export let groupName: string;
export let updatedGroup: string;
export let teamName: string;
export let roleName: string;
export let tableIndex: string | number;
export let getEmail: string | any;
export let createdField: string;
export let getFirstName: string | any;
export let getCompanyName: string | any;
export let getPhoneNumber: string | any;
export let getContactStage: string | any;
export let getLastName: string | any;
export let appointmentName: string | any;
export let updatedAppointmentName: string | any;
export let description: string | any;
export let taskName: string | any;
export let updatedTaskName: string | any;

/**
* function to type login data
*/
function typeLoginData() {
	fullName = firstName + ' ' + lastName;
	cy.get(pageObj.login_page.email_input).type(emailID);
	cy.get(pageObj.login_page.password_input).type(password);
	cy.get(pageObj.login_page.login_button).click();
	cy.wait(4000);
	cy.get(pageObj.product_selection.maxis_crm).click();
}

/**
 * function to get the login credentials according to the environment
 */
export function getLoginData() {
	cy.url().then(url => {
		getUrl = url;
		getUrl = (getUrl.split('.cloudmaxis')[0].trim()).split('https://')[1].trim();
		// user credentials for qa env
		if (getUrl === 'testin-accounts') {
			firstName = 'Automation';
			lastName = 'Test';
			emailID = 'automationcrm@mailsac.com';
			password = 'Test@1234';
			typeLoginData();
			// user credentials for production env
		} else if (getUrl === 'beta.maxiscrm.com/maxis/accounts/login') {
			firstName = 'dsi';
			lastName = 'one';
			emailID = 'dsi@mailsac.com';
			password = 'Test@1234';
			typeLoginData();
		} else if (getUrl === 'stagein-accounts') {
			firstName = 'David';
			lastName = 'warner';
			emailID = 'warner@mailsac.com';
			password = 'Test@123';
			typeLoginData();
		}
	})
};

/*
 * generateFakerData
 */
export const generateData = () => {
	firstName = faker.name.firstName();
	lastName = faker.name.lastName();
	dealName = faker.commerce.productName();
	email = faker.internet.email();
	phoneNumber = faker.phone.phoneNumberFormat();
	phoneNumber = phoneNumber.replace(/[^\w\s]/gi, '').substring(0, 10);
	company = faker.company.companyName();
	amount = faker.finance.amount();
	amount = amount.replace(/[^\w\s]/gi, '');
	fieldName = faker.name.title();
	labelName = faker.random.word();
	groupName = faker.commerce.product();
	teamName = faker.name.jobTitle();
	roleName = faker.name.title();
	appointmentName = faker.name.title();
	description = faker.name.jobDescriptor();
	taskName = faker.commerce.productName();
};

/*
 * function to create lead
 */
export const createLead = () => {
	generateData();
	cy.wait(1000);
	cy.get(pageObj.add_lead_fields.first_name).type(firstName);
	cy.get(pageObj.add_lead_fields.email).type(email);
	cy.get(pageObj.add_lead_fields.company_field).click({ force: true }).type(company);
	const companySelect = pageObj.add_lead_fields.create_select_company;
	cy.get(companySelect).then((companySelect) => {
		if (companySelect.find(company)) {
			cy.get(pageObj.add_lead_fields.create_select_company).click();
		}
		else {
			cy.get(pageObj.add_lead_fields.create_select_company).find('create').click();
		};
	})
	cy.get(pageObj.add_lead_fields.phone_number).type(phoneNumber);
};

/*
 * function to edit lead
 */
export const editLead = () => {
	generateData();
	cy.wait(1000);
	cy.get(pageObj.lead_detail_page.lead_detail_edit_btn).click();
	cy.wait(1000);
	cy.get(pageObj.lead_detail_page_edit_fields.first_name).clear().type(firstName);
	cy.get(pageObj.lead_detail_page_edit_fields.phone_number).clear().type(phoneNumber);
	cy.get(pageObj.lead_detail_page_edit_fields.company_field).click({ force: true }).type(company);
	const createCompany = pageObj.lead_detail_page_edit_fields.create_select_company;
	cy.get(createCompany).then((createCompany) => {
		if (createCompany.find(company)) {
			cy.get(pageObj.lead_detail_page_edit_fields.create_select_company).click();
		}
		else {
			cy.get(pageObj.lead_detail_page_edit_fields.create_select_company).find('create').click();
		};
	})
	cy.get(pageObj.lead_detail_page_edit_fields.update_btn).click();
}

/*
 * function to create contact
 */
export const createContact = () => {
	generateData();
	cy.wait(5000);
	cy.get(pageObj.add_contact_fields.first_name).type(firstName);
	cy.get(pageObj.add_contact_fields.last_name).type(lastName);
	cy.get(pageObj.add_contact_fields.email).type(email);
	cy.get(pageObj.add_contact_fields.company_field).click({ force: true })
	cy.wait(1000);
	cy.get(pageObj.add_contact_fields.search_company_field).type(company);
	cy.wait(1000);
	cy.get(pageObj.add_contact_fields.create_select_company).then((companySelect) => {
		if (companySelect.find(company)) {
			cy.get(pageObj.add_contact_fields.create_select_company).click();
		}
		else {
			cy.get(pageObj.add_contact_fields.create_select_company).find('create').click();
		};
		cy.wait(1000);
	})
	cy.get(pageObj.add_contact_fields.phone_number).type(phoneNumber);
	contactEmail = email;
	contactFullName = firstName + " " + lastName
};

/*
 * function to edit contact
 */
export const editContact = () => {
	generateData();
	cy.get('.justify-content-between > .d-flex > .heading').should('have.text', 'Edit Contact');
	cy.get(pageObj.contact_detail_page_edit_fields.first_name).clear().type(firstName);
	cy.get(pageObj.contact_detail_page_edit_fields.last_name).clear().type(lastName);
	cy.get(pageObj.contact_detail_page_edit_fields.phone_number).clear().type(phoneNumber);
	cy.get(pageObj.contact_detail_page_edit_fields.company_field).click({ force: true }).type(company);
	cy.get(pageObj.contact_detail_page_edit_fields.create_select_company).then((createCompany) => {
		if (createCompany.find(company)) {
			cy.get(pageObj.contact_detail_page_edit_fields.create_select_company).click();
		}
		else {
			cy.get(pageObj.contact_detail_page_edit_fields.create_select_company).find('create').click();
		};
	})
	cy.wait(1000);
	cy.get(pageObj.contact_detail_page_edit_fields.update_btn).click();
	cy.wait(2000);
	contactFullName = firstName + " " + lastName;
}

/*
 * function to navigate all pages in settings
 */
export const validateSettingsPage = () => {
	//Navigate to Settings Page
	cy.get(pageObj.settings.settings_btn).click();
	cy.get(pageObj.basic_profile.basic_detail_header_text).should('have.text', 'Basic Details');
	cy.wait(1000);
	// Navigate to Security Page in settings
	cy.get(pageObj.settings.security_tab).click();
	cy.get(pageObj.security_page.security_page_header_text).should('have.text', 'Security');
	// Navigate to Data fields
	cy.get(pageObj.settings_data_fields.datafields_tab).click();
	// Navigate to Fields Page in Data fields
	cy.get(pageObj.settings_data_fields.field_tab).click();
	// Navigate to Group Page in Data fields
	cy.get(pageObj.settings_data_fields.group_tab).click();
	//Navigate to customization tab in settings
	cy.get(pageObj.settings_customization.customization_tab).click();
	cy.wait(3000);
	//Navigate to contact tab in customization
	cy.get(pageObj.settings_customization.contact_tab).click({
		multiple: true,
		force: true
	})
	cy.wait(1000);
	//Navigate to deal tab in customization
	cy.get(pageObj.settings_customization.deals_tab).click({
		multiple: true,
		force: true
	});
	cy.wait(1000);
	//Navigate to company tab in customization
	cy.get(pageObj.settings_customization.company_tab).click({
		multiple: true,
		force: true
	});
	cy.wait(1000);
	// Navigate to user management page
	cy.get(pageObj.settings_user_management.user_nav_btn).click();
	// Navigate to team management page
	cy.get(pageObj.settings_user_management.team_nav_btn).click();
	// Navigate to role management page
	cy.get(pageObj.settings_user_management.role_nav_btn).click();
	// Navigate to google integration page
	cy.get(pageObj.settings_google_integration.integration_btn).click();
	// Validate the integration header text
	cy.get(pageObj.settings_google_integration.header_integration_text).should('have.text', 'Integrations');
};

/**
 * function to create company
 */
export function createCompany() {
	generateData();
	cy.get(pageObj.company_detail_page.company_name_input).type(company);
	cy.get(pageObj.company_detail_page.company_phone_number_input).type(phoneNumber);
	cy.wait(3000);
	companyName = company;
	companyPhoneNumber = phoneNumber;
}

/**
 * function to create deal
 */
export const createDeal = () => {
	generateData();
	cy.get(pageObj.add_deal_fields.deal_name_input_field).type(dealName);
	cy.get(pageObj.add_deal_fields.amount__input_field).type(amount);
	cy.get(pageObj.add_deal_fields.closing_date_input_field).click();
	cy.get('.MuiPickersDay-current.MuiPickersDay-daySelected').click();
	cy.wait(2000);
	cy.get(pageObj.add_deal_fields.pipeline_field).click();
	cy.get(pageObj.add_deal_fields.pipeline_list).contains('Sales Pipeline').click();
	cy.get(pageObj.add_deal_fields.stage_field).click();
	cy.get(pageObj.add_deal_fields.stage_list).contains('Won').click();
	cy.get(pageObj.add_deal_fields.associated_contact).click();
	cy.wait(2000);
	cy.get(pageObj.add_deal_fields.associated_contact_input).type(firstName);
	cy.wait(3000);
	cy.get('#menu- > div > ul > div > div > div > p').click();
	cy.wait(1000);
	updatedDealName = dealName;
	amount1 = Number(amount.slice(0, 2) + "." + amount.slice(2)).toFixed(2) + 'K';
    amount2 = amount.slice(0, 2) + "," + amount.slice(2);
}

/**
 * function to edit deal
 */
export const editDeal = () => {
    cy.wait(4000);
    generateData();
    cy.get(pageObj.add_deal_fields.deal_name_input_field).clear().type(dealName);
    cy.get(pageObj.add_deal_fields.amount__input_field).clear().type(amount);
    cy.get(pageObj.add_deal_fields.amount__input_field);
    updatedDealName = dealName;
    amount1 = Number(amount.slice(0, 2) + "." + amount.slice(2)).toFixed(2) + 'K';
    amount2 = amount.slice(0, 2) + "," + amount.slice(2);
}

/**
 * function to validate created contact in details page
 */
export const validateCreatedContactDetailsPage = () => {
	cy.get(pageObj.contact_detail_page.contact_name).contains(contactFullName);
	cy.get(pageObj.contact_detail_page.company_name_sub_title).contains(company);
	cy.get(pageObj.contact_detail_panel.first_name).contains(firstName);
	cy.get(pageObj.contact_detail_panel.email).contains(contactEmail);
	cy.get(pageObj.company_detail_page.back_button).click();
	cy.wait(2000);
}

/**
 * function to validate created contact in list page
 */
export const validateCreatedContactListPage = () => {
	searchContact();
	cy.get(pageObj.contact_list_page.contact_list).should('contain', contactFullName);
	cy.get(pageObj.contact_list_page.contact_list).should('contain', contactEmail);
}

/**
 * function to validate Edited Contact in Detail Page
 */
export const validateEditedContactDetailPage = () => {
	cy.get(pageObj.contact_detail_page.contact_name).should('contain', contactFullName);
	cy.get(pageObj.contact_detail_panel.email).should('contain', contactEmail);
	cy.get(pageObj.contact_detail_page.back_button).click();
}

/**
 * function to validate Edited Contact in List Page
 */
export const validateEditedContactListPage = () => {
	searchContact();
	cy.get(pageObj.contact_list_page.contact_name).should('contain', contactFullName);
	cy.get(pageObj.contact_list_page.contact_list).should('contain', contactEmail);
}

/**
 * function to Validate Contact List Footer Elements
 */
export const validateContactFooterElements = () => {
	cy.get(pageObj.contact_list_page.contact_select_check_box).click();
	cy.get(pageObj.contact_list_page_footer.send_email_btn).should('have.text', 'Send Email').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.assign_to_btn).should('have.text', 'Assign To').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.create_task_btn).should('have.text', 'Create Task').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.export_btn).should('have.text', 'Export').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.edit_btn).should('have.text', 'Edit ').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.delete_btn).should('have.text', 'Delete').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.cancel_btn).should('have.text', 'Cancel').should('be.visible');
	}

/**
 * function to Validate Company List Footer Elements
 */
export const validateCompanyFooterElements = () => {
	cy.get(pageObj.contact_list_page.contact_select_check_box).click();
	cy.get(pageObj.contact_list_page_footer.assign_to_btn).should('have.text', 'Assign To').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.create_task_btn).should('have.text', 'Create Task').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.export_btn).should('have.text', 'Export').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.edit_btn).should('have.text', 'Edit ').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.delete_btn).should('have.text', 'Delete').should('be.visible');
	cy.get(pageObj.contact_list_page_footer.cancel_btn).should('have.text', 'Cancel').should('be.visible');
	}

/**
 * function to validate company detail page elements
 */
export const validateContactDetailPageElements = () => {
	cy.get(pageObj.contact_details_page_elements.three_dot_menu).should('be.visible');
	cy.get(pageObj.contact_details_page_elements.send_email_icon).should('be.visible');
	cy.get(pageObj.contact_details_page_elements.schedule_an_appointment_icon).should('be.visible');
	cy.get(pageObj.contact_details_page_elements.create_a_task_icon).should('be.visible');
	cy.get(pageObj.contact_details_page_elements.make_a_deal_icon).should('be.visible');
}

/**
 * function to Validate Created Deal Detail in Detail Page
 */
export const validateCreatedDealDetail = () => {
	cy.get('div > div > div > h5').contains(dealName);
	cy.get(pageObj.deal_detail_panel.deal_name).contains(dealName);
	cy.get(pageObj.deal_detail_panel.amount).contains(amount2);
	cy.get(pageObj.deal_detail_page.back_button).click();
	cy.wait(2000);
}

/**
 *  function to validate the Deal Details in the Board View Page by Searching
 */
export const validateCreatedDealInBoard = () => {
	searchDeal();
	cy.get(pageObj.deal_won_stage.deal_name).should('have.text', updatedDealName);
	cy.wait(2000);
}

/**
 * function to validate the Deal Details in the list view page by searching
 */
export const validateCreatedDealInList = () => {
	cy.get(pageObj.deal_list_kanban_page.list_view_btn).click();
	searchDeal();
	cy.get(pageObj.deal_list_kanban_page.deal_list).should('contain', dealName);
	cy.get(pageObj.deal_list_kanban_page.deal_list).should('contain', amount1);
}

/**
 *  function to validate the Edited deal in Detail page
 */
export const validateEditedDealInDetailPage = () => {
	cy.get('div > div > div > h5').should('contain', dealName);
	cy.get(pageObj.deal_detail_page.back_button).click();
}

/**
 *  function to validate the Edited deal in List page
 */
export const validateEditedDealInListPage = () => {
	searchDeal();
	cy.wait(2000);
	cy.get(pageObj.deal_list_kanban_page.deal_list).should('contain', dealName);
	cy.get(pageObj.deal_list_kanban_page.deal_list).should('contain', amount1);
}

/**
 *  function to validate edited deal in board page
 */
export const validateEditedDealInBoardPage = () => {
	cy.get(pageObj.deal_list_kanban_page.board_view_btn).click();
	cy.wait(3000);
	searchDeal();
	cy.get(pageObj.deal_won_stage.deal_name).should('have.text', updatedDealName);
	cy.get(pageObj.deal_won_stage.deal_amount).should('contain', amount1);
	cy.wait(2000);
}

/**
 *  function to validate deal list page footer buttons
 */
export const validateDealListFooterButtons = () => {
	cy.get(pageObj.deal_list_page_footer.export_btn).should('have.text', 'Export').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.edit_btn).should('have.text', 'Edit ').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.delete_btn).should('have.text', 'Delete').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.lost_btn).should('have.text', 'Lost').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.won_btn).should('have.text', 'Won').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.create_task).should('have.text', 'Create Task').should('be.visible');
	cy.get(pageObj.deal_list_page_footer.cancel_btn).should('have.text', 'Cancel').should('be.visible');
}

/**
 *  function to delete deal
 */
export const deleteDeal = () => {
	cy.get(pageObj.deal_list_page_footer.delete_btn).click();
	cy.get(pageObj.deal_delete_popup.delete_deal_header).should('have.text', 'Delete Deal');
	cy.get(pageObj.deal_delete_popup.deal_list_delete_btn).click();
	cy.wait(3000);
}

/**
 *  function to validate deleted Contact in list page
 */
export const validateDeletedContact = () => {
	searchContact();
	cy.get(pageObj.contact_list_page.contact_empty_page_text).should('contain', 'No Contact Found');
}

/**
 *  function to validate deleted contact in list page
 */
export const deleteContact = () => {
	cy.get(pageObj.contact_list_page_footer.delete_btn).click();
	cy.get(pageObj.deal_delete_popup.delete_deal_header).should('have.text', 'Delete Contact');
	cy.get(pageObj.contact_delete_popup.contact_list_delete_btn).click();
	cy.wait(3000);
}

/**
 *  function to validate deleted deal in list page
 */
export const validateDeletedDeal = () => {
	searchDeal();
	cy.get(pageObj.contact_list_page.contact_empty_page_text).should('contain', 'No Deal Found');
}

/**
 *  function to search contact in list page
 */
export const searchContact = () => {
	cy.get(pageObj.contact_list_page.contact_search).clear().type(contactEmail).type('{enter}');
	cy.wait(3000)
}

/**
 *  function to search deal in list page
 */
export const searchDeal = () => {
	cy.get(pageObj.contact_list_page.contact_search).clear().type(dealName).type('{enter}');
	cy.wait(5000)
}

/**
 *  function to search appointment in list page
 */
export const searchAppointment = () => {
	cy.get(pageObj.contact_list_page.contact_search).clear().type(updatedAppointmentName).type('{enter}');
	cy.wait(5000);
}

/**
 *  function to search task in list page
 */
export const searchTask = () => {
	cy.get(pageObj.contact_list_page.contact_search).clear().type(updatedTaskName).type('{enter}');
	cy.wait(5000);
}

/**
 *  function to validate created company in details page
 */
export const validateCreatedCompanyDetails = () => {
	cy.get(pageObj.company_detail_page.created_company_name_title).should('contain', companyName);
	cy.get(pageObj.company_detail_page.created_company_name_company_details).should('contain', companyName)
	cy.get(pageObj.company_detail_page.company_phone_number_details).should('contain', companyPhoneNumber)
	cy.get(pageObj.company_detail_page.back_button).click();
	cy.wait(2000);
}

/**
 *  function to search deal in list page
 */
export const searchCompany = () => {
	cy.get(pageObj.company_list_page.search_companies_input).clear().type(companyName).type('{enter}');
	cy.wait(2000)
}

/**
 * function to validate company in list
 */
export const validateCompanyInList = () => {
	cy.get(pageObj.company_list_page.company_name).should('contain', companyName)
	cy.get(pageObj.company_list_page.company_phone_number).should('contain', companyPhoneNumber)
}

/**
 * function to validate company detail page elements
 */
export const validateCompanyDetailPageElements = () => {
	cy.get(pageObj.company_details_page_elements.three_dot_menu).should('be.visible');
	cy.get(pageObj.company_details_page_elements.send_email_icon).should('be.visible');
	cy.get(pageObj.company_details_page_elements.schedule_an_appointment_icon).should('be.visible');
	cy.get(pageObj.company_details_page_elements.create_a_task_icon).should('be.visible');
	cy.get(pageObj.company_details_page_elements.make_a_deal_icon).should('be.visible');
}

/**
 * function to edit company
 */
export const editCompany = () => {
	cy.get('.justify-content-between > .d-flex > .heading').should('have.text', 'Edit Company');
	generateData();
	cy.get(pageObj.edit_company_fields.company_name_input).clear().type(company);
	cy.get(pageObj.edit_company_fields.company_phone_number_input).clear().type(phoneNumber);
	cy.wait(3000);
	companyName = company;
	companyPhoneNumber = phoneNumber;
	cy.get(pageObj.edit_company_fields.update_btn).click();
}

/**
 * function to validate edited company in detail page
 */
export const validateEditedCompanyDetailPage = () => {
	cy.get(pageObj.company_detail_page.created_company_name_company_details).should('contain', companyName);
	cy.get(pageObj.contact_detail_page.back_button).click();
}

/**
 * function to validate edited company in list page
 */
export const validateEditedCompanyListPage = () => {
	searchCompany();
	cy.get(pageObj.company_list_page.company_name).should('contain', companyName);
	cy.get(pageObj.company_list_page.company_phone_number).should('contain', companyPhoneNumber);
}

/**
 * function to delete company
 */
export const deleteCompany = () => {
	cy.get(pageObj.contact_list_page_footer.delete_btn).click();
	cy.get(pageObj.company_delete_popup.delete_company_header).should('have.text', 'Delete Company');
	cy.get(pageObj.company_delete_popup.company_list_delete_btn).click();
	cy.wait(3000);
}

/**
 * function to validate deleted company
 */
export const validateDeletedCompany = () => {
	searchCompany();
	cy.get(pageObj.company_list_page.company_empty_page_text).should('contain', 'No Company Found');
}

/*
 * function to create appointment
 */
export const createAppointment = () => {
	generateData();
	cy.get(pageObj.create_appointment_drawer.appointment_title_input_field).type(appointmentName);
	cy.get(pageObj.create_appointment_drawer.meeting_date_input_field).eq(0).click({ multiple: true, force: true });
	//cy.get(pageObj.create_appointment_drawer.calender_next_btn).click();
	cy.get('.MuiPickersCalendarHeader-switchHeader > button:nth-child(3)').click();
	cy.get('.MuiPickersBasePicker-pickerView > div > div > div:nth-child(4) > div:nth-child(3) > button').click({ multiple: true, force: true });
	cy.get('.drawer-content > div > form > div > div:nth-child(3) > div > div > div > div > button').click();
	cy.get('div.MuiDialogActions-root.MuiDialogActions-spacing > button:nth-child(2) > span.MuiButton-label').click();
	//cy.get(pageObj.create_appointment_drawer.calender_dates).click();
	//cy.get(pageObj.create_appointment_drawer.time_field).eq(1).click();
	//cy.get(pageObj.create_appointment_drawer.clock_ok_btn).click({ multiple: true, force: true });
	cy.get('.drawer-content > div > form > div> div:nth-child(4) > div > div > svg').click({force: true});
	//cy.get('#timezone > div > div> div > svg').click();
	//cy.get('.drawer-content > div > form > div:nth-child(5) > div > div').click({force: true});
	cy.get('.drawer-content > div > form > div:nth-child(5) > div > div').click();
	//cy.get(pageObj.create_appointment_drawer.guest_dropdown_field).click();
	cy.get(pageObj.create_appointment_drawer.guest_search_field).type(firstName);
	cy.wait(3000);
	cy.get(pageObj.create_appointment_drawer.guest_dropdown_check_box).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.activity_dropdown_close_button).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.description_field).type(description);
	updatedAppointmentName = appointmentName;
	cy.wait(3000);
	cy.get(pageObj.create_appointment_drawer.save_appointment_btn).click();
	cy.wait(4000);
}

/*
 * function to edit appointment
 */
export const editAppointment = () => {
	cy.get(pageObj.activity_page.activity_table_checkbox).eq(0).click();
	cy.get(pageObj.activity_page.activity_footer_edit_button).click();
	cy.get(pageObj.create_appointment_drawer.appointment_title_input_field).clear().type(appointmentName);
	cy.get('.drawer-content > div > form > div:nth-of-type(2) > div:nth-of-type(1) > div > div > div > div > button').click({ multiple: true, force: true });
	cy.wait(1000);
	cy.get(pageObj.create_appointment_drawer.calender_next_btn).click();
	cy.get(pageObj.create_appointment_drawer.calender_dates).click();
	cy.get('.drawer-content > div > form > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > button').click();
	cy.get(pageObj.create_appointment_drawer.clock_ok_btn).click({ multiple: true, force: true });
	cy.get('#guest').click({ multiple: true, force: true });
	cy.get(pageObj.create_appointment_drawer.guest_search_field).eq(0).type(firstName);
	cy.wait(3000);
	cy.get('#menu- > div> ul > div> div > div > label > div').click({ force: true });
	cy.get('#menu- > div:nth-child(1)').click({ force: true });
	cy.get(pageObj.create_appointment_drawer.description_field).clear().type('Meeting for a deal');
	cy.wait(3000);
	cy.get('.google-calender-text.d-flex.align-items-center > div > label > div').click();
	cy.get('div > div:nth-child(2) > button.MuiButton-containedPrimary').should('contain', 'Update');
	cy.get('div > div:nth-child(2) > button.MuiButton-containedPrimary').click();
	cy.wait(8000);
}

/**
 * function to delete appointment
 */
export const deleteAppointment = () => {
	searchAppointment();
	cy.get('.MuiTableCell-alignRight.MuiTableCell-paddingCheckbox> div > label > div').eq(0).click();
	cy.get('#delete-btn').click();
	cy.get('div:nth-child(3) > div > div > h5').should('have.text', 'Delete Activity');
	cy.get('body > div> div:nth-child(3) > div > div > div > p').should('contain', pageObj.create_appointment_drawer.delete_pop_up);
	cy.get('body > div> div:nth-child(3) > div > div > div > div > button:nth-child(2) > span').should('contain', 'Delete');
	cy.get('body > div> div > div > div > div > div > button > span').should('contain', 'Cancel');
	cy.get('body > div> div> div > div > div > div > button:nth-child(2)').click();
}

/**
 * function to validate created appointment in activity list page
 */
export const validateCreatedAppointmentInListpage = () => {
	cy.get('div> div > div> div:nth-child(5)> button').click();
	searchAppointment();
	cy.wait(5000);
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3) > div').should('contain', appointmentName);
}

/**
 * function to validate created appointment in details page
 */
export const validateCreatedAppointmentInDetailspage = () => {
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(7) > p').click();
	cy.wait(5000);
	// Validate created appointment in timeline
	cy.get('.activity-panel > div > div > div > h6').should('contain', appointmentName);
	cy.get('.activity-panel > div > div > p > span').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(1) > p.hint-sm.mb-1').should('have.text', 'Meeting Date & Time');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(1) > p.font-normal.sub-title.text-wrap.pr-2').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p.hint-sm.mb-1').should('have.text', 'Duration');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p > p').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(3) > p').should('have.text', 'Guest');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(3) > p.hint-sm.mb-1').should('have.text', 'Held by');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(3) > p.font-normal.sub-title.text-wrap.pr-2').should('be.visible');
	cy.get('.activity-panel > div > div.border-top.p-b-12.mx-3> div > div').should('be.visible');
	// Validate created appointment in right panel
	cy.get('.note-panel > div > div> div> div:nth-child(2)').click();
	cy.get('div.ml-2.flex-1 > p.heading.line-157.text-wrap').should('contain', appointmentName);
	cy.get('div.ml-2.flex-1 > p.date-info').should('be.visible');
	cy.get('.note-panel > div > div > div > div > div > div > p > span').should('be.visible');
	cy.get('.note-panel > div > div > div > div > div > div > div> p').should('be.visible');
}

/**
 * function to validate edited appointment in activity list page
 */
export const validateEditedAppointmentInListpage = () => {
	cy.get('div> div > div> div:nth-child(5)> button').click();
	searchAppointment();
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3) > div').should('contain', updatedAppointmentName);
}

/**
 * function to validate edited appointment in details page
 */
export const validateEditedAppointmentInDetailspage = () => {
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(7) > p').click();
	cy.wait(5000);
	// Validate edited appointment in timeline
	cy.get('.activity-panel > div > div > div > h6').should('contain', updatedAppointmentName);
	cy.get('.activity-panel > div > div > p > span').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(1) > p.hint-sm.mb-1').should('have.text', 'Meeting Date & Time');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(1) > p.font-normal.sub-title.text-wrap.pr-2').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p.hint-sm.mb-1').should('have.text', 'Guest');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p > p').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(3) > p.hint-sm.mb-1').should('have.text', 'Held by');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(3) > p.font-normal.sub-title.text-wrap.pr-2').should('be.visible');
	cy.get('.activity-panel > div > div.border-top.p-b-12.mx-3 > div > div').should('be.visible');
	// Validate edited appointment in right panel
	cy.get('.note-panel > div > div> div> div:nth-child(2)').click();
	cy.get('div.ml-2.flex-1 > p.heading.line-157.text-wrap').should('contain', updatedAppointmentName);
	cy.get('div.ml-2.flex-1 > p.date-info').should('be.visible');
	cy.get('.note-panel > div > div > div > div > div > div > p > span').should('be.visible');
	cy.get('.note-panel > div > div > div > div > div > div > div> p').should('be.visible');
}

/*
 * function to validate deleted appointment in activity list page
 */
export const validateDeletedAppointmentInListpage = () => {
	cy.get('div> div > div> div:nth-child(5)> button').click();
	searchAppointment();
}

/*
 * function to create task
 */
export const createTask = () => {
	cy.wait(3000);
	cy.get(pageObj.create_appointment_drawer.appointment_title_input_field).type(taskName);
	cy.get(pageObj.create_appointment_drawer.meeting_date_input_field).click({ multiple: true, force: true });
	cy.get(pageObj.create_appointment_drawer.calender_next_btn).click();
	cy.get(pageObj.create_appointment_drawer.calender_dates).click();
	cy.get(pageObj.create_appointment_drawer.time_field).click();
	cy.get(pageObj.create_appointment_drawer.clock_ok_btn).click({ multiple: true, force: true });
	cy.get(pageObj.create_appointment_drawer.description_field).type(description);
	updatedTaskName = taskName;
	cy.get(pageObj.create_appointment_drawer.associate_with_dropdown_field).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.associate_with_search_field).type(firstName);
	cy.get(pageObj.create_appointment_drawer.associate_with_checkbox).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.activity_dropdown_close_button).click({ force: true });
}

/**
 * function to validate created task in activity list page
 */
export const validateCreatedTaskInListpage = () => {
	cy.get(pageObj.activity_page.table_today_button).click();
	searchTask();
	cy.wait(5000);
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(3) > div').should('contain', taskName);
}

/**
 * function to validate created task in details page
 */
export const validateCreatedTaskInDetailspage = () => {
	cy.get('table > tbody > tr:nth-child(1) > td:nth-child(7) > p').click();
	cy.wait(5000);
	// Validate created task in timeline
	cy.get('.activity-panel > div > div > div > h6').should('contain', taskName);
	cy.get('.activity-panel > div > div > p > span').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p.hint-sm.mb-1').should('have.text', 'Assigned to');
	cy.get('.activity-panel > div:nth-child(3) > div > div:nth-child(2) > p > p').should('be.visible');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(3) > p.hint-sm.mb-1').should('have.text', 'Created by');
	cy.get('.activity-panel > div:nth-child(3) > div> div:nth-child(3) > p.font-normal.sub-title.text-wrap.pr-2').should('be.visible');
}

/*
 * function to edit task
 */
export const editTask = () => {
	cy.get(pageObj.activity_page.activity_table_checkbox).eq(0).click();
	cy.get(pageObj.activity_page.activity_footer_edit_button).click();
	cy.get(pageObj.create_appointment_drawer.appointment_title_input_field).clear().type(taskName);
	cy.get(pageObj.edit_task_drawer.meeting_date_field).click({ multiple: true, force: true });
	cy.wait(1000);
	cy.get(pageObj.create_appointment_drawer.calender_next_btn).click();
	cy.get(pageObj.create_appointment_drawer.calender_dates).click();
	cy.get(pageObj.edit_task_drawer.time_field).click();
	cy.get(pageObj.create_appointment_drawer.clock_ok_btn).click({ multiple: true, force: true });
	cy.get(pageObj.create_appointment_drawer.description_field).clear().type(description);
	cy.get(pageObj.create_appointment_drawer.associate_with_dropdown_field).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.associate_with_search_field).type(firstName);
	cy.get(pageObj.create_appointment_drawer.associate_with_checkbox).click({ force: true });
	cy.get(pageObj.create_appointment_drawer.activity_dropdown_close_button).click({ force: true });
}

/**
 * function to delete task
 */
export const deleteTask = () => {
	searchTask();
	cy.get(pageObj.activity_page.activity_table_checkbox).eq(0).click();
	cy.get('#delete-btn').click();
	cy.get('div:nth-child(3) > div > div > h5').should('have.text', 'Delete Activity');
	cy.get('body > div> div:nth-child(3) > div > div > div > p').should('contain', pageObj.create_appointment_drawer.delete_pop_up);
	cy.get('body > div> div:nth-child(3) > div > div > div > div > button:nth-child(2) > span').should('contain', 'Delete');
	cy.get('body > div> div > div > div > div > div > button > span').should('contain', 'Cancel');
	cy.get('body > div> div> div > div > div > div > button:nth-child(2)').click();
}

/**
 * function to create field
 */
export const createField = () => {
	generateData();
	cy.get(pageObj.field_tab.create_field_btn).click();
	cy.get(pageObj.create_field_drawer.field_name).type(fieldName);
	cy.get(pageObj.create_field_drawer.object_type).click();
	cy.get(pageObj.create_field_drawer.types_list).contains('Contacts').click({ force: true });
	cy.wait(1000);
	cy.get(pageObj.create_field_drawer.group_field).click();
	cy.get(pageObj.create_field_drawer.group_list).contains('Contact Information').click({ force: true });
	cy.get(pageObj.create_field_drawer.continue_btn).click();
	updatedField = fieldName;
}

/**
 * function to validate field in list
 */
export const validateFieldInList = () => {
	cy.get(pageObj.field_tab.field_name).should('contain', updatedField);
}

/**
 * function to edit field
 */
export const editField = () => {
	generateData();
	cy.get(pageObj.field_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.field_tab.edit_field).click();
	cy.get(pageObj.create_field_drawer.field_name).clear().type(fieldName);
	cy.get(pageObj.create_field_drawer.object_type).click();
	cy.get(pageObj.create_field_drawer.types_list).contains('Contacts').click({ force: true });
	cy.wait(1000);
	cy.get(pageObj.create_field_drawer.group_field).click();
	cy.get(pageObj.create_field_drawer.group_list).contains('Contact Information').click({ force: true });
	cy.get(pageObj.create_field_drawer.continue_btn).click();
	cy.wait(2000);
	cy.get(pageObj.create_field_drawer.update).click();
	cy.wait(2000);
	updatedField = fieldName;
}

/**
 * function to search field
 */
export const searchField = () => {
	cy.get(pageObj.field_tab.field_search).clear().type(updatedField).type('{enter}');
	cy.wait(2000)
}

/**
 * function to delete field
 */
export const deleteField = () => {
	cy.get(pageObj.field_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.field_tab.delete).click();
	cy.get(pageObj.field_tab.delete_pop_up_btn).click();
	cy.wait(3000);
}

/**
 * function to validate field delete
 */
export const validateFieldDelete = () => {
	searchField()
	cy.get(pageObj.field_tab.empty_page).should('contain', 'No Fields Found');
}

/**
 * function to navigate to field tab
 */
export const navigateFieldTab = () => {
	cy.wait(10000);
	cy.get(pageObj.settings.settings_btn).click();
	cy.wait(8000);
	cy.get(pageObj.settings_data_fields.datafields_tab).click();
	cy.wait(2000);
	cy.get(pageObj.field_tab.field_tab_text).should('contain', 'Field')
}

/**
 * function to move field
 */
export const moveField = () => {
	cy.get(pageObj.field_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.field_tab.move_to_group).click();
	cy.wait(3000);
	cy.get(pageObj.field_tab.move_to_group_header).should('contain', 'Move To Group');
	cy.get(pageObj.field_tab.field_to_move).should('contain', updatedField);
	cy.get(pageObj.field_tab.move_to_field).click();
	cy.get(pageObj.field_tab.group_list).contains('Social Media Information').click();
	cy.get(pageObj.field_tab.update_group_btn).click();
}

/**
 * function to filter data fields according to object types
 */
export const typesFilter = () => {
	cy.get(pageObj.field_tab.type_filter_dropdown).click();
	cy.get(pageObj.field_tab.type_filter_list).contains('Contacts').click();
}

/**
 * function to delete the created custom field
 */
export const deleteCreatedCustomField = () => {
	cy.wait(10000);
	cy.get(pageObj.settings.settings_btn).click();
	cy.wait(8000);
	cy.get(pageObj.settings_data_fields.datafields_tab).click();
	cy.wait(2000);
	cy.get(pageObj.field_tab.field_tab_text).should('contain', 'Field');
	cy.get(pageObj.field_tab.type_filter_dropdown).click();
	cy.get(pageObj.field_tab.type_filter_list).contains('Contacts').click();
	cy.get(pageObj.field_tab.field_search).clear().type(updatedField).type('{enter}');
	cy.wait(5000);
	cy.get(pageObj.field_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.field_tab.delete).click();
	cy.get(pageObj.field_tab.delete_pop_up_btn).click();
	cy.wait(3000);
}



/**
 * function to navigate to Group tab
 */
export const navigateGroupTab = () => {
	cy.wait(2000);
	cy.get(pageObj.settings.settings_btn).click();
	cy.wait(2000);
	cy.get(pageObj.settings_data_fields.datafields_tab).click();
	cy.wait(2000);
	cy.get(pageObj.settings_data_fields.group_tab).click();
	cy.wait(2000);
	cy.get(pageObj.settings_data_fields.group_tab).should('contain', 'Group')
}

/**
 * function to create Group
 */
export const createGroup = () => {
	generateData();
	cy.get(pageObj.group_tab.create_group_btn).click();
	cy.get(pageObj.group_drawer.group_name).type(groupName);
	cy.get(pageObj.group_drawer.object_type).click();
	cy.get(pageObj.group_drawer.object_type_list).contains('Contacts').click({ force: true });
	cy.wait(1000);
	cy.get(pageObj.group_drawer.create_group).click();
	updatedGroup = groupName;
}

/**
 * function to search Group
 */
export const searchGroup = () => {
	cy.get(pageObj.group_tab.group_search).clear().type(updatedGroup).type('{enter}');
	cy.wait(2000)
}
/**
 * function to validate group in list
 */
export const validateGroupInList = () => {
	cy.get(pageObj.group_tab.group_name).should('contain', updatedGroup);
}

/**
 * function to edit group
 */
export const editGroup = () => {
	generateData();
	cy.get(pageObj.group_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.group_tab.edit_group).click();
	cy.get(pageObj.group_drawer.group_name).clear().type(groupName);
	cy.wait(3000);
	cy.get(pageObj.group_drawer.group_update).click();
	cy.wait(3000);
	updatedGroup = groupName;
}

/**
 * function to view field
 */
export const viewField = () => {
	cy.get(pageObj.group_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.group_tab.view_field).click();
	cy.wait(3000);
}

/**
 * function to validate view field
 */
export const validateViewField = () => {
	cy.get(pageObj.field_tab.field_tab_text).should('contain', 'Field');
	cy.get(pageObj.field_tab.field_table_header_group).should('contain', 'Group')
}

/**
 * function to delete group
 */
export const deleteGroup = () => {
	cy.get(pageObj.group_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.group_tab.delete).click();
	cy.get(pageObj.group_tab.delete_pop_up_btn).click();
	cy.wait(3000);
}

/**
 * function to validate group delete
 */
export const validateGroupDelete = () => {
	searchGroup()
	cy.get(pageObj.group_tab.empty_page).should('contain', 'No Groups Found');
}

/**
 * function to create team
 */
export const createTeam = () => {
	generateData();
	cy.wait(2000);
	cy.get('body').then(body => {
		if (body.find(pageObj.team_tab.empty_page_img).is(':visible')) {
			cy.get(pageObj.team_tab.empty_page_create_team_btn).click();
		} else {
			cy.get(pageObj.team_tab.create_team_btn).click();
		}
	})
	cy.get(pageObj.team_tab.team_name).type(teamName);
	cy.wait(3000);
	cy.get(pageObj.team_tab.continue_create_btn).click();
	cy.get(pageObj.team_tab.continue_create_btn).click();
}

/**
 * function to edit team
 */
export const editTeam = () => {
	generateData();
	cy.wait(2000);
	cy.get(pageObj.team_tab.table_team_name).click();
	cy.get(pageObj.team_tab.drawer_edit_btn).click();
	cy.get(pageObj.team_tab.team_name).clear().type(teamName);
	cy.wait(3000);
	cy.get(pageObj.team_tab.continue_create_btn).click();
	cy.get(pageObj.team_tab.user_dropdown).click();
	cy.get(pageObj.team_tab.user_list).contains(fullName).click();
	cy.wait(3000);
	cy.get('.custom-checkbox > label > p').invoke('text').then((text) => {
		if (text.trim() == fullName) {
			cy.get(pageObj.team_tab.user_drawer_list).should('contain', fullName);
		} else {
			cy.get(pageObj.team_tab.no_user_found).should('have.text', 'No users found');
		}
	});
	cy.get(pageObj.team_tab.continue_create_btn).click({ force: true });
}

/**
 * function to delete team
 */
export const deleteTeam = () => {
	cy.get(pageObj.team_tab.more_option).click({ force: true });
	cy.get(pageObj.team_tab.delete_btn).click();
	cy.get(pageObj.team_tab.remove_team).should('have.text', 'Remove Team').click();
	cy.get(pageObj.team_tab.delete_notification).should('contain', 'Team deleted successfully');
	cy.wait(2000);
}

/**
 * function to create role
 */
export const createRole = () => {
	generateData();
	cy.wait(2000);
	cy.get(pageObj.role_tab.create_role_btn).click();
	cy.get(pageObj.role_tab.add_edit_drawer_header_text).should('contain', 'Add Role');
	cy.get(pageObj.role_tab.role_name_drawer_lable).should('contain', 'Role Name');
	cy.get(pageObj.role_tab.role_name).type(roleName);
	cy.wait(3000);
	cy.get(pageObj.role_tab.continue_create_btn).should('have.text', 'Continue').click();
	cy.get(pageObj.role_tab.role_name_drawer_second_step_text).should('have.text', roleName)
	cy.get(pageObj.role_tab.continue_create_btn).should('have.text', 'Add Role').click();
}

/**
 * function to edit role
 */
export const editRole = () => {
	generateData();
	cy.wait(2000);
	cy.get(pageObj.role_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.role_tab.edit_btn).click();
	cy.get(pageObj.role_tab.add_edit_drawer_header_text).should('contain', 'Edit Role');
	cy.get(pageObj.role_tab.role_name_drawer_lable).should('contain', 'Role Name');
	cy.get(pageObj.role_tab.role_name).clear().type(roleName);
	cy.wait(3000);
	cy.get(pageObj.role_tab.continue_create_btn).should('have.text', 'Continue').click();
	cy.get(pageObj.role_tab.role_name_drawer_second_step_text).should('have.text', roleName)
	cy.get(pageObj.role_tab.continue_create_btn).should('have.text', 'Update').click();
}

/**
 * function to delete role
 */
export const deleteRole = () => {
	cy.get(pageObj.role_tab.more_option_btn).click({ force: true });
	cy.get(pageObj.role_tab.delete_btn).click();
	cy.get(pageObj.role_tab.remove_role_btn).should('have.text', 'Remove Role').click();
	cy.get(pageObj.role_tab.delete_notification_snackbar).should('contain', 'Role deleted successfully');
	cy.wait(2000);
}

/**
 * function to associate existing deal with company
 */
export const associateExistingDealWithCompany = () => {
	cy.get(pageObj.company_detail_page.deal_association_icon).click();
	cy.get(pageObj.company_detail_page.add_deal_association_btn).click();
	cy.get(pageObj.company_detail_page.existing_deal_dropdown).click();
	cy.get(pageObj.company_detail_page.search_existing_deal_field).type(updatedDealName);
	cy.get(pageObj.company_detail_page.existing_deal_list).click();
	cy.get(pageObj.company_detail_page.deal_save_btn).click({ force: true });
	cy.get(pageObj.company_detail_page.associated_deal_name).should('have.text', updatedDealName);
}

/**
 * function to view associated deal with company
 */
export const viewAssociatedDeal = () => {
	cy.get(pageObj.company_detail_page.deal_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.associated_deal_name).should('have.text', updatedDealName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.deal_more_option_btn).click();
	cy.get(pageObj.company_detail_page.view_association).click();
	cy.get(pageObj.deal_detail_page.deal_name).should('have.text', updatedDealName);
	cy.get(pageObj.deal_detail_page.company_association_btn).click();
	cy.get(pageObj.deal_detail_page.associated_company_name).should('have.text', companyName);
}

/**
 * function to remove associated deal with company
 */
export const removeAssociatedDeal = () => {
	cy.get(pageObj.company_detail_page.deal_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.associated_deal_name).should('have.text', updatedDealName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.deal_more_option_btn).click();
	cy.get(pageObj.company_detail_page.remove_association).click();
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.empty_deal_association_text).should('have.text', 'No Deals here.');
}

/**
 * function to associate existing deal with contact
 */
export const associateExistingDealWithContact = () => {
	cy.get(pageObj.contact_detail_page.deal_association_icon).click();
	cy.get(pageObj.contact_detail_page.add_deal_association_btn).click();
	cy.get(pageObj.contact_detail_page.existing_deal_dropdown).click();
	cy.get(pageObj.contact_detail_page.search_existing_deal_field).type(updatedDealName);
	cy.get(pageObj.contact_detail_page.existing_deal_list).click();
	cy.get(pageObj.contact_detail_page.deal_save_btn).click({ force: true });
	cy.get(pageObj.contact_detail_page.associated_deal_name).should('have.text', updatedDealName);
}

/**
 * function to view associated deal with contact
 */
export const viewAssociateDealWithContact = () => {
	cy.get(pageObj.contact_detail_page.deal_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.associated_deal_name).should('have.text', updatedDealName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.deal_more_option_btn).click();
	cy.get(pageObj.contact_detail_page.view_association).click();
	cy.get(pageObj.deal_detail_page.deal_name).should('have.text', updatedDealName);
	cy.get(pageObj.deal_detail_page.contact_association_icon).click();
	cy.get(pageObj.deal_detail_page.associated_contact_name).contains(contactFullName);
}

/**
 * function to remove associated deal with contact
 */
export const removeAssociateDealWithContact = () => {
	cy.get(pageObj.contact_detail_page.deal_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.associated_deal_name).should('have.text', updatedDealName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.deal_more_option_btn).click();
	cy.get(pageObj.contact_detail_page.remove_association).click();
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.empty_deal_association_text).should('have.text', 'No Deals here.');
}

/**
 *
 * @returns {getEmail} - the email value obtained from the contact list
 */
export function getEmailFromContactList() {
	return cy.get('.table-body')
		.find('tr')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex > 0) {
				let randomNumber = Math.floor(Math.random() * (tableIndex - 0 + 1)) + 0;
				cy.get('table > tbody > tr > td > #email-id').eq(randomNumber).then(($ele) => {
					getEmail = $ele.text();
					return getEmail;
				});
			}
		});
}

/**
 *
 * @param type - passes the required filter type
 */
export function validateEmailContactListFilter(type: string) {
	const expectedValue = ((selectedEmail).toString()).trim();
	// Type - contains
	if (type == 'contains') {
		cy.get('table > tbody > tr > td > #email-id').eq(0).should('have.text', selectedEmail);
		// Type - empty
	} else if (type == 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('be.visible');
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type == 'not contain') {
		cy.get('table > tbody > tr > td > #email-id').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type == 'has value') {
		cy.get('table > tbody > tr > td > #email-id').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}

/**
 *
 * @returns {getFirstName} - the first name value obtained from the contact list
 */
export function getFirstNameFromContactList() {
	return cy.get('.table-body')
		.find('tr')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex > 0) {
				let randomNumber = Math.floor(Math.random() * (tableIndex - 0 + 1)) + 0;
				cy.get('table > tbody > tr > td > div > a:nth-child(1) > p').eq(randomNumber).then(($ele) => {
					getFirstName = $ele.text();
					return getFirstName;
				});
			}
		});
}

/**
 *
 * @param type - passes the required filter type - first name
 */
export function validateFirstNameContactListFilter(type: string) {
	const expectedValue = ((selectedFirstName).toString()).trim();
	// Type - contains
	if (type == 'contains') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').eq(0).should('have.text', selectedFirstName);
		// Type - empty
	} else if (type == 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('be.visible');
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type == 'not contain') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type == 'has value') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}

/**
 *
 * @returns {getLastName} - the last name value obtained from the contact list
 */
export function getLastNameFromContactList() {
	return cy.get('.table-body')
		.find('tr')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex > 0) {
				let randomNumber = Math.floor(Math.random() * (tableIndex - 0 + 1)) + 0;
				cy.get('table > tbody > tr > td > div > a:nth-child(1) > p').eq(randomNumber).then(($ele) => {
					getLastName = $ele.text();
					return getLastName;
				});
			}
		});
}

/**
 *
 * @param type - passes the required filter type - last name
 */
export function validateLastNameContactListFilter(type: string) {
	const expectedValue = ((selectedLastName).toString()).trim();
	// Type - contains
	if (type == 'contains') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').eq(0).should('have.text', selectedLastName);
		// Type - empty
	} else if (type == 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('be.visible');
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type == 'not contain') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type == 'has value') {
		cy.get('table > tbody > tr:nth-child(1) > td > div > a:nth-child(1)').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}


/**
 *
 * @returns {getCompanyName} - the company name value obtained from the contact list
 */
export function getCompanyNameFromContactList() {
	return cy.get('.table-body')
		.find('tr')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex > 0) {
				let randomNumber = Math.floor(Math.random() * (tableIndex - 0 + 1)) + 0;
				cy.get('table > tbody > tr > td.MuiTableCell-root.company-name-row.MuiTableCell-alignLeft').eq(randomNumber).then(($ele) => {
					getCompanyName = $ele.text();
					return getCompanyName;
				});
			}
		});
}

/**
 *
 * @param type - passes the required filter type - Company name
 */
export function validateCompanyNameContactListFilter(type: string) {
	const expectedValue = ((selectedCompanyName).toString()).trim();
	// Type - contains
	if (type == 'contains') {
		cy.get('table > tbody > tr > td.MuiTableCell-root.company-name-row.MuiTableCell-alignLeft').eq(0).should('have.text', selectedCompanyName);
		// Type - empty
	} else if (type == 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('be.visible');
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type == 'not contain') {
		cy.get('table > tbody > tr > td.MuiTableCell-root.company-name-row.MuiTableCell-alignLeft').then(($els) => Cypress._.map($els, 'value')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type == 'has value') {
		cy.get('table > tbody > tr > td.MuiTableCell-root.company-name-row.MuiTableCell-alignLeft').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}

/**
 *
 * @returns {getPhoneNumber} - the phone number value obtained from the contact list
 */
export function getPhoneNumberFromContactList() {
	return cy.get('.table-body')
		.find('tr')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex > 0) {
				let randomNumber = Math.floor(Math.random() * (tableIndex - 0 + 1)) + 0;
				cy.get('table > tbody > tr > td:nth-child(6)').eq(randomNumber).then(($ele) => {
					getPhoneNumber = $ele.text();
					return getPhoneNumber;
				});
			}
		});
}

/**
 *
 * @param type - passes the required filter type - Phone number
 */
export function validatePhoneNumberContactListFilter(type: string) {
	const expectedValue = ((selectedPhoneNumber).toString()).trim();
	// Type - contains
	if (type == 'contains') {
		cy.get('table > tbody > tr > td:nth-child(6)').eq(0).should('have.text', selectedPhoneNumber);
		// Type - empty
	} else if (type == 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('be.visible');
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type == 'not equal to') {
		cy.get('table > tbody > tr > td:nth-child(6)').then(($els) => Cypress._.map($els, 'value')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type == 'has value') {
		cy.get('table > tbody > tr > td:nth-child(6)').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}

/**
 *
 * @returns {getContactStage} - the Contact Stage value obtained from the contact list
 */
export function getContactStageFromContactList() {
	return cy.get('ul')
		.find('.select-checkbox')
		.then(listing => {
			tableIndex = Cypress.$(listing).length;
			if (tableIndex >= 0) {
				cy.get('#menu- > div > ul > div:nth-child(1) > div > label > p').eq(0).then(($ele) => {
					getContactStage = $ele.text();
					return getContactStage;
				});
			}
		});
}

/**
 *
 * @returns type - passes the required filter type - Contact Stage
 */
export function validateContactStageContactListFilter(type: string) {
	// Type - contains
	if (type === 'contains') {
		let expectedValue = ((getContactStage).toString()).trim();
		cy.get('table > tbody > tr> td.leadstatus-row.MuiTableCell-alignLeft').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').that.include(expectedValue);
		})
		// Type - empty
	} else if (type === 'empty') {
		cy.get('.dashboard-table-nodata > .heading').should('have.text', 'No Contact Found');
		cy.get('.small-two').should('have.text', 'There’s no contact found for your search.');
		// Type - not contain
	} else if (type === 'not contain') {
		let expectedValue = ((getContactStage).toString()).trim();
		cy.get('table > tbody > tr> td.leadstatus-row.MuiTableCell-alignLeft').then(($els) => Cypress._.map($els, 'value')).then((value) => {
			expect(value).to.be.an('array').that.does.not.include(expectedValue);
		})
		// Type - has value
	} else if (type === 'has value') {
		cy.get('table > tbody > tr> td.leadstatus-row.MuiTableCell-alignLeft').then(($els) => Cypress._.map($els, 'innerText')).then((value) => {
			expect(value).to.be.an('array').not.to.be.null;
		})
	}
}



/**
 * function to create SinglelineCustom field
 */
export const addSinglelineCustomField = () => {
	cy.wait(4000);
	// Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(0).click();
	cy.get(pageObj.create_field_drawer.label_box_1).type(labelName).type('{enter}');
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to Validate SinglelineCustom field in Contact list page
 */
export const validateSingleCustomFieldContactlistpage = () => {
	cy.wait(4000);
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_field_label).contains(updatedField);
	cy.get(pageObj.contact_list_page.custom_field_value).type('query');
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click();
	cy.wait(5000);
}

/**
 * function to create Multilinecustom field
 */
export const addMultilineCustomField = () => {
	// Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(1).click();
	cy.get(pageObj.create_field_drawer.multi_line_text_description).type(labelName).type('{enter}');
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to Validate MultilineCustom field in Contact list page
 */
export const validateMultilineCustomFieldContactlistpage = () => {
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_field_label).contains(updatedField);
	cy.get(pageObj.contact_list_page.custom_multiline_field_value).type('powershell');
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click();
	cy.wait(5000);
}

/**
 * function to create Number custom field
 */
export const addNumberCustomField = () => {
	// Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(2).click();
	cy.wait(3000);
	cy.get(pageObj.create_field_drawer.number_format_dropdown).click({ force: true });
	cy.get(pageObj.create_field_drawer.number_format_dropdown_list).click();
	cy.get(pageObj.create_field_drawer.label_box_1).type('1345');
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to Validate NumberCustom field in Contact list page
 */
export const validateNumberCustomFieldContactlistpage = () => {
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_number_field_label).contains(updatedField);
	cy.get(pageObj.contact_list_page.custom_number_field_value).type('7676776');
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click();
	cy.wait(5000);
}

/**
 * function to create Currency field
 */
export const addCurrencyCustomField = () => {
	//Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(3).click();
	cy.wait(3000);
	cy.get(pageObj.create_field_drawer.number_format_dropdown).click({ force: true });
	cy.get(pageObj.create_field_drawer.number_format_dropdown_list).click();
	cy.get(pageObj.create_field_drawer.label_box_1).type(amount);
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to create Dropdown custom field
 */
export const addDropdownField = () => {
	//Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(4).click();
	cy.wait(4000);
	createdField = fieldName;
	for (let i = 0; i <= 2; i++) {
		cy.get(pageObj.create_field_drawer.label_box_2).type(labelName).type('{enter}');
		generateData();
	}
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to assign Custom fields to Contact Dropdown
 */
export const assignCustomFieldsToContactDropdown = () => {
	cy.get(pageObj.settings_customization.customization_tab).click();
	cy.wait(3000);
	cy.get(pageObj.settings_customization.contact_tab).eq(0).click();
	cy.wait(3000);
	cy.get(pageObj.settings_customization.search_field).type(createdField);
	cy.get(pageObj.settings_customization.select_box_field).click({ force: true });
	cy.get(pageObj.settings_customization.footer_save_changes_btn).click();
}

/**
 * function to Validate DropdownCustom field in Contact list page
 */
export const validateDropdownCustomFieldContactlistpage = () => {
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_dropdown_field_label).click();
	cy.get(pageObj.contact_list_page.custom_dropdown_field_value).click();
	cy.get(pageObj.contact_list_page.custom_dropdown_field1_value).click();
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click();
	cy.wait(5000);
}

/**
 * function to create Multiselect custom field
 */
export const addMultiselectField = () => {
	//Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(5).click();
	cy.wait(4000);
	createdField = fieldName;
	for (let i = 0; i <= 2; i++) {
		cy.get(pageObj.create_field_drawer.label_box_2).type(labelName).type('{enter}');
		generateData();
	}
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
 * function to Validate Multiselect Custom field in Contact list page
 */
export const validateMultiselectCustomFieldContactlistpage = () => {
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_dropdown_field_label).click();
	cy.get(pageObj.contact_list_page.custom_dropdown_field_value).click();
	cy.get(pageObj.contact_list_page.custom_multiselect_field1_value).click();
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click({ force: true });
	cy.wait(5000);
}

/**
 * function to create Datepicker custom field
 */
export const addDatepickerField = () => {
	// Field creation
	createField();
	cy.get(pageObj.create_field_drawer.single_line_text).eq(6).click();
	cy.get(pageObj.create_field_drawer.create_field_btn).click();
}

/**
* function to Validate DatapickerCustom field in Contact list page
*/
export const validateDatepickerCustomFieldContactlistpage = () => {
	cy.get(pageObj.contact_list_page.add_Contact_btn).click();
	createContact();
	cy.get(pageObj.contact_list_page.custom_datepicker_field_label).contains(updatedField);
	cy.get(pageObj.contact_list_page.custom_datepicker_field_value).click({ multiple: true, force: true });
	cy.get(pageObj.contact_list_page.custom_datepicker_field1_value).click();
	cy.get(pageObj.add_contact_fields.create_contact_btn).eq(0).click();
	cy.wait(5000);
}

/**
 * function to assign Custom fields to Contact
 */
export const assignCustomFieldsToContact = () => {
	cy.get(pageObj.settings_customization.customization_tab).click();
	cy.wait(3000);
	cy.get(pageObj.settings_customization.contact_tab).eq(0).click();
	cy.wait(3000);
	cy.get(pageObj.settings_customization.search_field).type(fieldName);
	cy.get(pageObj.settings_customization.select_box_field).click({ force: true });
	cy.get(pageObj.settings_customization.footer_save_changes_btn).click();
}

/**
 * function to Validate Custom field in Contact details page
 */
export const validateCustomFieldContactDetailspage = () => {
	cy.get('div.details-panel > div > div > button > span.MuiButton-label').click();
	cy.wait(5000);
	//Contact details All Fields
	cy.get(pageObj.contact_detail_page.customized_field).type(updatedField);
	cy.wait(8000);
	cy.get(pageObj.contact_detail_page.add_to_view_btn).click({ multiple: true, force: true });
	cy.wait(8000);
	//Contact details View All Fields
	cy.get(pageObj.contact_detail_page.contact_details_page_header).click();
	cy.get(pageObj.contact_detail_page.contact_details_page_updated_field).contains(updatedField);
	cy.get(pageObj.contact_detail_page.contact_details_page_validate_field).should('be.visible');
	}

/**
 * function to create contact without company
 */
export const createContactWithoutCompany = () => {
	generateData();
	cy.wait(3000);
	cy.get(pageObj.add_contact_fields.first_name).type(firstName);
	cy.get(pageObj.add_contact_fields.last_name).type(lastName);
	cy.get(pageObj.add_contact_fields.email).type(email);
	contactEmail = email;
	contactFullName = firstName + " " + lastName
}

/**
 * function to associate existing contact with company
 */
export const associateExistingContactWithCompany = () => {
	cy.get(pageObj.company_detail_page.contact_association_icon).click();
	cy.get(pageObj.company_detail_page.add_contact_association_btn).click();
	cy.get(pageObj.company_detail_page.existing_contact_dropdown).click();
	cy.get(pageObj.company_detail_page.search_existing_contact_field).type(contactFullName);
	cy.get(pageObj.company_detail_page.existing_contact_list).click();
	cy.get(pageObj.company_detail_page.contact_save_btn).click({ force: true });
	cy.get(pageObj.company_detail_page.associated_contact_name).should('have.text', contactFullName);
}

/**
 *  function to edit the associated contact
 */
export const editAssociatedContact = () => {
	generateData();
	cy.get(pageObj.contact_detail_page_edit_fields.first_name).clear().type(firstName);
	cy.get(pageObj.contact_detail_page_edit_fields.last_name).clear().type(lastName);
	cy.wait(1000);
	cy.get(pageObj.contact_detail_page_edit_fields.update_btn).click();
	cy.wait(2000);
	contactFullName = firstName + " " + lastName;
}

/**
 * function to verify the associate contact with company
 */
export const verifyAssociateContactWithCompany = () => {
	cy.wait(5000);
	cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
	cy.wait(3000);
	searchContact();
	cy.wait(5000);
	cy.get(pageObj.contact_list_page.contact_name).click()
	cy.wait(3000);
	cy.get(pageObj.contact_details_page_elements.three_dot_menu).click();
	cy.wait(1000);
	cy.get(pageObj.contact_detail_page.three_dot_menu_edit_contact_option).click();
	editAssociatedContact();
	cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
	searchCompany();
	cy.get(pageObj.company_list_page.company_name).click({ force: true });
	cy.wait(6000);
	cy.get(pageObj.company_detail_page.contact_association_icon).click();
	cy.get(pageObj.company_detail_page.associated_contact_name).should('have.text', contactFullName);
}

/**
 * function to remove associated Contact with company
 */
export const removeAssociatedContact = () => {
	cy.get(pageObj.company_detail_page.contact_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.associated_contact_name).should('have.text', contactFullName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.contact_more_option_btn).click();
	cy.get(pageObj.company_detail_page.remove_association).click();
	cy.wait(2000);
	cy.get(pageObj.company_detail_page.empty_contact_association_text).should('have.text', 'No Contacts here.');
}

/**
 * function to associate existing Company with contact
 */
export const associateExistingCompanyWithContact = () => {
	cy.get(pageObj.contact_detail_page.company_association_icon).click();
	cy.get(pageObj.contact_detail_page.add_company_association_btn).click();
	cy.get(pageObj.contact_detail_page.existing_company_dropdown).click();
	cy.get(pageObj.contact_detail_page.search_existing_company_field).type(companyName);
	cy.get(pageObj.contact_detail_page.existing_comapny_list).click({multiple:true,force:true});
	cy.get(pageObj.contact_detail_page.company_save_btn).click({ force: true });
    cy.get(pageObj.contact_detail_page.associated_company_name).should('have.text', companyName);
}

/**
 * function to verify the associate company with contact
 */
export const verifyAssociateCompanyWithContact = () => {
	cy.get(pageObj.sidenav_button.company).click({ multiple: true, force: true });
	cy.wait(3000);
	searchCompany();
	cy.wait(5000);
	cy.get(pageObj.company_list_page.company_name).click()
	cy.wait(3000);
	cy.get(pageObj.company_details_page_elements.three_dot_menu).click();
	cy.wait(1000);
	cy.get(pageObj.company_detail_page.three_dot_menu_edit_option).click();
	editCompany();
	cy.get(pageObj.sidenav_button.contact).click({ multiple: true, force: true });
	searchContact();
	cy.get(pageObj.contact_list_page.contact_name).click({ force: true });
	cy.wait(6000);
	cy.get(pageObj.contact_detail_page.company_association_icon).click();
	cy.get(pageObj.contact_detail_page.associated_company_name).should('have.text', companyName);
}

/**
 * function to remove associated Company with contact
 */
export const removeAssociatedCompany = () => {
	cy.get(pageObj.contact_detail_page.company_association_icon).click();
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.associated_company_name).should('have.text', companyName).trigger('mouseover');
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.company_more_option_btn).click();
	cy.get(pageObj.contact_detail_page.remove_association).click();
	cy.wait(2000);
	cy.get(pageObj.contact_detail_page.empty_company_association_text).should('have.text', 'No Companies here.');
}







