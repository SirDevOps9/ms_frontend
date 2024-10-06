import { IsNumber, noAlphabeticValidator, nonNegativeValidator, nonZeroValidator, rangeValidator } from './numberValidators';
import {
  IsValidMobileWithPrefix,
  IsValidNationalMobile,
} from './mobileValidators';
import { IsValidMobile } from './mobileValidators';
import { IsValidPhone } from './mobileValidators';
import {
  PreventSpecialChars,
  noSpacesValidator,
  notOnlyWhitespaceValidator,
  onlyLettersValidator,
} from './stringValidators';
import { IsAgreedToTermsRequired } from './agreedToTermsValidator';
import { IsValidCRNumber, onlyEnglishLetters } from './saudiIdsValidators';
import { IsValid700Number } from './saudiIdsValidators';
import { validPassword } from './passwordValidators';
import { ConfirmPasswordValidator } from './passwordValidators';
import { birthDateValidator, minimumNumberOfYears } from './dateValidators';
import { lengthValidator } from './stringValidators';
import { IsIqamaId } from './saudiIdsValidators';
import { IsOnlySaudiId } from './saudiIdsValidators';
import { IsValidSaudiId } from './saudiIdsValidators';
import { IsValidEmail } from './emailValidators';
import { IsRequired } from './requiredValidators';
import { fileValidator } from './attachmentValidators';
import { debitAndCreditValidator } from './debit-credit-validator';
import { onlyArabicLetters } from './arabicPattern';

export const customValidators = {
  notOnlyWhitespaceValidator: notOnlyWhitespaceValidator,
  required: IsRequired,
  mobile: IsValidMobile,
  phone: IsValidPhone,
  notUnderAge: minimumNumberOfYears,
  email: IsValidEmail,
  saudiId: IsValidSaudiId,
  onlySaudiId: IsOnlySaudiId,
  saudiIqamaId: IsIqamaId,
  nationalMobile: IsValidNationalMobile,
  number: IsNumber,
  cr700Number: IsValid700Number,
  cRNumber: IsValidCRNumber,
  noSpecialChars: PreventSpecialChars,
  mobileWithPrefix: IsValidMobileWithPrefix,
  agreedToTermsRequired: IsAgreedToTermsRequired,
  password: validPassword,
  confrimPassword: ConfirmPasswordValidator,
  length: lengthValidator,
  file: fileValidator,
  range:rangeValidator,
  hasSpaces: noSpacesValidator,
  nonZero:nonZeroValidator,
  invalidBirthDate: birthDateValidator,
  onlyLetter: onlyLettersValidator,
  debitAndCreditBothCanNotBeZero:debitAndCreditValidator,
  nonNegativeNumbers: nonNegativeValidator,
  noAlphabeticCharacter: noAlphabeticValidator,
  onlyEnglishLetters: onlyEnglishLetters,
  onlyArabicLetters: onlyArabicLetters,
};
