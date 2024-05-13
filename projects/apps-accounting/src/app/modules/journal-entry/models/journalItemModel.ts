import { AccountDto } from "../../account/models/accountDto";
import { CurrencyDto } from "../../general/models/currencyDto";
import { CreateJournalEntryLine } from "./addJournalEntryCommand";

export class JournalItemModel {
    id: number;
    accountId: number | undefined;
    private _account: AccountDto | null;
    public get account(): AccountDto | null {
      return this._account;
    }
    public set account(value: AccountDto | null) {
      this._account = value;
      this.accountId = value?.id;
    }
    lineDescription: string;
    private _debitAmount: number;
    public get debitAmount(): number {
      return this._debitAmount;
    }
    public set debitAmount(value: number) {
      this._debitAmount = value;
      if (this.currencyRate) {
        this.debitAmountLocal = value * this.currencyRate;
      }
    }
    private _creditAmount: number;
    public get creditAmount(): number {
      return this._creditAmount;
    }
    public set creditAmount(value: number) {
      this._creditAmount = value;
      if (this.currencyRate) {
        this.creditAmountLocal = value * this.currencyRate;
      }
    }
    debitAmountLocal?: number;
    creditAmountLocal?: number;
    private _currency: CurrencyDto;
    public get currency(): CurrencyDto {
      return this._currency;
    }
    public set currency(value: CurrencyDto) {
      this._currency = value;
      this.currencyId = value?.id;
      this.currencyRate = value?.ratePerUnit;
    }
    currencyId: number;
    private _currencyRate: number;
    public get currencyRate(): number {
      return this._currencyRate;
    }
    public set currencyRate(value: number) {
      this._currencyRate = value;
      if (!value) {
        this.creditAmountLocal = undefined;
        this.debitAmountLocal = undefined;
        return;
      }
      if (this.creditAmount) {
        this.creditAmountLocal = this.creditAmount * value;
      }
      if (this.debitAmount) {
        this.debitAmountLocal = this.debitAmount * value;
      }
    }
    public toCreateJournalEntryLine(): CreateJournalEntryLine {
      return {
        accountId: this.accountId!,
        creditAmount: this.creditAmount,
        currencyId: this.currencyId,
        currencyRate: this.currencyRate,
        debitAmount: this.debitAmount,
        lineDescription: this.lineDescription
      };
    }
  }
  