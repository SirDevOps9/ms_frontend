import { ValidationError } from './validationError';

export interface DefaultExceptionModel {
  messageCode: number;
  message: string;
  correlationId?: string;
  validationErrors?: ValidationError[];
  isError: boolean;
}
