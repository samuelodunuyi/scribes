import { createRouter, createWebHistory } from "vue-router";
import TRMSBase from "../views/TRMS/TRMSBase.vue";
import CESBase from "../views/CES/CESBase.vue";
import CRMBase from "../views/CRM/CRMBase.vue";
import LoginAuth from '../views/LoginAuth.vue'
import authenticationService from '../services/authenticationService';
import { useDashOptionStore } from "../stores/dashOption"
import pinia from "../stores/store";
const stores = useDashOptionStore(pinia);
const routes = [
    {
    path: '/login',
    name: 'Login',
    component: LoginAuth
  },

   {
    path: "/ces",
    name: "Clean Energy",
    component: CESBase,
    children: [
      {
        path: "",
        name: "Clean Energy Dashboard",
        component: () => import("../views/CES/Dashboard.vue"),
      },
      {
        path: "projectForm/:id4/:id5",
        name: "Project Form",
        component: () => import("../views/CES/ProjectsForm.vue"),
      },
    ],
  },
  {
    path: "/TRMS",
    name: "trmshome",
    component: TRMSBase,
    children: [
      {
        path: "",
        name: "TRMSDashboard",
        component: () => import("../views/TRMS/Dashboard.vue"),
      },
      {
        path: "createdeals",
        name: "Create Deals",
        component: () => import("../views/TRMS/CreateDeal.vue"),
      },
      {
        path: "pipelinedeals",
        name: "Pipeline Deals",
        component: () => import("../views/TRMS/PipelineDeal.vue"),
      },
      {
        path: "MPR",
        name: "MPR Updates",
        component: () => import("../views/TRMS/MPR.vue"),
      },
      {
        path: "pipelinedeals/detail/new",
        name: "New Pipeline Deal",
        component: () => import("../views/TRMS/newPipeline.vue"),
      },
      {
        path: "pipelinedeals/detail/:id2",
        name: "Pipeline Deal Details",
        component: () => import("../views/TRMS/DetailsPipelineDeals.vue"),
      },
      {
        path: "pipelinedeals_/detail/:id2",
        name: "Pipeline Deal Details Second",
        component: () => import("../views/TRMS/detailsPipeline_Second.vue"),
      },
      {
        path: "portfolioDeals/detail/:id2",
        name: "Portfolio Deal Details",
        component: () => import("../views/TRMS/detailsPortfolioDeals.vue"),
      },
      {
        path: "portfoliodeals",
        name: "PortFolio Deals",
        component: () => import("../views/TRMS/PortfolioDeal.vue"),
      },
    ],
  },
  {
    path: "/report",
    name: "General Transaction Status Report",
    component: () => import("../views/Reports/GeneralTransactionReport.vue"),
  },
  {
    path: "/originationstructuringreport",
    name: "Origination and Structuring Activity Report",
    component: () => import("../views/Reports/OriginationStructuringReport.vue"),
  },
  {
    path: "/originationprospectreport",
    name: "Origination and Structuring Prospect Report",
    component: () => import("../views/Reports/OriginationProspectReport.vue"),
  },
  {
    path: "/keystatistics",
    name: "Key Statistics on Origination and Structuring Activity",
    component: () => import("../views/Reports/KeyStatisticsReport.vue"),
  },
  {
    path: "/originationactivity",
    name: "Origination Activity",
    component: () => import("../views/Reports/Originationactivity.vue"),
  },

  {
    path: "/crm/",
    name: "CRM",
    component: CRMBase,
    children: [
      {
        path: "",
        name: "CRMDashboard",
        component: () => import("../views/CRM/Dashboard.vue"),
      },
      {
        path: "pipelineprojects",
        name: "CRM Pipeline Leads",
        component: () => import("../views/CRM/PipelineDeal.vue"),
      },
      {
        path: "mandatedclients",
        name: "CRM Mandated Leads",
        component: () => import("../views/CRM/MandatedDeal.vue"),
      },
      {
        path: "transactors",
        name: "CRM Transactors",
        component: () => import("../views/CRM/TransactorsView.vue"),
      },
      {
        path: "company",
        name: "CRM Company",
        component: () => import("../views/CRM/Company.vue"),
      },
      {
        path: "contacts",
        name: "CRM Contacts",
        component: () => import("../views/CRM/ContactsView.vue"),
      },

      {
        path: "details/:id/:id2",
        name: "crmDetails",
        component: () => import("../views/CRM/Details.vue"),
        props: true
      },      {
        path: "newlead/:id/:id2",
        name: "newLead",
        component: () => import("../views/CRM/newPipelineLead.vue"),
        props: true
      },
    ],
  },

  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/SettingsView.vue"),
  },
  {
    path: "/audit",
    name: "audit",
    component: () => import("../views/auditView.vue"),
  },
  {
    path: "/administration",
    name: "Administration",
    component: () => import("../views/Administration/AdminBase.vue"),
    children: [
      {
        path: "",
        name: "Users",
        component: () => import("../views/Administration/Users.vue"),
      },
      {
        path: "userroles",
        name: "Roles",
        component: () => import("../views/Administration/Roles.vue"),
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("../views/Administration/Permissions.vue"),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active',
});

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
   const auth = authenticationService.msalInstance.getAllAccounts();
   if (authRequired && auth.length==0) {
     return '/login';
   }
   else if(auth.length>0 && to.path==='/' && stores.signedInUserEmail.length>5)
   {
    return '/TRMS'
   }
   
 });

export default router;
