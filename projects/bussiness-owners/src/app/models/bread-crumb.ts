import { BreadcrumbLabel } from "shared-lib";
export const BreadCrumbRoute = {
  
  subscription: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.SUBSCRIPTION},
  ],
  user: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.SUBSCRIPTION , route: '/my-subscriptions'   },
    { label: BreadcrumbLabel.USER ,  },
  ],
  cart: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.SUBSCRIPTION , route: '/my-subscriptions'   },
    { label: BreadcrumbLabel.CART ,  },
  ],
  app: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.SUBSCRIPTION , route: '/my-subscriptions'   },
    { label: BreadcrumbLabel.Manage_Apps ,  },
  ],
  companies: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
     { label: BreadcrumbLabel.SUBSCRIPTION , route: '/my-subscriptions'   },
    { label: BreadcrumbLabel.COMPANIES}
  ],
  editCompanies: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.SUBSCRIPTION , route: '/my-subscriptions'   },
    // { label: BreadcrumbLabel.COMPANIES , route: `/company/ }`   },
    { label: BreadcrumbLabel.EDIT_COMPANIES ,  },

  ],
  appStore: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.APP_STORE },
  ],
  appDetails: [
    { icon: 'pi pi-home', route: '/my-subscriptions' },
    { label: BreadcrumbLabel.APP_STORE , route: '/app-store'  },
    { label: BreadcrumbLabel.APP_DETAILS },
  ],

};
