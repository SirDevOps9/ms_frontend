export interface APIValidationError {
    errors: string[];
    statusCode: number;
    message: string;
}