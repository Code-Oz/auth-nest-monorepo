import { Controller, Get } from "@nestjs/common"
import { AuthService } from "../providers/auth.services"

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
