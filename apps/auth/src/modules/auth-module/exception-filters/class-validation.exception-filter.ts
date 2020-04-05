import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common"
import { Request, Response } from "express"

@Catch(BadRequestException)
export class ClassValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const message = exception.message

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: this.formatingErrorMessage(message),
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