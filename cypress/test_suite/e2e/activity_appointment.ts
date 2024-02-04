/// <reference types="cypress" />
import * as pageObj from '../../page_objects/crm.po.json';
import * as common from '../../../common';
import { CYPRESS_WEB_BASE_URL } from '../../../environment.json';
import '../../support/commands';

describe('activity Creation', () => {
	beforeEach(() => {
		cy.visit(CYPRESS_WEB_BASE_URL);
		cy.login();
		cy.wait(2000);
	});

	// Appointment creation
	it('create appointment', () => {
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		})
		cy.wait(3000);
		cy.get(pageObj.contact_list_page.add_Contact_btn).click();
		common.createContact();
		let updatedFirstName = common.firstName;
		cy.get(pageObj.add_contact_fields.create_contact_btn).click();
		cy.wait(3000);
		cy.get(pageObj.sidenav_button.activity).click({
			multiple: true, force: true
		});
		cy.wait(2000);
		cy.get(pageObj.activity_page.activity_btn_dropdown).click();
		cy.get(pageObj.activity_page.appointment_btn).click();
		cy.wait(5000);
		// Text label and button validation in Add Appointment drawer
		cy.get(pageObj.create_appointment_drawer.appointment_drawer_header_text).should('have.text', 'Add Appointment');
		cy.get(pageObj.create_appointment_drawer.appointment_title_label).should('have.text', "Appointment Title *");
		cy.get(pageObj.create_appointment_drawer.meeting_date_label).should('have.text', 'Meeting Date *');
		cy.get(pageObj.create_appointment_drawer.time_label).should('have.text', 'Time *');
		cy.get(pageObj.create_appointment_drawer.timezone_label).should('have.text', 'Timezone *');
		cy.get(pageObj.create_appointment_drawer.guest_label).should('have.text', 'Guest *');
		cy.get(pageObj.create_appointment_drawer.description_label).should('have.text', 'Description *');
		cy.get(pageObj.create_appointment_drawer.more_detail_label).should('have.text', 'More Details');
		cy.get(pageObj.create_appointment_drawer.assign_to_label).should('have.text', 'Assign To *');
		cy.get(pageObj.create_appointment_drawer.associate_with_label).should('have.text', 'Associate With *');
		cy.get(pageObj.create_appointment_drawer.save_appointment_btn).should('have.text', 'Save Appointment');
		cy.get(pageObj.create_appointment_drawer.cancel_btn).should('have.text', 'Cancel');
		//Appointment Creation
		common.createAppointment();
		// Validate the appointment in the list page by searching
		common.validateCreatedAppointmentInListpage();
		// Validate the appointment in details page
		common.validateCreatedAppointmentInDetailspage();
	});

	it('Edit an Appointment', () => {
		cy.get(pageObj.sidenav_button.contact).click({
			multiple: true, force: true
		})
		cy.wait(3000);
		cy.get(pageObj.contact_list_page.add_Contact_btn).click();
		common.createContact();
		cy.get(pageObj.add_contact_fields.create_contact_btn).click();
		cy.wait(3000);
		cy.get(pageObj.sidenav_button.activity).click({
			multiple: true, force: true
		});
		cy.wait(3000);
		cy.get('.d-flex.justify-content.align-items-center.pl-3.p-0 > div:nth-child(5) > button').click();
		// Edit appointment
		common.searchAppointment();
		common.editAppointment();
		// Validate the appointment in the list page by searching
		common.validateEditedAppointmentInListpage();
		// Validate the appointment in details page
		common.validateEditedAppointmentInDetailspage();
	});

	it('Delete an Appointment', () => {
		cy.get(pageObj.sidenav_button.activity).click({
			multiple: true, force: true
		});
		cy.wait(3000);
		//Delete appointment
		cy.get('.d-flex.justify-content.align-items-center.pl-3.p-0 > div:nth-child(5) > button').click();
		common.deleteAppointment();
		cy.wait(5000);
		common.searchAppointment();
		cy.get('div.activity-list-empty.d-flex.flex-column.align-items-center.justify-content-center > h5').should('be.visible');
	});
});
