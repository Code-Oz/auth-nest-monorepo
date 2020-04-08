import { Module } from "@nestjs/common"
import { UserModule } from "@app/user"
import { APP_FILTER } from "@nestjs/core"

import { GlobalExceptionFilter } from "@app/lib-global-nest"
import { JwtAccessTokenModule } from "@app/jwt-access-token"
import { JwtRefreshTokenModule } from "@app/jwt-refresh-token"

import { AuthController } from "./controllers/auth.controller"
import { AuthRefreshTokenService } from "./providers/auth-refresh-token.service"
import { AuthRegisterService } from "./providers/auth-register.service"
import { AuthLoginService } from "./providers/auth-login.service"

@Module({
  imports: [
    UserModule,
    JwtAccessTokenModule,
    JwtRefreshTokenModule,
  ],
  controllers: [ AuthController ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    AuthRefreshTokenService,
    AuthRegisterService,
    AuthLoginService,
  ],
})
export class AuthModule {}
