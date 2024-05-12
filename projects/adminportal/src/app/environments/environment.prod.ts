// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appVersion: 'v8.1.7',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'api',
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration:
    'https://preview.keenthemes.com/metronic8/demo1/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1/',
  appPreviewAngularUrl:
    'https://preview.keenthemes.com/metronic8/angular/demo1',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl:
    'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  appDemos: {
    'portal-finance': {
      title: 'Demo 1',
      description: 'Default Dashboard',
      published: true,
      thumbnail: './assets/media/demos/demo1.png',
    },

    demo2: {
      title: 'Demo 2',
      description: 'SaaS Application',
      published: true,
      thumbnail: './assets/media/demos/demo2.png',
    },

    demo3: {
      title: 'Demo 3',
      description: 'New Trend',
      published: true,
      thumbnail: './assets/media/demos/demo3.png',
    },

    demo4: {
      title: 'Demo 4',
      description: 'Intranet Application',
      published: true,
      thumbnail: './assets/media/demos/demo4.png',
    },

    demo5: {
      title: 'Demo 5',
      description: 'Support Forum',
      published: false,
      thumbnail: './assets/media/demos/demo5.png',
    },

    demo6: {
      title: 'Demo 6',
      description: 'Admin Backend',
      published: true,
      thumbnail: './assets/media/demos/demo6.png',
    },

    demo7: {
      title: 'Demo 7',
      description: 'CRM Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo7.png',
    },

    demo8: {
      title: 'Demo 8',
      description: 'Core Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo8.png',
    },

    demo9: {
      title: 'Demo 9',
      description: 'Fancy Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo9.png',
    },

    demo10: {
      title: 'Demo 10',
      description: 'Modern Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo10.png',
    },

    demo11: {
      title: 'Demo 11',
      description: 'Light Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo11.png',
    },

    demo12: {
      title: 'Demo 12',
      description: 'Reporting System',
      published: false,
      thumbnail: './assets/media/demos/demo12.png',
    },

    demo13: {
      title: 'Demo 13',
      description: 'Classic Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo13.png',
    },

    demo14: {
      title: 'Demo 14',
      description: 'Creative Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo14.png',
    },

    demo15: {
      title: 'Demo 15',
      description: 'Minimalistic Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo15.png',
    },

    demo16: {
      title: 'Demo 16',
      description: 'Modern Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo16.png',
    },

    demo17: {
      title: 'Demo 17',
      description: 'Backend System',
      published: false,
      thumbnail: './assets/media/demos/demo17.png',
    },

    demo18: {
      title: 'Demo 18',
      description: 'System Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo18.png',
    },

    demo19: {
      title: 'Demo 19',
      description: 'Light Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo19.png',
    },

    demo20: {
      title: 'Demo 20',
      description: 'Monochrome Dashboard',
      published: false,
      thumbnail: './assets/media/demos/demo20.png',
    },
  },
  API: {
    Files: 'api/files',
    Accounts: 'api/accounts',
    UserManagement: 'api/users',
    systemUsers: 'api/systemUsers',
    Cities: 'api/corporates/cities',
    Districts: 'api/corporates/districts',
    Corporates: 'api/corporates/corporates',
    businessLines: 'api/corporates/businessLines',
    currencies: 'api/corporates/currencies',
    Periods: 'api/finance/periods',
    JournalEntry: 'api/finance/journals',
    //registration
    UsersAccount: 'api/users/account/login',
    UsersAccountForgotPassword: 'api/users/account/forget',
    UsersAccountReset: 'api/users/account/reset',
    ManageLevelsAccount: 'api/finance/levels/accounts',
    EditManageLevelsAccount: 'api/finance/levels/accounts',
    ManageLevelsCostCenters: 'api/finance/levels/cost-centers',
    EditManageLevelsCostCenter: 'api/finance/levels/cost-centers',
    AccountType: 'api/finance/accounts/types',
    ManageAccounts: 'api/finance/accounts',
    levelsLookup: 'api/finance/levels/lookup',
    CostCenter: 'api/finance/cost-centers',
    Categories: 'api/finance/categories',
    ExchangeRates: 'api/finance/exchange-rates',
    DefaultCurrency: 'api/corporates/corporates/currencies/default',
    freeze: 'api/finance/levels/freeze',
    ParentAccount: 'api/finance/accounts/lookup/parent',
    ParentCostCenters: 'api/finance/cost-centers/lookup/parent',
    ParentCostCenterslookup: 'api/finance/cost-centers/lookup',
    ParentCostCenterslookupLevel: 'api/finance/reports/cost-centers',
    ParentAccountslevel: 'api/finance/accounts',
    Accountslastlevel: 'api/finance/accounts/lookup/lastlevel',
    relatedAccounts: 'api/finance/cost-centers/lookup/related-accounts',
    parentRelatedAccounts:
      'api/finance/cost-centers/lookup/parent-related-accounts',
    sources: 'api/finance/journals/lookups/sources',
    lastPesiodLookup: 'api/finance/periods/lookup/last-period',
    closeEntry: 'api/finance/close/review',
    submitCloseEntry: 'api/finance/close',
    deleteLevel: 'api/finance/levels/accounts',
    deleteCostCenter: 'api/finance/levels/cost-centers',
    reports: 'api/finance/reports',
    sequence: 'api/finance/sequence',
    retainedSearch: 'api/finance/accounts/retained-earnings',
    JournalCategoriesLookup: 'api/finance/sequence/lookups/categories',
    department: 'api/human-resources/departments',
    jobs: 'api/human-resources/jobs',
    positions: 'api/human-resources/positions',
    costLastLevel: 'api/finance/cost-centers/lookup/last-level',
    employees: 'api/human-resources/employees',
    attendance: 'api/human-resources/attendance-systems/lookup',
    nationalties: 'api/human-resources/nationalities/lookup',
    accountTree: 'api/finance/accounts/chart',
    costCenterChart: 'api/finance/cost-centers/chart',
    holidays: 'api/human-resources/vacations/holidays',
    vacationReason: 'api/human-resources/vacations/holiday-names',
    responsibilities: 'api/human-resources/responsibilities',
    permissions: 'api/users/permissions/roles',
    users: 'api/users/users-manager',
    getUserResponsibilties: 'api/corporates/corporates/responsibilities',
    vacations: 'api/human-resources/vacations',
    organizations: 'api/inventory/organizations',
    inventory: 'api/inventory',
    stores: 'api/inventory/stores',
    workWeek: 'api/human-resources/attendance-systems/work-week',
    shifts : 'api/human-resources/attendance-systems/shifts',
    overTime : "api/human-resources/overtime-regulations",
    workRegulations : "api/human-resources/work-regulations",
    monthlyClosing : 'api/human-resources/closing-settings',
    attendanceDevices : 'api/human-resources/attendanceDevices',
    workAttendance : 'api/human-resources/workAttendance',
    components : 'api/human-resources/payroll/components',
    employeeFixedcomponents : 'api/human-resources/payroll/fixed-components',
    employeeVariablecomponents : 'api/human-resources/payroll/variable-components',
    accountsLookup : 'api/finance/accounts/lookup',
    incomeTax : 'api/human-resources/income-taxbases'







  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
