import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common"
import { Request, Response } from "express"
import { GlobalExceptionFilterReturnType } from ".."

const ERROR_TECHNICAL_PROBLEMS = "Sorry we are experiencing technical problems"

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const method = request.method
        const status = this.getStatusError(exception)

        const errorMessage = this.getErrorMessage(exception)

        const responseObject: GlobalExceptionFilterReturnType = {
            statusCode: status,
            path: request.url,
            method,
            ...errorMessage,
            timestamp: new Date().toISOString(),
        }

        response
        .status(status)
        .json(responseObject)
    }

    private getErrorMessage(exception: any): { error: string } {
        const { message } = exception
        if (!message) {
            return {
                error: ERROR_TECHNICAL_PROBLEMS,
            }
        }
        if (!!message.message) {
            return {
                error: message.message,
            }
        }
        if (!!message.error) {
            return {
                error: message.error,
            }
        }
        return {
            error: message,
        }
    }

    private getStatusError(exception: unknown): number {
        if (exception instanceof HttpException) {
            return exception.getStatus()
        }
        return HttpStatus.INTERNAL_SERVER_ERROR
    }
}
