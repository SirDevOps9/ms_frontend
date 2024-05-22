import { JournalTemplateType } from './journalentrytemplatetype';

export class GetAllJournalTemplateDto {
  id: string;
  code: string;
  periodName: string;
  type: JournalTemplateType;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
}
