import { APIValidationError } from './apiValidationError';

export class APIResponse<T> {
  language: string;
  response: T;
  error?: APIValidationError;
}
