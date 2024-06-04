import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage } from "@vueuse/core"

export const useDashOptionStore = defineStore("counter", {
  state: () => {
    return { 
      dashOption:  useLocalStorage('dashOption', 'user'),
      signedInUserEmail: useLocalStorage('signedInUserEmail', ''),
      selectedLeadID_newPipelineDeal: useLocalStorage('selectedLeadID_newPipelineDeal', ''),
      signedInUserName: useLocalStorage('signedInUserName', ''),
      selectedLeadSidebar: useLocalStorage('selectedLeadSidebar', ''),
      signedInUserRole: useLocalStorage('signedInUserRole', ''),
      signedInUserLevel: useLocalStorage('signedInUserLevel', ''),
      notificationLengths: useSessionStorage('notificationLengths', ''),
      filterTableBelow: ('filterTableBelow', ''),
      newValues: useSessionStorage('newValues', []),
      newValuesDeals: useSessionStorage('newValuesDeals', []),
      financialYear: useSessionStorage('financialYear', ''),
      transactionSummary: useSessionStorage('transactionSummary', ''),
      profilePictureUrl: useSessionStorage('profilePictureUrl', ''),
      selectedCleanEnergyPage: useSessionStorage('selectedCleanEnergyPage', ''),
     };
  },
  persist: true
});