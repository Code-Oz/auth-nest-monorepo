import { Controller, Get, UseGuards, Post, Body, UseFilters } from "@nestjs/common"

import { JwtAccessTokenAuthGuard } from "@app/jwt-access-token/modules/jwt-access-token-module/guards/jwt-access-token.guard"
import { ClassValidationExceptionFilter } from "@app/lib-global-nest/exception-filters"

import { AuthService } from "../providers/auth.services"
import { UserConnectionDto } from "../validations/user-connection"

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @UseFilters(ClassValidationExceptionFilter)
  async register(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<object> {
    return await this.authService.register(userConnectionDto)
  }

  @Get("hello")
  @UseGuards(JwtAccessTokenAuthGuard)
  getHello(): string {
    return this.authService.getHello()
  }
}
