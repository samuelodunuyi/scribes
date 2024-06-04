import axios from 'axios'
import config from '../config/index';


const createCompany = axios.create({
    baseURL: `${config.apiurl}/CRM/createCompany`,
    json: true,
    method: 'POST'
})

const createContact = axios.create({
    baseURL: `${config.apiurl}/CRM/createContact`,
    json: true,
    method: 'POST'
})

const createActivity = axios.create({
    baseURL: `${config.apiurl}/CRM/createActivity`,
    json: true,
    method: 'POST'
})

const createActivityType = axios.create({
    baseURL: `${config.apiurl}/CRM/createActivityType`,
    json: true,
    method: 'POST'
})

const createLead = axios.create({
    baseURL: `${config.apiurl}/CRM/createLead`,
    json: true,
    method: 'POST'
})
const createCRMFiles = axios.create({
    baseURL: `${config.apiurl}/CRM/createCRMFile`,
    json: true,
    method: 'POST'
})
export default {
    async getContacts() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getContacts`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getCRMFiles() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getCRMFiles`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getLeads() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getLeads`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getCompanies() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getCompanies`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getActivities() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getActivities`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getActivityTypes() {
        try {
            let response = await fetch(`${config.apiurl}/CRM/getActivityTypes`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createContacts(contactFirstName, contactLastName, companyId, contactTitle, contactAddress, contactCity, contactPostalCode, contactStateId,
        contactCountryId, contactOfficialEmailAddress, contactPersonalEmailAddress, contactPhoneNo, contactDesignation,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, contactOwner, contactPreferenceMethod, contactPreferenceEmail, contactPreferenceFollowEmail, contactPreferenceBulkEmail, contactPreferencePhone, contactPreferenceMail) {
        return createContact({
            data: {
                contactFirstName: contactFirstName,
                contactLastName: contactLastName,
                companyId: companyId,
                contactTitle: contactTitle,
                contactAddress: contactAddress,
                contactCity: contactCity,
                contactPostalCode: contactPostalCode,
                contactStateId: contactStateId,
                contactCountryId: contactCountryId,
                contactOfficialEmailAddress: contactOfficialEmailAddress,
                contactPersonalEmailAddress: contactPersonalEmailAddress,
                contactPhoneNo: contactPhoneNo,
                contactDesignation: contactDesignation,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                contactOwner: contactOwner,
                contactPreferenceMethod: contactPreferenceMethod,
                contactPreferenceEmail: contactPreferenceEmail,
                contactPreferenceFollowEmail: contactPreferenceFollowEmail,
                contactPreferenceBulkEmail: contactPreferenceBulkEmail,
                contactPreferencePhone: contactPreferencePhone,
                contactPreferenceMail: contactPreferenceMail
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async createCompanys(companyName, address, city, postalCode, stateId, countryId, companyEmailAddress, website,
        cacRegistrationNumber, tinNumber, serviceCategoryId, industrySectorId, referredSourceName, leadSourceId,
        primaryContactId, primaryContactFirstName, primaryContactLastName, primaryContactPhoneNo, primaryContactEmailAddress,
        secondaryContactId, secondaryContactFirstName, secondaryContactLastName, secondaryContactPhoneNo, secondaryContactEmailAddress,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, regionCode, ownership, businessDescription) {
        return createCompany({
            data: {
                companyName: companyName,
                address: address,
                city: city,
                postalCode: postalCode,
                stateId: stateId,
                countryId: countryId,
                companyEmailAddress: companyEmailAddress,
                website: website,
                cacRegistrationNumber: cacRegistrationNumber,
                tinNumber: tinNumber,
                serviceCategoryId: serviceCategoryId,
                industrySectorId: industrySectorId,
                referredSourceName: referredSourceName,
                leadSourceId: leadSourceId,
                primaryContactId: primaryContactId,
                primaryContactFirstName: primaryContactFirstName,
                primaryContactLastName: primaryContactLastName,
                primaryContactPhoneNo: primaryContactPhoneNo,
                primaryContactEmailAddress: primaryContactEmailAddress,
                secondaryContactId: secondaryContactId,
                secondaryContactFirstName: secondaryContactFirstName,
                secondaryContactLastName: secondaryContactLastName,
                secondaryContactPhoneNo: secondaryContactPhoneNo,
                secondaryContactEmailAddress: secondaryContactEmailAddress,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                regionCode: regionCode,
                ownership: ownership,
                businessDescription: businessDescription
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createCRMFile(linkRecordType, linkRecordId, fileUrl, fileDescription, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
        return createCRMFiles({
            data: {
                linkRecordType: linkRecordType,
                linkRecordId: linkRecordId,
                fileUrl: fileUrl,
                fileDescription: fileDescription,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async createLeads(companyId, companyDescription, primaryContactId, primaryContactFirstName, primaryContactLastName,
        primaryContactPhoneNo, primaryContactEmailAddress, secondaryContactId, secondaryContactFirstName, secondaryContactLastName,
        secondaryContactPhoneNo, secondaryContactEmailAddress, leadTopic, leadIndustrySectorId, productId, leadSourceId, leadRating, leadStatus,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, originator, leadTransactor, coTransactor, transactorLegal,
        administrator, leadProjectDescription, leadProjectStatusComment, leadProjectNextStepActionPlan, projectPreparatorySupportRequired,
        projectPreparatorySupportDetails, useOfProceeds, leadIssuesAndChallenges, leadProjectType, leadProjectStage, leadCategorization,
        totalProjectSize_Indicative, debtSize_Indicative, initialContactDate, lastContactDate, companyAnniversaryDate, initialInfo_PIC, leadFactSheet, mandatedLead, ndaRequired, ndaSent, ndaExecuted, piC_PIDSent, piC_PIDExecuted, grlSent,
        grlExecuted, projectViability, commenceInitialKYC_IDD, eS_AssessmentCommmenced, assessmentOutcomeUpdated, mrocApproval, draftNBCPaperSent,
        draftMandateLetterSent, mandateSigned, nbcApproved, nbcNumber, natureOfLastInteraction, financialYearName) {
        return createLead({
            data: {
                companyId: companyId,
                companyDescription: companyDescription,
                primaryContactId: primaryContactId,
                primaryContactFirstName: primaryContactFirstName,
                primaryContactLastName: primaryContactLastName,
                primaryContactPhoneNo: primaryContactPhoneNo,
                primaryContactEmailAddress: primaryContactEmailAddress,
                secondaryContactId: secondaryContactId,
                secondaryContactFirstName: secondaryContactFirstName,
                secondaryContactLastName: secondaryContactLastName,
                secondaryContactPhoneNo: secondaryContactPhoneNo,
                secondaryContactEmailAddress: secondaryContactEmailAddress,
                leadTopic: leadTopic,
                leadIndustrySectorId: leadIndustrySectorId,
                productId: productId,
                leadSourceId: leadSourceId,
                leadRating: leadRating,
                leadStatus: leadStatus,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                originator: originator,
                leadTransactor: leadTransactor,
                coTransactor: coTransactor,
                transactorLegal: transactorLegal,
                administrator: administrator,
                leadProjectDescription: leadProjectDescription,
                leadProjectStatusComment: leadProjectStatusComment,
                leadProjectNextStepActionPlan: leadProjectNextStepActionPlan,
                projectPreparatorySupportRequired: projectPreparatorySupportRequired,
                projectPreparatorySupportDetails: projectPreparatorySupportDetails,
                useOfProceeds: useOfProceeds,
                leadIssuesAndChallenges: leadIssuesAndChallenges,
                leadProjectType: leadProjectType,
                leadProjectStage: leadProjectStage,
                leadCategorization: leadCategorization,
                totalProjectSize_Indicative: totalProjectSize_Indicative,
                debtSize_Indicative: debtSize_Indicative,
                initialContactDate: initialContactDate,
                lastContactDate: lastContactDate,
                natureOfLastInteraction: natureOfLastInteraction,
                companyAnniversaryDate: companyAnniversaryDate,
                initialInfo_PIC: initialInfo_PIC,
                leadFactSheet: leadFactSheet,
                mandatedLead: mandatedLead,
                ndaRequired: ndaRequired,
                ndaSent: ndaSent,
                ndaExecuted: ndaExecuted,
                piC_PIDSent: piC_PIDSent,
                piC_PIDExecuted: piC_PIDExecuted,
                grlSent: grlSent,
                grlExecuted: grlExecuted,
                projectViability: projectViability,
                commenceInitialKYC_IDD: commenceInitialKYC_IDD,
                eS_AssessmentCommmenced: eS_AssessmentCommmenced,
                assessmentOutcomeUpdated: assessmentOutcomeUpdated,
                mrocApproval: mrocApproval,
                draftNBCPaperSent: draftNBCPaperSent,
                draftMandateLetterSent: draftMandateLetterSent,
                nbcApproved: nbcApproved,
                nbcNumber: nbcNumber,
                mandateSigned: mandateSigned,
                financialYearName:financialYearName
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async createActivitys(activityTypeId, activitySubject, companyId, contactId, regardingEntity, regardingRecordId, description,
        notes, activityStatus, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner) {
            console.log(notes)
        return createActivity({
            data: {
                activityTypeId: activityTypeId,
                activitySubject: activitySubject,
                companyId: companyId,
                contactId: contactId,
                regardingEntity: regardingEntity,
                regardingRecordId: regardingRecordId,
                description: description,
                notes: notes,
                activityStatus: activityStatus,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async createActivityTypes(name, createdBy, createdDate) {
        return createActivityType({
            data: {
                name: name,
                createdBy: createdBy,
                lastModifiedBy: createdBy,
                createdDate: createdDate,
                lastModifiedDate: createdDate,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async deleteCompany(id) {
        try {
            await fetch(`${config.apiurl}/CRM/deleteCompany/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },

    async deleteCRMFile(id) {
        try {
            let response = await fetch(`${config.apiurl}/CRM/deleteCRMFile/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteContact(id) {
        try {
            let response = await fetch(`${config.apiurl}/CRM/deleteContact/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteLead(id) {
        try {
            let response = await fetch(`${config.apiurl}/CRM/deleteLead/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteActivity(id) {
        try {
            let response = await fetch(`${config.apiurl}/CRM/deleteActivity/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteActivityType(id) {
        try {
            let response = await fetch(`${config.apiurl}/CRM/deleteActivityType/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async editCompany(companyId, companyName, address, city, postalCode, stateId, countryId, companyEmailAddress, website,
        cacRegistrationNumber, tinNumber, serviceCategoryId, industrySectorId, referredSourceName, leadSourceId,
        primaryContactId, primaryContactFirstName, primaryContactLastName, primaryContactPhoneNo, primaryContactEmailAddress,
        secondaryContactId, secondaryContactFirstName, secondaryContactLastName, secondaryContactPhoneNo, secondaryContactEmailAddress,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, regionCode, ownership, businessDescription) {
            const response = await fetch(`${config.apiurl}/CRM/editCompany`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyId: companyId,
                companyName: companyName,
                address: address,
                city: city,
                postalCode: postalCode,
                stateId: stateId,
                countryId: countryId,
                companyEmailAddress: companyEmailAddress,
                website: website,
                cacRegistrationNumber: cacRegistrationNumber,
                tinNumber: tinNumber,
                serviceCategoryId: serviceCategoryId,
                industrySectorId: industrySectorId,
                referredSourceName: referredSourceName,
                leadSourceId: leadSourceId,
                primaryContactId: primaryContactId,
                primaryContactFirstName: primaryContactFirstName,
                primaryContactLastName: primaryContactLastName,
                primaryContactPhoneNo: primaryContactPhoneNo,
                primaryContactEmailAddress: primaryContactEmailAddress,
                secondaryContactId: secondaryContactId,
                secondaryContactFirstName: secondaryContactFirstName,
                secondaryContactLastName: secondaryContactLastName,
                secondaryContactPhoneNo: secondaryContactPhoneNo,
                secondaryContactEmailAddress: secondaryContactEmailAddress,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                regionCode: regionCode,
                ownership: ownership,
                businessDescription: businessDescription
            })
        })
        const data = response.status;
        return data
    },
    async editContact(contactId, contactFirstName, contactLastName, companyId, contactTitle, contactAddress, contactCity, contactPostalCode, contactStateId,
        contactCountryId, contactOfficialEmailAddress, contactPersonalEmailAddress, contactPhoneNo, contactDesignation,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, contactOwner, contactPreferenceMethod) {
        const response = await fetch(`${config.apiurl}/CRM/editContact`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contactId: contactId,
                contactFirstName: contactFirstName,
                contactLastName: contactLastName,
                companyId: companyId,
                contactTitle: contactTitle,
                contactAddress: contactAddress,
                contactCity: contactCity,
                contactPostalCode: contactPostalCode,
                contactStateId: contactStateId,
                contactCountryId: contactCountryId,
                contactOfficialEmailAddress: contactOfficialEmailAddress,
                contactPersonalEmailAddress: contactPersonalEmailAddress,
                contactPhoneNo: contactPhoneNo,
                contactDesignation: contactDesignation,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                contactOwner: contactOwner,
                contactPreferenceMethod: contactPreferenceMethod,
            })
        })
        const data = response.status;
        return data
    },
    async editCRMFile(id, linkRecordType, linkRecordId, fileUrl, fileDescription, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
        const response = await fetch(`${config.apiurl}/CRM/editContact`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                linkRecordType: linkRecordType,
                linkRecordId: linkRecordId,
                fileUrl: fileUrl,
                fileDescription: fileDescription,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },
    async editLead(leadId, companyId, companyDescription, primaryContactId, primaryContactFirstName, primaryContactLastName,
        primaryContactPhoneNo, primaryContactEmailAddress, secondaryContactId, secondaryContactFirstName, secondaryContactLastName,
        secondaryContactPhoneNo, secondaryContactEmailAddress, leadTopic, leadIndustrySectorId, productId, leadSourceId, leadRating, leadStatus,
        createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, originator, leadTransactor, coTransactor, transactorLegal,
        administrator, leadProjectDescription, leadProjectStatusComment, leadProjectNextStepActionPlan, projectPreparatorySupportRequired,
        projectPreparatorySupportDetails, useOfProceeds, leadIssuesAndChallenges, leadProjectType, leadProjectStage, leadCategorization,
        totalProjectSize_Indicative, debtSize_Indicative, initialContactDate, lastContactDate, companyAnniversaryDate, initialInfo_PIC, leadFactSheet, mandatedLead, ndaRequired, ndaSent, ndaExecuted, piC_PIDSent, piC_PIDExecuted, grlSent,
        grlExecuted, projectViability, commenceInitialKYC_IDD, eS_AssessmentCommmenced, assessmentOutcomeUpdated, mrocApproval, draftNBCPaperSent,
        draftMandateLetterSent, mandateSigned, nbcApproved, nbcNumber, natureOfLastInteraction, financialYearName) {
            const response = await fetch(`${config.apiurl}/crm/editlead`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                leadId: leadId,
                companyId: companyId,
                companyDescription: companyDescription,
                primaryContactId: primaryContactId,
                primaryContactFirstName: primaryContactFirstName,
                primaryContactLastName: primaryContactLastName,
                primaryContactPhoneNo: primaryContactPhoneNo,
                primaryContactEmailAddress: primaryContactEmailAddress,
                secondaryContactId: secondaryContactId,
                secondaryContactFirstName: secondaryContactFirstName,
                secondaryContactLastName: secondaryContactLastName,
                secondaryContactPhoneNo: secondaryContactPhoneNo,
                secondaryContactEmailAddress: secondaryContactEmailAddress,
                leadTopic: leadTopic,
                leadIndustrySectorId: leadIndustrySectorId,
                productId: productId,
                leadSourceId: leadSourceId,
                leadRating: leadRating,
                leadStatus: leadStatus,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                originator: originator,
                leadTransactor: leadTransactor,
                coTransactor: coTransactor,
                transactorLegal: transactorLegal,
                administrator: administrator,
                leadProjectDescription: leadProjectDescription,
                leadProjectStatusComment: leadProjectStatusComment,
                leadProjectNextStepActionPlan: leadProjectNextStepActionPlan,
                projectPreparatorySupportRequired: projectPreparatorySupportRequired,
                projectPreparatorySupportDetails: projectPreparatorySupportDetails,
                useOfProceeds: useOfProceeds,
                leadIssuesAndChallenges: leadIssuesAndChallenges,
                leadProjectType: leadProjectType,
                leadProjectStage: leadProjectStage,
                leadCategorization: leadCategorization,
                totalProjectSize_Indicative: totalProjectSize_Indicative,
                debtSize_Indicative: debtSize_Indicative,
                initialContactDate: initialContactDate,
                lastContactDate: lastContactDate,
                companyAnniversaryDate: companyAnniversaryDate,
                initialInfo_PIC: initialInfo_PIC,
                leadFactSheet: leadFactSheet,
                mandatedLead: mandatedLead,
                ndaRequired: ndaRequired,
                ndaSent: ndaSent,
                ndaExecuted: ndaExecuted,
                piC_PIDSent: piC_PIDSent,
                piC_PIDExecuted: piC_PIDExecuted,
                grlSent: grlSent,
                grlExecuted: grlExecuted,
                projectViability: projectViability,
                commenceInitialKYC_IDD: commenceInitialKYC_IDD,
                eS_AssessmentCommmenced: eS_AssessmentCommmenced,
                assessmentOutcomeUpdated: assessmentOutcomeUpdated,
                mrocApproval: mrocApproval,
                draftNBCPaperSent: draftNBCPaperSent,
                draftMandateLetterSent: draftMandateLetterSent,
                mandateSigned: mandateSigned,
                nbcApproved: nbcApproved,
                nbcNumber: nbcNumber,
                natureOfLastInteraction: natureOfLastInteraction,
                financialYearName: financialYearName
            })
        })
        const data = response.status;
        return data
    },
    async editActivity(activityId, activityTypeId, activitySubject, companyId, contactId, regardingEntity, regardingRecordId, description,
        notes, activityStatus, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner) {
            const response = await fetch(`${config.apiurl}/CRM/editActivity`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ActivityId: activityId,
                activityTypeId: activityTypeId,
                activitySubject: activitySubject,
                companyId: companyId,
                contactId: contactId,
                regardingEntity: regardingEntity,
                regardingRecordId: regardingRecordId,
                description: description,
                notes: notes,
                activityStatus: activityStatus,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner
            })
        })
        const data = response.status;
        return data
    },

    async editActivityType(id, names, createdBy) {
            const response = await fetch(`${config.apiurl}/CRM/editActivityType`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: names,
                createdBy: createdBy,
                lastModifiedBy: createdBy
            })
        })
        const data = response.status;
        return data
    },
}