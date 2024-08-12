import { reportCostCenter } from "./reportCostCenter";
export class reportCostAllData {
    id: number;
    code: string;
    name: string;
    transactions: reportCostCenter[];
    totalDebit: number;
    totalCredit: number;
  }