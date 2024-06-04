import axios from 'axios'
import config from '../config/index';


const createGrants = axios.create({
    baseURL: `${config.apiurl2}/grants`,
    json: true,
    method: 'POST'
})


const createProject = axios.create({
    baseURL: `${config.apiurl2}/projects`,
    json: true,
    method: 'POST'
})

export default {
    async getGrants() {
        try {
            let response = await fetch(`${config.apiurl2}/grants`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getProjects() {
        try {
            let response = await fetch(`${config.apiurl2}/projects`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createGrant(development_partner_name, client_name,transaction_name, currency, grant_type, total_grant_amount, total_grant_used, total_grant_left, purpose_of_grant) {
        return createGrants({
            data: {
                development_partner: development_partner_name,
                client_name: client_name,
                transaction_name: transaction_name,
                currency: currency,
                grant_type: grant_type,
                total_grant_amount: total_grant_amount,
                total_grant_used: total_grant_used,
                total_grant_left: total_grant_left,
                purpose_of_grant: purpose_of_grant
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async deleteDeal(id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDeal/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },

    
    async createProjects(project_name, client_name, transaction_name, industry, sector, status, mandated_deal_size, initial_deal_size, 
        transaction_lead, transaction_analyst, credit_commitee_approval, fee_letter_date, expected_closing_date, transaction_stage,
        start_date, expected_end_date, actual_end_date, days_left, NBC_document, issues, SFU_first_installment_amount, SFU_second_installment_amount, 
        DDW_preliminary_legal_DD_consultant, DDW_preliminary_legal_DD_amount, DDW_preliminary_legal_DD_status, DDW_preliminary_legal_DD_start_date,
        DDW_preliminary_legal_DD_expected_end_date, DDW_preliminary_legal_DD_actual_end_date, DDW_preliminary_legal_DD_days_left, DDW_preliminary_legal_DD_issues, 
        DDW_preliminary_E_and_S_consultant, DDW_preliminary_E_and_S_amount,DDW_preliminary_E_and_S_status, DDW_preliminary_E_and_S_start_date, 
        DDW_preliminary_E_and_S_expected_end_date, DDW_preliminary_E_and_S_actual_end_date, DDW_preliminary_E_and_S_days_left, DDW_preliminary_E_and_S_issues,
        DDW_tech_and_com_consultant, DDW_tech_and_com_amount,DDW_tech_and_com_status,DDW_tech_and_com_start_date, DDW_tech_and_com_expected_end_date,
        DDW_tech_and_com_actual_end_date,DDW_tech_and_com_days_left,DDW_tech_and_com_issues,DDW_embedded_advisor_consultant, DDW_embedded_advisor_amount,
        DDW_embedded_advisor_status,DDW_embedded_advisor_start_date,DDW_embedded_advisor_expected_end_date,DDW_embedded_advisor_actual_end_date,DDW_embedded_advisor_days_left,
        DDW_embedded_advisor_issues,CAS_status_financial_model,CAS_status_risk_rating,CAS_status_TA_funding_required,CAS_status_credit_paper,
        CAS_status_credit_paper_start_date,CAS_status_credit_paper_expected_end_date,CAS_status_credit_paper_actual_end_date,CAS_status_credit_paper_days_left,
        CAS_status_credit_paper_issues,CAS_status_fee_letter,CAS_status_fee_letter_start_date,CAS_status_fee_letter_expected_end_date,CAS_status_fee_letter_actual_end_date,
        CAS_status_fee_letter_days_left,CAS_status_fee_letter_issues,key_issues,status_update,next_steps,last_modified_by,modification_date) {
        return createProject({
            data: {
                project_name: project_name,
                client_name: client_name,
                transaction_name: transaction_name,
                industry: industry,
                sector: sector,
                status: status,
                mandated_deal_size: mandated_deal_size,
                initial_deal_size: initial_deal_size,
                transaction_lead: transaction_lead,
                transaction_analyst: transaction_analyst,
                credit_commitee_approval: credit_commitee_approval,
                fee_letter_date: fee_letter_date,
                expected_closing_date: expected_closing_date,
                transaction_stage: transaction_stage,
                start_date: start_date,
                expected_end_date: expected_end_date,
                actual_end_date: actual_end_date,
                days_left: days_left,
                NBC_document:  NBC_document,
                issues: issues,
                SFU_first_installment_amount: SFU_first_installment_amount,
                SFU_second_installment_amount: SFU_second_installment_amount,
                DDW_preliminary_legal_DD_consultant: DDW_preliminary_legal_DD_consultant,
                DDW_preliminary_legal_DD_amount: DDW_preliminary_legal_DD_amount,
                DDW_preliminary_legal_DD_status: DDW_preliminary_legal_DD_status,
                DDW_preliminary_legal_DD_start_date: DDW_preliminary_legal_DD_start_date,
                DDW_preliminary_legal_DD_expected_end_date: DDW_preliminary_legal_DD_expected_end_date,
                DDW_preliminary_legal_DD_actual_end_date: DDW_preliminary_legal_DD_actual_end_date,
                DDW_preliminary_legal_DD_days_left: DDW_preliminary_legal_DD_days_left,
                DDW_preliminary_legal_DD_issues: DDW_preliminary_legal_DD_issues,
                DDW_preliminary_E_and_S_consultant: DDW_preliminary_E_and_S_consultant,
                DDW_preliminary_E_and_S_amount: DDW_preliminary_E_and_S_amount,
                DDW_preliminary_E_and_S_status: DDW_preliminary_E_and_S_status,
                DDW_preliminary_E_and_S_start_date: DDW_preliminary_E_and_S_start_date,
                DDW_preliminary_E_and_S_expected_end_date: DDW_preliminary_E_and_S_expected_end_date,
                DDW_preliminary_E_and_S_actual_end_date: DDW_preliminary_E_and_S_actual_end_date,
                DDW_preliminary_E_and_S_days_left: DDW_preliminary_E_and_S_days_left,
                DDW_preliminary_E_and_S_issues: DDW_preliminary_E_and_S_issues,
                DDW_tech_and_com_consultant: DDW_tech_and_com_consultant,
                DDW_tech_and_com_amount: DDW_tech_and_com_amount,
                DDW_tech_and_com_status: DDW_tech_and_com_status,
                DDW_tech_and_com_start_date: DDW_tech_and_com_start_date,
                DDW_tech_and_com_expected_end_date: DDW_tech_and_com_expected_end_date,
                DDW_tech_and_com_actual_end_date: DDW_tech_and_com_actual_end_date,
                DDW_tech_and_com_days_left: DDW_tech_and_com_days_left,
                DDW_tech_and_com_issues: DDW_tech_and_com_issues,
                DDW_embedded_advisor_consultant: DDW_embedded_advisor_consultant,
                DDW_embedded_advisor_amount: DDW_embedded_advisor_amount,
                DDW_embedded_advisor_status: DDW_embedded_advisor_status,
                DDW_embedded_advisor_start_date: DDW_embedded_advisor_start_date,
                DDW_embedded_advisor_expected_end_date: DDW_embedded_advisor_expected_end_date,
                DDW_embedded_advisor_actual_end_date: DDW_embedded_advisor_actual_end_date,
                DDW_embedded_advisor_days_left: DDW_embedded_advisor_days_left,
                DDW_embedded_advisor_issues: DDW_embedded_advisor_issues,
                CAS_status_financial_model: CAS_status_financial_model,
                CAS_status_risk_rating: CAS_status_risk_rating,
                CAS_status_TA_funding_required: CAS_status_TA_funding_required,
                CAS_status_credit_paper: CAS_status_credit_paper,
                CAS_status_credit_paper_start_date: CAS_status_credit_paper_start_date,
                CAS_status_credit_paper_expected_end_date: CAS_status_credit_paper_expected_end_date,
                CAS_status_credit_paper_actual_end_date: CAS_status_credit_paper_actual_end_date,
                CAS_status_credit_paper_days_left: CAS_status_credit_paper_days_left,
                CAS_status_credit_paper_issues: CAS_status_credit_paper_issues,
                CAS_status_fee_letter: CAS_status_fee_letter,
                CAS_status_fee_letter_start_date: CAS_status_fee_letter_start_date,
                CAS_status_fee_letter_expected_end_date: CAS_status_fee_letter_expected_end_date,
                CAS_status_fee_letter_actual_end_date: CAS_status_fee_letter_actual_end_date,
                CAS_status_fee_letter_days_left: CAS_status_fee_letter_days_left,
                CAS_status_fee_letter_issues: CAS_status_fee_letter_issues,
                key_issues: key_issues,
                status_update: status_update,
                next_steps: next_steps,
                last_modified_by: last_modified_by,
                modification_date: modification_date
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async deleteDeal(id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDeal/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },

    async editGrant(grant_uuid, development_partner_name, client_name,transaction_name, currency, grant_type, total_grant_amount, total_grant_used, total_grant_left, purpose_of_grant) {
        const response = await fetch(`${config.apiurl2}/grants`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: grant_uuid,
                development_partner: development_partner_name,
                client_name: client_name,
                transaction_name: transaction_name,
                currency: currency,
                grant_type: grant_type,
                total_grant_amount: total_grant_amount,
                total_grant_used: total_grant_used,
                total_grant_left: total_grant_left,
                purpose_of_grant: purpose_of_grant
            })
        })
        const data = response.status;
        return data
    },

    async editProjects(UUIDField, project_name, client_name, transaction_name, industry, sector, status, mandated_deal_size, initial_deal_size, 
        transaction_lead, transaction_analyst, credit_commitee_approval, fee_letter_date, expected_closing_date, transaction_stage,
        start_date, expected_end_date, actual_end_date, days_left, NBC_document, issues, SFU_first_installment_amount, SFU_second_installment_amount, 
        DDW_preliminary_legal_DD_consultant, DDW_preliminary_legal_DD_amount, DDW_preliminary_legal_DD_status, DDW_preliminary_legal_DD_start_date,
        DDW_preliminary_legal_DD_expected_end_date, DDW_preliminary_legal_DD_actual_end_date, DDW_preliminary_legal_DD_days_left, DDW_preliminary_legal_DD_issues, 
        DDW_preliminary_E_and_S_consultant, DDW_preliminary_E_and_S_amount,DDW_preliminary_E_and_S_status, DDW_preliminary_E_and_S_start_date, 
        DDW_preliminary_E_and_S_expected_end_date, DDW_preliminary_E_and_S_actual_end_date, DDW_preliminary_E_and_S_days_left, DDW_preliminary_E_and_S_issues,
        DDW_tech_and_com_consultant, DDW_tech_and_com_amount,DDW_tech_and_com_status,DDW_tech_and_com_start_date, DDW_tech_and_com_expected_end_date,
        DDW_tech_and_com_actual_end_date,DDW_tech_and_com_days_left,DDW_tech_and_com_issues,DDW_embedded_advisor_consultant, DDW_embedded_advisor_amount,
        DDW_embedded_advisor_status,DDW_embedded_advisor_start_date,DDW_embedded_advisor_expected_end_date,DDW_embedded_advisor_actual_end_date,DDW_embedded_advisor_days_left,
        DDW_embedded_advisor_issues,CAS_status_financial_model,CAS_status_risk_rating,CAS_status_TA_funding_required,CAS_status_credit_paper,
        CAS_status_credit_paper_start_date,CAS_status_credit_paper_expected_end_date,CAS_status_credit_paper_actual_end_date,CAS_status_credit_paper_days_left,
        CAS_status_credit_paper_issues,CAS_status_fee_letter,CAS_status_fee_letter_start_date,CAS_status_fee_letter_expected_end_date,CAS_status_fee_letter_actual_end_date,
        CAS_status_fee_letter_days_left,CAS_status_fee_letter_issues,key_issues,status_update,next_steps,last_modified_by,modification_date) {
        const response = await fetch(`${config.apiurl2}/projects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: UUIDField,
                project_name: project_name,
                client_name: client_name,
                transaction_name: transaction_name,
                industry: industry,
                sector: sector,
                status: status,
                mandated_deal_size: mandated_deal_size,
                initial_deal_size: initial_deal_size,
                transaction_lead: transaction_lead,
                transaction_analyst: transaction_analyst,
                credit_commitee_approval: credit_commitee_approval,
                fee_letter_date: fee_letter_date,
                expected_closing_date: expected_closing_date,
                transaction_stage: transaction_stage,
                start_date: start_date,
                expected_end_date: expected_end_date,
                actual_end_date: actual_end_date,
                days_left: days_left,
                NBC_document:  NBC_document,
                issues: issues,
                SFU_first_installment_amount: SFU_first_installment_amount,
                SFU_second_installment_amount: SFU_second_installment_amount,
                DDW_preliminary_legal_DD_consultant: DDW_preliminary_legal_DD_consultant,
                DDW_preliminary_legal_DD_amount: DDW_preliminary_legal_DD_amount,
                DDW_preliminary_legal_DD_status: DDW_preliminary_legal_DD_status,
                DDW_preliminary_legal_DD_start_date: DDW_preliminary_legal_DD_start_date,
                DDW_preliminary_legal_DD_expected_end_date: DDW_preliminary_legal_DD_expected_end_date,
                DDW_preliminary_legal_DD_actual_end_date: DDW_preliminary_legal_DD_actual_end_date,
                DDW_preliminary_legal_DD_days_left: DDW_preliminary_legal_DD_days_left,
                DDW_preliminary_legal_DD_issues: DDW_preliminary_legal_DD_issues,
                DDW_preliminary_E_and_S_consultant: DDW_preliminary_E_and_S_consultant,
                DDW_preliminary_E_and_S_amount: DDW_preliminary_E_and_S_amount,
                DDW_preliminary_E_and_S_status: DDW_preliminary_E_and_S_status,
                DDW_preliminary_E_and_S_start_date: DDW_preliminary_E_and_S_start_date,
                DDW_preliminary_E_and_S_expected_end_date: DDW_preliminary_E_and_S_expected_end_date,
                DDW_preliminary_E_and_S_actual_end_date: DDW_preliminary_E_and_S_actual_end_date,
                DDW_preliminary_E_and_S_days_left: DDW_preliminary_E_and_S_days_left,
                DDW_preliminary_E_and_S_issues: DDW_preliminary_E_and_S_issues,
                DDW_tech_and_com_consultant: DDW_tech_and_com_consultant,
                DDW_tech_and_com_amount: DDW_tech_and_com_amount,
                DDW_tech_and_com_status: DDW_tech_and_com_status,
                DDW_tech_and_com_start_date: DDW_tech_and_com_start_date,
                DDW_tech_and_com_expected_end_date: DDW_tech_and_com_expected_end_date,
                DDW_tech_and_com_actual_end_date: DDW_tech_and_com_actual_end_date,
                DDW_tech_and_com_days_left: DDW_tech_and_com_days_left,
                DDW_tech_and_com_issues: DDW_tech_and_com_issues,
                DDW_embedded_advisor_consultant: DDW_embedded_advisor_consultant,
                DDW_embedded_advisor_amount: DDW_embedded_advisor_amount,
                DDW_embedded_advisor_status: DDW_embedded_advisor_status,
                DDW_embedded_advisor_start_date: DDW_embedded_advisor_start_date,
                DDW_embedded_advisor_expected_end_date: DDW_embedded_advisor_expected_end_date,
                DDW_embedded_advisor_actual_end_date: DDW_embedded_advisor_actual_end_date,
                DDW_embedded_advisor_days_left: DDW_embedded_advisor_days_left,
                DDW_embedded_advisor_issues: DDW_embedded_advisor_issues,
                CAS_status_financial_model: CAS_status_financial_model,
                CAS_status_risk_rating: CAS_status_risk_rating,
                CAS_status_TA_funding_required: CAS_status_TA_funding_required,
                CAS_status_credit_paper: CAS_status_credit_paper,
                CAS_status_credit_paper_start_date: CAS_status_credit_paper_start_date,
                CAS_status_credit_paper_expected_end_date: CAS_status_credit_paper_expected_end_date,
                CAS_status_credit_paper_actual_end_date: CAS_status_credit_paper_actual_end_date,
                CAS_status_credit_paper_days_left: CAS_status_credit_paper_days_left,
                CAS_status_credit_paper_issues: CAS_status_credit_paper_issues,
                CAS_status_fee_letter: CAS_status_fee_letter,
                CAS_status_fee_letter_start_date: CAS_status_fee_letter_start_date,
                CAS_status_fee_letter_expected_end_date: CAS_status_fee_letter_expected_end_date,
                CAS_status_fee_letter_actual_end_date: CAS_status_fee_letter_actual_end_date,
                CAS_status_fee_letter_days_left: CAS_status_fee_letter_days_left,
                CAS_status_fee_letter_issues: CAS_status_fee_letter_issues,
                key_issues: key_issues,
                status_update: status_update,
                next_steps: next_steps,
                last_modified_by: last_modified_by,
                modification_date: modification_date
            })
        })
        const data = response.status;
        return data
    },


    async deleteDealsKeyDealFactors(dealId, id) {
        try {
            await fetch(`${config.apiurl2}/grants`, {
                method: 'DELETE'
            }).then(req => {
                console.log(req.status)
                return req.status
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },



}