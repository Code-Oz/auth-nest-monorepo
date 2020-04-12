
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import { EmailFactoryService } from "@app/email-factory"
import { JwtPasswordTokenProvider } from "@app/jwt-password-token"

import { AuthResetPasswordService } from "../auth-reset-password.service"
import { configServiceMock } from "../__mocks__/config-service.mock"
import { jwtPasswordTokenProviderMock } from "../__mocks__/jwt-password-token-provider.mock"
import { sendEmailResetPassword } from "../__mocks__/email-factory.mock"

describe("AuthResetPasswordService", () => {
  let authResetPasswordService: AuthResetPasswordService
  let emailFactoryService: EmailFactoryService
  let configService: ConfigService
  let jwtPasswordTokenProvider: JwtPasswordTokenProvider
  let userEmailDto

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
          AuthResetPasswordService,
          { provide: JwtPasswordTokenProvider, useValue: { ...jwtPasswordTokenProviderMock } },
          { provide: ConfigService, useValue: { ...configServiceMock } },
          { provide: EmailFactoryService, useValue: { ...sendEmailResetPassword } },
        ],
      })
      .compile()

    authResetPasswordService = moduleRef.get<AuthResetPasswordService>(AuthResetPasswordService)
    emailFactoryService = moduleRef.get<EmailFactoryService>(EmailFactoryService)
    jwtPasswordTokenProvider = moduleRef.get<JwtPasswordTokenProvider>(JwtPasswordTokenProvider)
    configService = moduleRef.get<ConfigService>(ConfigService)

    userEmailDto = {
      email: "fakeUserEmail",
    }
  })

  describe("postResetPassword", () => {
    it("should validation message", async (done) => {
        const resultFunction = await authResetPasswordService.postResetPassword(userEmailDto)

        const expectedResult = {
          message: "An email has been send to fakeUserEmail, if email exist",
        }
        expect(resultFunction).toEqual(expectedResult)
        done()
    })
    it("should throw error linked to variable environment", async (done) => {
        const exceptedError = "Environment variable don't exist for EMAIL_SENDER or PASSWORD_SENDER"
        configService.get = async () => undefined
        try {
            await authResetPasswordService.postResetPassword(userEmailDto)
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        done()
    })
  })
})
