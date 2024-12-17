import { BreadcrumbLabel } from "shared-lib";
export const BreadCrumbRoute = {
    addInvoice: [
        { icon: 'pi pi-home', route: '/home' },
        { label: BreadcrumbLabel.BUSSINESS_OWNER , route: '/bussiness-owners'  },
        { label: BreadcrumbLabel.BUSSINESS_OWNER_ADD_INVOICE },
      ],
      bussinesOwner: [
        { icon: 'pi pi-home', route: '/home' },
        { label: BreadcrumbLabel.BUSSINESS_OWNER},
      ],
      addBussinesOwner: [
        { icon: 'pi pi-home', route: '/home' },
        { label: BreadcrumbLabel.BUSSINESS_OWNER , route: '/bussiness-owners'  },
        { label: BreadcrumbLabel.BUSSINESS_OWNER_Add },
      ],
    }