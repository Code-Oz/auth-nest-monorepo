
import { Test } from "@nestjs/testing"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { JwtRefreshTokenProvider } from "@app/jwt-refresh-token"
import { JwtRefreshTokenService } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/providers/jwt-refresh-token.service"
import { UserCredentialService } from "@app/user/modules/user-module/providers/user-credential.service"
import { UserService } from "@app/user"

import { userServiceMock } from "../__mocks__/user-service.mock"
import { jwtRefreshTokenServiceMock } from "../__mocks__/jwt-refresh-token-service.mock"
import { jwtAccessTokenProviderMock } from "../__mocks__/jwt-access-token-provider.mock"
import { jwtRefreshTokenProviderMock } from "../__mocks__/jwt-refresh-token-provider.mock"
import { userCredentialServiceMock } from "../__mocks__/user-credential-service.mock"
import { AuthLoginService } from "../auth-login.service"

describe("AuthLogin", () => {
  let authRegisterService: AuthLoginService
  let userService: UserService
  let userCredentialService: UserCredentialService
  let jwtAccessTokenProvider: JwtAccessTokenProvider
  let jwtRefreshTokenProvider: JwtRefreshTokenProvider
  let jwtRefreshTokenService: JwtRefreshTokenService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
            AuthLoginService,
            { provide: JwtAccessTokenProvider, useValue: { ...jwtAccessTokenProviderMock } },
            { provide: JwtRefreshTokenProvider, useValue: { ...jwtRefreshTokenProviderMock } },
            { provide: JwtRefreshTokenService, useValue: { ...jwtRefreshTokenServiceMock } },
            { provide: UserService, useValue: { ...userServiceMock } },
            { provide: UserCredentialService, useValue: { ...userCredentialServiceMock } },
        ],
    })
    .compile()

    authRegisterService = moduleRef.get<AuthLoginService>(AuthLoginService)
    userService = moduleRef.get<UserService>(UserService)
    userCredentialService = moduleRef.get<UserCredentialService>(UserCredentialService)
    jwtAccessTokenProvider = moduleRef.get<JwtAccessTokenProvider>(JwtAccessTokenProvider)
    jwtRefreshTokenProvider = moduleRef.get<JwtRefreshTokenProvider>(JwtRefreshTokenProvider)
    jwtRefreshTokenService = moduleRef.get<JwtRefreshTokenService>(JwtRefreshTokenService)
  })

  describe("postLogin", () => {
    it("should return access and refresh token", async (done) => {
        const resultFunction = await authRegisterService.postLogin({
            email: "toto@toto.fr",
            password: "toto",
        })

        const result = {
            refresh_token: "fakeTokenRefresh",
            access_token: "fakeTokenAccess",
        }

        expect(resultFunction).toEqual(result)
        done()
    })
    it("should throw UserWrongCredentialException", async (done) => {
        const exceptedError = "Wrong credential"
        userCredentialService.checkingCredentialPassword = () => false
        try {
            await authRegisterService.postLogin({
                email: "toto@toto.fr",
                password: "toto",
            })
        } catch (e) {
            expect(e.message).toBe(exceptedError)
        }

        userService.findUserByEmail = async () => undefined
        try {
            await authRegisterService.postLogin({
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
