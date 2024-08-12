import { JournalTemplateType } from './journalentrytemplatetype';

export class GetJournalTemplateDto {
  id: string;
  code: string;
  periodId: string;
  description: string;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  getJournalTemplateLinesByIdDto: GetJournalTemplateLinesDto[];
}

export class GetJournalTemplateLinesDto {
  id: string;
  lineDescription: string;
  debitAmount: number;
  creditAmount: number;
  currencyRate: number;
  debitAmountLocal: number;
  creditAmountLocal: number;
  accountId: number;
  accountName: string;
  accountCode: string;
  currencyId: number;
  currency: string;
  partnerId: number;
  costCenterConfig?:string
}
