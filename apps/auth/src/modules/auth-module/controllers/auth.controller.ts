import { Controller, UseGuards, Post, Body, UseFilters } from "@nestjs/common"

import { ClassValidationExceptionFilter } from "@app/lib-global-nest/exception-filters"
import { JwtRefreshTokenAuthGuard } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/guards/jwt-access-token.guard"
import { RefreshTokenDto } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/validations/refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { UserRegisterDto } from "../validations/user-register"
import { ProvidersToken } from "../types/providers-token.type"
import { AuthRefreshTokenService } from "../providers/auth-refresh-token.service"
import { AuthRegisterService } from "../providers/auth-register.service"
import { AuthLoginService } from "../providers/auth-login.service"

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthRefreshTokenService,
    private readonly authRegisterService: AuthRegisterService,
    private readonly authLoginService: AuthLoginService,
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

  @Post("access_token")
  @UseFilters(ClassValidationExceptionFilter)
  @UseGuards(JwtRefreshTokenAuthGuard)
  async postAccessToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ProvidersToken> {
    return await this.authService.postAccessToken(refreshTokenDto.refreshToken)
  }

}
