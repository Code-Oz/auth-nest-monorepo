import { Controller, Get, UseGuards, Post, Body, UseFilters } from "@nestjs/common"

import { ClassValidationExceptionFilter } from "@app/lib-global-nest/exception-filters"
import { JwtAccessTokenAuthGuard } from "@app/jwt-access-token/modules/jwt-access-token-module/guards/jwt-access-token.guard"
import { JwtRefreshTokenAuthGuard } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/guards/jwt-access-token.guard"
import { RefreshTokenDto } from "@app/jwt-refresh-token/modules/jwt-refresh-token-module/validations/refresh-token"

import { AuthService } from "../providers/auth.services"
import { UserConnectionDto } from "../validations/user-connection"

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @UseFilters(ClassValidationExceptionFilter)
  async postRegister(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<object> {
    return await this.authService.register(userConnectionDto)
  }

  @Post("access_token")
  @UseFilters(ClassValidationExceptionFilter)
  @UseGuards(JwtRefreshTokenAuthGuard)
  async postAccessToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<object> {
    return await this.authService.postAccessToken(refreshTokenDto.refreshToken)
  }

  @Get("hello")
  @UseGuards(JwtAccessTokenAuthGuard)
  getHello(): string {
    return this.authService.getHello()
  }
}
