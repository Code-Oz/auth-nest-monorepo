
import { Test } from "@nestjs/testing"
import { JwtAccessTokenProvider } from "@lib/jwt-access-token"
import { JwtRefreshTokenProvider, JwtRefreshTokenService } from "@lib/jwt-refresh-token"

import { AuthRefreshTokenService } from "../auth-refresh-token.service"
import { AccessToken } from "../../types/access-token.type"
import { jwtRefreshTokenServiceMock } from "../__mocks__/jwt-refresh-token-service.mock"
import { jwtAccessTokenProviderMock } from "../__mocks__/jwt-access-token-provider.mock"
import { jwtRefreshTokenProviderMock } from "../__mocks__/jwt-refresh-token-provider.mock"

describe("AuthRefreshTokenService", () => {
  let authRefreshTokenService: AuthRefreshTokenService
  let jwtAccessTokenProvider: JwtAccessTokenProvider
  let jwtRefreshTokenProvider: JwtRefreshTokenProvider
  let jwtRefreshTokenService: JwtRefreshTokenService
  let refreshTokenDto

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
            AuthRefreshTokenService,
            { provide: JwtAccessTokenProvider, useValue: { ...jwtAccessTokenProviderMock } },
            { provide: JwtRefreshTokenProvider, useValue: { ...jwtRefreshTokenProviderMock } },
            { provide: JwtRefreshTokenService, useValue: { ...jwtRefreshTokenServiceMock } },
        ],
      })
      .compile()

    authRefreshTokenService = moduleRef.get<AuthRefreshTokenService>(AuthRefreshTokenService)
    jwtAccessTokenProvider = moduleRef.get<JwtAccessTokenProvider>(JwtAccessTokenProvider)
    jwtRefreshTokenProvider = moduleRef.get<JwtRefreshTokenProvider>(JwtRefreshTokenProvider)
    jwtRefreshTokenService = moduleRef.get<JwtRefreshTokenService>(JwtRefreshTokenService)

    refreshTokenDto = {
      userId: "fakeUserId",
      userEmail: "fakeUserEmail",
      refreshTokenId: "fakeRefreshTokenId",
    }
  })

  describe("postAccessToken", () => {
    it("should return access and refresh token", async (done) => {
        const resultFunction = await authRefreshTokenService.postAccessToken(refreshTokenDto)

        const providersToken: AccessToken = {
            access_token: "fakeTokenAccess",
        }

        expect(resultFunction).toEqual(providersToken)
        done()
    })
    it("should throw TokenNotAvailableException", async (done) => {
        const exceptedError = "Token is not available"
        jwtRefreshTokenService.isTokenAvailable = async () => false
        try {
            await authRefreshTokenService.postAccessToken(refreshTokenDto)
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        done()
    })
  })
})
