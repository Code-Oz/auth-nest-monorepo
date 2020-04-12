import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common"
import { Request, Response } from "express"

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const method = request.method
    const status = exception.getStatus()
    const errorMessage = this.getErrorMessage(exception.message)

    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        method,
        ...errorMessage,
        timestamp: new Date().toISOString(),
      })
  }

  private getErrorMessage(message: any): { error: string } {
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
}
