import { commissiontype, costCenterConfig, PaidBy, paymentmethodtype, paymentplace } from "./enums";

export interface ViewPaymentInDto {
    id: number;
    code: string;
   // status: PaymentInStatus;
    description: string;
    paymentInDate: Date;
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
    paymentInDetails: PaymentInDetailViewDto[];

  }

  export interface PaymentInDetailViewDto {
    id: number;
    amount: number;
    rate: number;
    localAmount: number;
    currencyName: string;
    paymentMethodName?: string;
    paidBy: PaidBy;
    paidByDetailsName: string;
    paymentMethodId:number;
    paymentInMethodDetail?: ViewPaymentInMethodDetailDto;
    paymentMethodType: paymentmethodtype;
    vendorName?: string;
    customerName?: string;
    glAccountId?: number;
    accountName?: string;
    notes: string;
    costCenterConfig: costCenterConfig;
    paymentInDetailCostCenters: ViewPaymentInDetailCostCenterDto[];
  }

  export interface ViewPaymentInDetailCostCenterDto {
    id: number;
    costCenterName: string;
    costCenterId:number;
    percentage: number;
    amount: number;
  }

  export interface ViewPaymentInMethodDetailDto {
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