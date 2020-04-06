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
    const message = exception.message

    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        method,
        message,
        timestamp: new Date().toISOString(),
      })
  }
}
