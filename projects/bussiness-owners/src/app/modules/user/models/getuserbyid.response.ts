// export interface GetUserbyid {
//     id: string;
//     name: string;
//     email: string;
//     subscriptions: string[];
//     boRoles: number[];
//   }

import { lookupDto } from "shared-lib";

  

  export interface GetUserbyid {
    id: string;
    name: string;
    email: string;
    license: string;
    companyId: string;
    branchIds: string[];
    subdomains: string[];
  }



