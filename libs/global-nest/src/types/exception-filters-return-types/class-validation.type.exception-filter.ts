export interface ClassValidationExceptionFilterReturnType {
    statusCode: number
    path: string
    method: string
    errors: {
        [field: string]: {
            errors: string[],
        },
    },
    timestamp: string
}
