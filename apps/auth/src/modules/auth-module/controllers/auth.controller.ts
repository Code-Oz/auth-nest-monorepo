import { Controller, Get, UseGuards, Post, Body, UseFilters } from "@nestjs/common"
import { JwtAccessTokenAuthGuard } from "@app/jwt-access-token/modules/jwt-access-token-module/guards/jwt-access-token.guard"

import { AuthService } from "../providers/auth.services"
import { UserConnectionDto } from "../validations/user-connection"
import { ClassValidationExceptionFilter } from "../exception-filters/class-validation.exception-filter"

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post("register")
  @UseFilters(ClassValidationExceptionFilter)
  register(
    @Body() userConnectionDto: UserConnectionDto,
  ): object {
    return this.appService.register(userConnectionDto)
  }

  @Get("hello")
  @UseGuards(JwtAccessTokenAuthGuard)
  getHello(): string {
    return this.appService.getHello()
  }
}
