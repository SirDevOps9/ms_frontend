import { commissiontype, costCenterConfig, PaidBy, paymentmethodtype, paymentplace } from "./enums";

export interface ViewPaymentOutDto {
    id: number;
    code: string;
   // status: PaymentInStatus;
    description: string;
    paymentOutDate: Date;
    paymentHub: paymentplace;
    paymentHubDetailName: string;
    bankId?: number;
    bankAccountNumber?: string;
    bankAccountId?: number;
    currencyName: string;
    rate: number;
    amount: number;
    localAmount: number;
    accountName?: string;
    journalId?: number;
    journalCode?: string;
    sourceDocument?: string;
    status?: string;
    paymentOutDetails: PaymentOutDetailViewDto[];

  }

  export interface PaymentOutDetailViewDto {
    id: number;
    amount: number;
    rate: number;
    localAmount: number;
    currencyName: string;
    paymentMethodName?: string;
    paidBy: PaidBy;
    paidByDetailsName: string;
    paymentMethodId:number;
    paymentOutMethodDetail?: ViewPaymentOutMethodDetailDto;
    paymentMethodType: paymentmethodtype;
    vendorName?: string;
    customerName?: string;
    glAccountId?: number;
    accountName?: string;
    notes: string;
    costCenterConfig: costCenterConfig;
    paymentOutDetailCostCenters: ViewPaymentOutDetailCostCenterDto[];
  }

  export interface ViewPaymentOutDetailCostCenterDto {
    id: number;
    costCenterName: string;
    costCenterId:number;
    percentage: number;
    amount: number;
  }

  export interface ViewPaymentOutMethodDetailDto {
    paymentMethodId: number;
    paymentMethodName?: string;
    chequeNumber?: string;
    chequeDueDate?: Date;
    bankReference?: string;
    commissionAmount?: number;
    VatAmount?: number;
    commissionType?: commissiontype;
    commissionValue?: number;
    commissionAccountName?: string;
    allowVat: boolean;
  }