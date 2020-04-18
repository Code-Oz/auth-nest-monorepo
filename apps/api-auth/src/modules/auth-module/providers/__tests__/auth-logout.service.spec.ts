
import { Test } from "@nestjs/testing"
import { JwtRefreshTokenService } from "@lib/jwt-refresh-token"

import { AuthLogoutService } from "../auth-logout.service"
import { jwtRefreshTokenServiceMock } from "../__mocks__/jwt-refresh-token-service.mock"

describe("AuthLogoutService", () => {
  let authLogoutService: AuthLogoutService
  let jwtRefreshTokenService: JwtRefreshTokenService
  let refreshTokenDto

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
          AuthLogoutService,
          { provide: JwtRefreshTokenService, useValue: { ...jwtRefreshTokenServiceMock } },
        ],
      })
      .compile()

    authLogoutService = moduleRef.get<AuthLogoutService>(AuthLogoutService)
    jwtRefreshTokenService = moduleRef.get<JwtRefreshTokenService>(JwtRefreshTokenService)

    refreshTokenDto = {
      userId: "fakeUserId",
      userEmail: "fakeUserEmail",
      refreshTokenId: "fakeRefreshTokenId",
    }
  })

  describe("postLogout", () => {
    it("should validation message", async (done) => {
        const resultFunction = await authLogoutService.postLogout(refreshTokenDto)

        const expectedResult = {
          message: "User successfully logout",
        }
        expect(resultFunction).toEqual(expectedResult)
        done()
    })
    it("should throw TokenNotAvailableException", async (done) => {
        const exceptedError = "Token is not available"
        jwtRefreshTokenService.isTokenAvailable = async () => false
        try {
            await authLogoutService.postLogout(refreshTokenDto)
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        done()
    })
  })
})
