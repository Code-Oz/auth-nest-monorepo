import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common"
import { Request, Response } from "express"

@Catch(BadRequestException)
export class ClassValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const method = request.method
    const message = exception.message
    const status = exception.getStatus()

    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        method,
        errors: this.formatingErrorMessage(message),
        timestamp: new Date().toISOString(),
      })
  }

  private formatingErrorMessage(errorObject: ErrorMessageInterface) {
    const messageObjects = errorObject.message
    const formatedErrorMessage = messageObjects.reduce((acc, value) => {
      const { property, constraints } = value
      const constrainsValues = Object.values(constraints)

      acc[property] = {
        errors: [ ...constrainsValues ],
      }
      return acc
    }, {})

    return formatedErrorMessage
  }
}

interface ErrorMessageInterface {
  message: [{
    constraints: {
      [key: string]: string,
    },
    property: string,
  }]
}
