
import { Test } from "@nestjs/testing"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"
import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"
import { UserService } from "@app/user"

import { userServiceMock } from "../__mocks__/user-service.mock"
import { jwtRefreshTokenServiceMock } from "../__mocks__/jwt-refresh-token-service.mock"
import { jwtAccessTokenProviderMock } from "../__mocks__/jwt-access-token-provider.mock"
import { jwtRefreshTokenProviderMock } from "../__mocks__/jwt-refresh-token-provider.mock"
import { ProvidersToken } from "../../types/providers-token.type"
import { AuthRegisterService } from "../auth-register.service"

describe("AuthRegister", () => {
  let authRegisterService: AuthRegisterService
  let userService: UserService
  let jwtAccessTokenProvider: JwtAccessTokenProvider
  let jwtRefreshTokenProvider: JwtRefreshTokenProvider
  let jwtRefreshTokenService: JwtRefreshTokenService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
            AuthRegisterService,
            { provide: JwtAccessTokenProvider, useValue: { ...jwtAccessTokenProviderMock } },
            { provide: JwtRefreshTokenProvider, useValue: { ...jwtRefreshTokenProviderMock } },
            { provide: JwtRefreshTokenService, useValue: { ...jwtRefreshTokenServiceMock } },
            { provide: UserService, useValue: { ...userServiceMock } },
        ],
      })
      .compile()

    authRegisterService = moduleRef.get<AuthRegisterService>(AuthRegisterService)
    userService = moduleRef.get<UserService>(UserService)
    jwtAccessTokenProvider = moduleRef.get<JwtAccessTokenProvider>(JwtAccessTokenProvider)
    jwtRefreshTokenProvider = moduleRef.get<JwtRefreshTokenProvider>(JwtRefreshTokenProvider)
    jwtRefreshTokenService = moduleRef.get<JwtRefreshTokenService>(JwtRefreshTokenService)
  })

  describe("postRegister", () => {
    it("should return access and refresh token", async (done) => {
        const resultFunction = await authRegisterService.postRegister({
            email: "toto@toto.fr",
            password: "toto",
        })

        const providersToken: ProvidersToken = {
            access_token: "fakeTokenAccess",
            refresh_token: "fakeTokenRefresh",
        }

        expect(resultFunction).toEqual(providersToken)
        done()
    })
    it("should throw UserAlreadyExistException", async (done) => {
        const exceptedError = "User already register"
        userService.isExistUser = async () => true
        try {
            await authRegisterService.postRegister({
                email: "toto@toto.fr",
                password: "toto",
            })
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        userService.isExistUser = async () => false
        jwtRefreshTokenService.isTokenExist = async () => true
        try {
            await authRegisterService.postRegister({
                email: "toto@toto.fr",
                password: "toto",
            })
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }
        done()
    })
  })
})
