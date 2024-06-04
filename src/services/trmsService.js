import axios from 'axios'
import config from '../config/index';


const createDeal = axios.create({
    baseURL: `${config.apiurl}/Trms/createDeal`,
    json: true,
    method: 'POST'
})
const createDealNBCArea = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsNBCFocusAreas`,
    json: true,
    method: 'POST'
})
const createDealsKeyDealFactor = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsKeyDealFactors`,
    json: true,
    method: 'POST'
})
const createDealsOtherFocusAreas = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsOtherFocusAreas`,
    json: true,
    method: 'POST'
})
const createDealsClientContacts = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsClientContacts`,
    json: true,
    method: 'POST'
})
const createDealsCreditCommitteeFocusArea = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsCreditCommitteeFocusAreas`,
    json: true,
    method: 'POST'
})
const createDealsOtherPrecedentCondition = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsOtherPrecedentConditions`,
    json: true,
    method: 'POST'
})
const createDealsPerformanceLinkedIndicator = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsPerformanceLinkedIndicators`,
    json: true,
    method: 'POST'
})
const createDealTransactionParty = axios.create({
    baseURL: `${config.apiurl}/Trms/createDealsTransactionParties`,
    json: true,
    method: 'POST'
})
export default {
    async getDeals() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDeals`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsNBCFocusAreas() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsNBCFocusAreas`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsAuditLog() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsAuditLog`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getLeadsAuditLog() {
        try {
            let response = await fetch(`${config.apiurl}/crm/getLeadsAuditLog`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsNBCFocusAreasByDealID(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsNBCFocusAreasByDealID/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createNBCFocusArea(dealId, original, concerns, date, methodology, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealNBCArea({
            data: {
                dealId: dealId,
                original: original,
                concerns: concerns,
                date: date,
                methodology: methodology,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsNBCFocusAreas(dealId, id, original, concerns, date, methodology, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsNBCFocusAreas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                original: original,
                concerns: concerns,
                date: date,
                methodology: methodology,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsNBCFocusAreas(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsNBCFocusAreas/${dealId}/${id}`, {
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

    async createDeals(leadId, companyId, companyDescription, originator, leadTransactor, coTransactor, transactorLegal, administrator, createdBy,
        lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode,
        dealSize, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle, mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate,
        actualCloseDate, nbcApprovalDate, nbcSubmissionDate, ccSubmissionDate, transactionName, dealStatus, sharePointFileLink, amountInMN, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMN, DealCategory, financialYearName,
        ) {
            return createDeal({
            data: {
                leadId: leadId,
                companyId: companyId,
                companyDescription: companyDescription,
                originator: originator,
                leadTransactor: leadTransactor,
                coTransactor: coTransactor,
                transactorLegal: transactorLegal,
                administrator: administrator,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                transactionPhase: transactionPhase,
                transactionDescription: transactionDescription,
                transactionName: transactionName,
                dealStatus: dealStatus,
                sharePointFileLink: sharePointFileLink,
                industryId: industryId,
                productId: productId,
                regionCode: regionCode,
                dealSize: dealSize,
                couponPercent: couponPercent,
                tenorInYrs: tenorInYrs,
                moratoriumInYrs: moratoriumInYrs,
                repaymentFrequency: repaymentFrequency,
                amortisationStyle: amortisationStyle,
                mandateLetterDate: mandateLetterDate,
                creditApprovalDate: creditApprovalDate,
                feeLetterDate: feeLetterDate,
                expectedCloseDate: expectedCloseDate,
                actualCloseDate: actualCloseDate,
                nbcApprovalDate: nbcApprovalDate,
                nbcSubmissionDate: nbcSubmissionDate,
                ccSubmissionDate: ccSubmissionDate,
                amountInMN: amountInMN,
                advanceInMN: advanceInMN,
                advancePercent: advancePercent,
                finalPercent: finalPercent,
                guaranteePercent: guaranteePercent,
                monitoringInMN: monitoringInMN,
                reimbursableInMN: reimbursableInMN,
                DealCategory: DealCategory,
                financialYearName: financialYearName
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

    async editDeal(dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor, transactorLegal, administrator, createdBy,
        lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode,
        dealSize, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle, mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate,
        actualCloseDate, nbcApprovalDate, nbcSubmissionDate, ccSubmissionDate, amountInMN, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN,
        reimbursableInMN, mrocPreNBCApprovalDocLink, mrocPreNBCApprovalDocLinkDate, mrocPreNBCMinutesDocLink, mrocPreNBCMinutesDocLinkDate,
        nbcApprovalDocLink, nbcApprovalDocLinkDate, nbcMinutesDocLink, nbcMinutesDocLinkDate, mandateLetterOnboardingDocumentLink, mandateLetterOnboardingDocumentLinkDate,
        nbcSize, nbcMandatedSize, nbcMandatedDate, financialYearName, transactionName, dealStatus, sharePointFileLink) {
        const response = await fetch(`${config.apiurl}/Trms/editDeal`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                leadId: leadId,
                companyId: companyId,
                companyDescription: companyDescription,
                originator: originator,
                leadTransactor: leadTransactor,
                coTransactor: coTransactor,
                transactorLegal: transactorLegal,
                administrator: administrator,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate,
                recordOwner: recordOwner,
                transactionPhase: transactionPhase,
                transactionDescription: transactionDescription,
                industryId: industryId,
                productId: productId,
                regionCode: regionCode,
                dealSize: dealSize,
                couponPercent: couponPercent,
                tenorInYrs: tenorInYrs,
                moratoriumInYrs: moratoriumInYrs,
                repaymentFrequency: repaymentFrequency,
                amortisationStyle: amortisationStyle,
                mandateLetterDate: mandateLetterDate,
                creditApprovalDate: creditApprovalDate,
                feeLetterDate: feeLetterDate,
                expectedCloseDate: expectedCloseDate,
                actualCloseDate: actualCloseDate,
                nbcApprovalDate: nbcApprovalDate,
                nbcSubmissionDate: nbcSubmissionDate,
                ccSubmissionDate: ccSubmissionDate,
                amountInMN: amountInMN,
                advanceInMN: advanceInMN,
                advancePercent: advancePercent,
                finalPercent: finalPercent,
                guaranteePercent: guaranteePercent,
                monitoringInMN: monitoringInMN,
                reimbursableInMN: reimbursableInMN,
                mrocPreNBCApprovalDocLink: mrocPreNBCApprovalDocLink,
                mrocPreNBCApprovalDocLinkDate: mrocPreNBCApprovalDocLinkDate,
                mrocPreNBCMinutesDocLink: mrocPreNBCMinutesDocLink,
                mrocPreNBCMinutesDocLinkDate: mrocPreNBCMinutesDocLinkDate,
                nbcApprovalDocLink: nbcApprovalDocLink,
                nbcApprovalDocLinkDate: nbcApprovalDocLinkDate,
                nbcMinutesDocLink: nbcMinutesDocLink,
                nbcMinutesDocLinkDate: nbcMinutesDocLinkDate,
                mandateLetterOnboardingDocumentLink: mandateLetterOnboardingDocumentLink,
                mandateLetterOnboardingDocumentLinkDate: mandateLetterOnboardingDocumentLinkDate,
                nbcSize: nbcSize,
                nbcMandatedSize: nbcMandatedSize,
                nbcMandatedDate: nbcMandatedDate,
                financialYearName: financialYearName,
                transactionName: transactionName,
                dealStatus: dealStatus,
                sharePointFileLink: sharePointFileLink
            })
        })
        const data = response.status;
        return data
    },

    async updateDealCategory(dealId, mandateLetterSigned, dueDiligenceOngoing, creditCommitteeApprovalPending, creditCommitteeApprovalObtained, professionalPartiesAppointed, documentationExpectedToSignInEightWks,
        materialsCPsWithTimelinesAgreed, executedDocumentation, guaranteeDocumentInAgreedForm, filingWithSEC, materialsCPsToFinancialCloseIsSatisfactory, financialCloseExpectedWithinSixMonths, financialCloseReached,
        LastModifiedBy, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/updateDealCategory`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                mandateLetterSigned: mandateLetterSigned,
                dueDiligenceOngoing: dueDiligenceOngoing,
                creditCommitteeApprovalPending: creditCommitteeApprovalPending,
                creditCommitteeApprovalObtained: creditCommitteeApprovalObtained,
                professionalPartiesAppointed: professionalPartiesAppointed,
                documentationExpectedToSignInEightWks: documentationExpectedToSignInEightWks,
                materialsCPsWithTimelinesAgreed: materialsCPsWithTimelinesAgreed,
                executedDocumentation: executedDocumentation,
                guaranteeDocumentInAgreedForm: guaranteeDocumentInAgreedForm,
                filingWithSEC: filingWithSEC,
                materialsCPsToFinancialCloseIsSatisfactory: materialsCPsToFinancialCloseIsSatisfactory,
                financialCloseExpectedWithinSixMonths: financialCloseExpectedWithinSixMonths,
                financialCloseReached: financialCloseReached,
                LastModifiedBy: LastModifiedBy,
                lastModifiedDate: lastModifiedDate,
            })
        })
        const data = response.status;
        return data
    },

    async updateDealAmortizationDetails(dealId, amortizationDiscountFactor, amortizationTakingFirstInterestEarly, amotizationGuaranteeFeeRate, amortizationStatus, amortizationFirstCouponDate, amortizationIssueDate, LastModifiedBy, lastModifiedDate) {
   const response = await fetch(`${config.apiurl}/Trms/updateDealAmortizationDetails`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                amortizationDiscountFactor: amortizationDiscountFactor,
                amortizationTakingFirstInterestEarly: amortizationTakingFirstInterestEarly,
                amortizationGuaranteeFeeRate: amotizationGuaranteeFeeRate,
                amortizationStatus: amortizationStatus,
                amortizationFirstCouponDate: amortizationFirstCouponDate,
                amortizationIssueDate: amortizationIssueDate,
                LastModifiedBy: LastModifiedBy,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async updateDealFundOptions(dealId, dealFundOptionBOI, dealFundOptionDCM, dealFundOptionPCB, LastModifiedBy, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/updateDealFundOption`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                fundOptionBOI: dealFundOptionBOI,
                fundOptionDCM: dealFundOptionDCM,
                fundOptionPCB: dealFundOptionPCB,
                LastModifiedBy: LastModifiedBy,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async getDealsTransactionParties() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsTransactionParties`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealsTransactionPartiesByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsTransactionPartiesByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createDealsTransactionParties(dealId, role, appointed, party, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealTransactionParty({
            data: {
                dealId: dealId,
                role: role,
                appointed: appointed,
                party: party,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsTransactionParties(dealId, id, role, appointed, party, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsTransactionParties`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                role: role,
                appointed: appointed,
                party: party,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsTransactionParties(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsTransactionParties/${dealId}/${id}`, {
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

    async getDealsPerformanceLinkedIndicators() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsPerformanceLinkedIndicators/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealGlobalPerformanceByFinancialYear(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealGlobalPerformanceByFinancialYear/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsPerformanceLinkedIndicatorsByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsPerformanceLinkedIndicatorsByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createDealsPerformanceLinkedIndicators(dealId, particulars, concern, weightPercent, expectedDate, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsPerformanceLinkedIndicator({
            data: {
                dealId: dealId,
                particulars: particulars,
                concern: concern,
                weightPercent: weightPercent,
                expectedDate: expectedDate,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsPerformanceLinkedIndicators(dealId, id, particulars, concern, weightPercent, expectedDate, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsPerformanceLinkedIndicators`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                particulars: particulars,
                concern: concern,
                weightPercent: weightPercent,
                expectedDate: expectedDate,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsPerformanceLinkedIndicators(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsPerformanceLinkedIndicators/${dealId}/${id}`, {
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
    async getDealsOtherPrecedentConditions() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsOtherPrecedentConditions/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealsOtherPrecedentConditionsByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsOtherPrecedentConditionsByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createDealsOtherPrecedentConditions(dealId, factors, yesNo, concern, expectedDate, responsibleParty, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsOtherPrecedentCondition({
            data: {
                dealId: dealId,
                factors: factors,
                yesNo: yesNo,
                concern: concern,
                expectedDate: expectedDate,
                responsibleParty: responsibleParty,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsOtherPrecedentConditions(dealId, id, factors, yesNo, concern, expectedDate, responsibleParty, status, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsOtherPrecedentConditions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                factors: factors,
                yesNo: yesNo,
                concern: concern,
                expectedDate: expectedDate,
                responsibleParty: responsibleParty,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsOtherPrecedentConditions(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsOtherPrecedentConditions/${dealId}/${id}`, {
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
    async getDealsKeyDealFactors() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsKeyDealFactors/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealsKeyDealFactorsByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsKeyDealFactorsByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    

    async createDealsKeyDealFactors(dealId, factors, yesNo, concern, expectedDate, responsibleParty, status, keyTransactionIssues, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsKeyDealFactor({
            data: {
                dealId: dealId,
                factors: factors,
                yesNo: yesNo,
                concern: concern,
                expectedDate: expectedDate,
                responsibleParty: responsibleParty,
                status: status,
                keyTransactionIssues: keyTransactionIssues,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsKeyDealFactors(dealId, id, factors, yesNo, concern, expectedDate, responsibleParty, status, keyTransactionIssues,    createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsKeyDealFactors`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                factors: factors,
                yesNo: yesNo,
                concern: concern,
                expectedDate: expectedDate,
                responsibleParty: responsibleParty,
                status: status,
                keyTransactionIssues: keyTransactionIssues,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsKeyDealFactors(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsKeyDealFactors/${dealId}/${id}`, {
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
    async getDealsOtherFocusAreas() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsOtherFocusAreas`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealsOtherFocusAreasByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsOtherFocusAreasByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createDealsOtherFocusArea(dealId, feeLetterDate, crgDeedDate, closedDate, closingSize, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsOtherFocusAreas({
            data: {
                dealId: dealId,
                feeLetterDate: feeLetterDate,
                crgDeedDate: crgDeedDate,
                closedDate: closedDate,
                closingSize: closingSize,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsOtherFocusAreas(dealId, id, feeLetterDate, crgDeedDate, closedDate, closingSize, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsOtherFocusAreas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                feeLetterDate: feeLetterDate,
                crgDeedDate: crgDeedDate,
                closedDate: closedDate,
                closingSize: closingSize,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsOtherFocusAreas(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsOtherFocusAreas/${dealId}/${id}`, {
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
    async getDealsClientContacts() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsClientContacts`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getDealsClientContactsByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsClientContactsByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createDealsClientContact(dealId, companyId, contactId, contactFirstName, contactLastName, contactPhoneNo, contactAltPhoneNo, contactEmailAddress, contactDesignation, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsClientContacts({
            data: {
                dealId: dealId,
                companyId: companyId,
                contactId: contactId,
                contactFirstName: contactFirstName,
                contactLastName: contactLastName,
                contactPhoneNo: contactPhoneNo,
                contactAltPhoneNo: contactAltPhoneNo,
                contactEmailAddress: contactEmailAddress,
                contactDesignation: contactDesignation,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsClientContacts(dealId, id, companyId, contactId, contactFirstName, contactLastName, contactPhoneNo, contactAltPhoneNo, contactEmailAddress, contactDesignation, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsClientContacts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                companyId: companyId,
                contactId: contactId,
                contactFirstName: contactFirstName,
                contactLastName: contactLastName,
                contactPhoneNo: contactPhoneNo,
                contactAltPhoneNo: contactAltPhoneNo,
                contactEmailAddress: contactEmailAddress,
                contactDesignation: contactDesignation,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsClientContacts(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsClientContacts/${dealId}/${id}`, {
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
    async getDealsCreditCommitteeFocusArea() {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsCreditCommitteeFocusAreas`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsCreditCommitteeFocusAreasByDealId(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsCreditCommitteeFocusAreasByDealId/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createDealsCreditCommitteeFocusAreas(dealId, creditCommitteeApprovalDate, creditCommitteeApprovalSize, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        return createDealsCreditCommitteeFocusArea({
            data: {
                dealId: dealId,
                creditCommitteeApprovalDate: creditCommitteeApprovalDate,
                creditCommitteeApprovalSize: creditCommitteeApprovalSize,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err))
    },

    async editDealsCreditCommitteeFocusAreas(dealId, id, creditCommitteeApprovalDate, creditCommitteeApprovalSize, createdBy, lastModifiedBy, createdDate, lastModifiedDate) {
        const response = await fetch(`${config.apiurl}/Trms/editDealsCreditCommitteeFocusAreas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dealId: dealId,
                id: id,
                creditCommitteeApprovalDate: creditCommitteeApprovalDate,
                creditCommitteeApprovalSize: creditCommitteeApprovalSize,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDate: createdDate,
                lastModifiedDate: lastModifiedDate
            })
        })
        const data = response.status;
        return data
    },

    async deleteDealsCreditCommitteeFocusAreas(dealId, id) {
        try {
            await fetch(`${config.apiurl}/Trms/deleteDealsCreditCommitteeFocusAreas/${dealId}/${id}`, {
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
    async getDealPerformanceByTransactor(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealPerformanceByTransactor/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDealsByTransactor(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getDealsByTransactor/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getLeadsByTransactor(id) {
        try {
            let response = await fetch(`${config.apiurl}/Trms/getLeadsByTransactor/${id}`, {

            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
}