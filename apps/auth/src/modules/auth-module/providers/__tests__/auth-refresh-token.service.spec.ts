
import { Test } from "@nestjs/testing"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"
import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"

import { AuthRefreshTokenService } from "../auth-refresh-token.service"
import { jwtRefreshTokenServiceMock } from "../__mocks__/jwt-refresh-token-service.mock"
import { jwtAccessTokenProviderMock } from "../__mocks__/jwt-access-token-provider.mock"
import { jwtRefreshTokenProviderMock } from "../__mocks__/jwt-refresh-token-provider.mock"
import { ProvidersToken } from "../../types/providers-token.type"

describe("AuthRefreshTokenService", () => {
  let authRefreshTokenService: AuthRefreshTokenService
  let jwtAccessTokenProvider: JwtAccessTokenProvider
  let jwtRefreshTokenProvider: JwtRefreshTokenProvider
  let jwtRefreshTokenService: JwtRefreshTokenService

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
  })

  describe("postAccessToken", () => {
    it("should return access and refresh token", async (done) => {
        const resultFunction = await authRefreshTokenService.postAccessToken("fakeTokenRefresh")

        const providersToken: ProvidersToken = {
            access_token: "fakeTokenAccess",
            refresh_token: "fakeTokenRefresh",
        }

        expect(resultFunction).toEqual(providersToken)
        done()
    })
    it("should throw TokenNotAvailableException", async (done) => {
        const exceptedError = "Token is not available"
        jwtRefreshTokenService.isTokenAvailable = async () => false
        try {
            await authRefreshTokenService.postAccessToken("fakeTokenRefresh")
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        done()
    })
  })
})
