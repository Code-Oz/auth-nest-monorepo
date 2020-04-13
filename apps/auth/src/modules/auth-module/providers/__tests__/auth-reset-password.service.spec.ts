
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import { EmailFactoryService } from "@app/email-factory"
import { JwtPasswordTokenProvider } from "@app/jwt-password-token"
import { UserService } from "@app/user"

import { AuthResetPasswordService } from "../auth-reset-password.service"
import { configServiceMock } from "../__mocks__/config-service.mock"
import { jwtPasswordTokenProviderMock } from "../__mocks__/jwt-password-token-provider.mock"
import { sendEmailResetPassword } from "../__mocks__/email-factory.mock"
import { userServiceMock } from "../__mocks__/user-service.mock"

jest.mock("../../controllers/response-messages/post-reset-password-response", () => {
  return {
    postResetPasswordResponseMessage: () => `An email has been send to fakeUserEmail, if email exist`,
  }
})

describe("AuthResetPasswordService", () => {
  let authResetPasswordService: AuthResetPasswordService
  let emailFactoryService: EmailFactoryService
  let configService: ConfigService
  let jwtPasswordTokenProvider: JwtPasswordTokenProvider
  let userService: UserService
  let userEmailDto

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
          AuthResetPasswordService,
          { provide: JwtPasswordTokenProvider, useValue: { ...jwtPasswordTokenProviderMock } },
          { provide: ConfigService, useValue: { ...configServiceMock } },
          { provide: EmailFactoryService, useValue: { ...sendEmailResetPassword } },
          { provide: UserService, useValue: { ...userServiceMock } },
        ],
      })
      .compile()

    authResetPasswordService = moduleRef.get<AuthResetPasswordService>(AuthResetPasswordService)
    emailFactoryService = moduleRef.get<EmailFactoryService>(EmailFactoryService)
    jwtPasswordTokenProvider = moduleRef.get<JwtPasswordTokenProvider>(JwtPasswordTokenProvider)
    userService = moduleRef.get<UserService>(UserService)
    configService = moduleRef.get<ConfigService>(ConfigService)

    userEmailDto = {
      email: "fakeUserEmail",
    }
  })

  describe("postResetPassword", () => {
    it("should validation message", async (done) => {
        userService.isExistUser = async () => true
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
    it("should not send email since user is not existing", async (done) => {
      userService.isExistUser = async () => false
      const expectedResult = {
        message: "An email has been send to fakeUserEmail, if email exist",
      }
      const resultFunction = await authResetPasswordService.postResetPassword(userEmailDto)
      expect(resultFunction).toEqual(expectedResult)
      done()
    })
  })
})
