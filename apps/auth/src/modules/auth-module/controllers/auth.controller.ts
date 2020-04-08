import { Controller, UseGuards, Post, Body, UseFilters } from "@nestjs/common"

import { ClassValidationExceptionFilter } from "@app/lib-global-nest/exception-filters"
import { JwtRefreshTokenAuthGuard, RefreshTokenDto } from "@app/jwt-refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { UserRegisterDto } from "../validations/user-register"
import { ProvidersToken } from "../types/providers-token.type"
import { AuthRefreshTokenService } from "../providers/auth-refresh-token.service"
import { AuthRegisterService } from "../providers/auth-register.service"
import { AuthLoginService } from "../providers/auth-login.service"
import { AuthLogoutService } from "../providers/auth-logout.service"

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthRefreshTokenService,
    private readonly authRegisterService: AuthRegisterService,
    private readonly authLoginService: AuthLoginService,
    private readonly authLogoutService: AuthLogoutService,
  ) {}

  @Post("register")
  @UseFilters(ClassValidationExceptionFilter)
  async postRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<{ message: string }> {
    return await this.authRegisterService.postRegister(userRegisterDto)
  }

  @Post("login")
  @UseFilters(ClassValidationExceptionFilter)
  async postLogin(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<ProvidersToken> {
    return await this.authLoginService.postLogin(userConnectionDto)
  }

  @Post("logout")
  @UseFilters(ClassValidationExceptionFilter)
  @UseGuards(JwtRefreshTokenAuthGuard)
  async postLogout(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ message: string }> {
    return await this.authLogoutService.postLogout(refreshTokenDto)
  }

  @Post("access_token")
  @UseFilters(ClassValidationExceptionFilter)
  @UseGuards(JwtRefreshTokenAuthGuard)
  async postAccessToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ProvidersToken> {
    return await this.authService.postAccessToken(refreshTokenDto.refreshToken)
  }

}
