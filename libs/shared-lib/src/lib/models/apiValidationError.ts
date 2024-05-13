import { ValidationError } from "./";
export interface APIValidationError {
    statusCode: number;
    errorMessage: string;
    errorCode: number;
    key: string;
    ValidationErrors: ValidationError[];
  }