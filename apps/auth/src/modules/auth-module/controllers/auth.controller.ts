import { Controller, UseGuards, Post, Body, UseFilters } from "@nestjs/common"

import { ClassValidationExceptionFilter } from "@app/lib-global-nest/exception-filters"
import { JwtRefreshTokenAuthGuard } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/guards/jwt-access-token.guard"
import { RefreshTokenDto } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/validations/refresh-token"

import { UserConnectionDto } from "../validations/user-connection"
import { AuthRefreshTokenService } from "../providers/auth-refresh-token.service"
import { AuthRegisterService } from "../providers/auth-register.service"
import { ProvidersToken } from "../types/providers-token.type"

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthRefreshTokenService,
    private readonly authRegisterService: AuthRegisterService,
  ) {}

  @Post("register")
  @UseFilters(ClassValidationExceptionFilter)
  async postRegister(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<ProvidersToken> {
    return await this.authRegisterService.postRegister(userConnectionDto)
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
