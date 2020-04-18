
import { Test } from "@nestjs/testing"
import { UserService } from "@lib/user"

import { userServiceMock } from "../__mocks__/user-service.mock"
import { AuthChangePasswordService } from "../auth-change-password.service"

describe("AuthChangePasswordService", () => {
  let authChangePasswordService: AuthChangePasswordService
  let userService
  let changePasswordDto
  let passwordTokenPayload

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
          AuthChangePasswordService,
          { provide: UserService, useValue: { ...userServiceMock } },
        ],
      })
      .compile()

    authChangePasswordService = moduleRef.get<AuthChangePasswordService>(AuthChangePasswordService)
    userService = moduleRef.get<UserService>(UserService)

    changePasswordDto = {
      password: "fakePassword",
    }
    passwordTokenPayload = {
      userEmail: "fakeEmail",
    }
  })

  describe("postChangePassword", () => {
    it("should validation message", async (done) => {
        const resultFunction = await authChangePasswordService.postChangePassword(changePasswordDto, passwordTokenPayload)

        const expectedResult = {
          message: "User password has been changed !",
        }
        expect(resultFunction).toEqual(expectedResult)
        done()
    })
  })
})
