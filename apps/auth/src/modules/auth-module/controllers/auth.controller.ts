import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthService } from "../providers/auth.services"
import { JwtAccessTokenAuthGuard } from "@app/jwt-access-token/modules/jwt-access-token-module/guards/jwt-access-token.guard"

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  getToken(): object {
    return this.appService.getToken()
  }

  @Get("hello")
  @UseGuards(JwtAccessTokenAuthGuard)
  getHello(): string {
    return this.appService.getHello()
  }
}
