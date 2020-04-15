import { Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"

import { UserModule } from "@app/user"
import { GlobalExceptionFilter, LibGlobalNestModule } from "@app/lib-global-nest"
import { JwtAccessTokenModule } from "@app/jwt-access-token"
import { JwtRefreshTokenModule } from "@app/jwt-refresh-token"
import { JwtPasswordTokenModule } from "@app/jwt-password-token"
import { EmailFactoryModule } from "@app/email-factory"

import { AuthController } from "./controllers/auth.controller"
import { AuthRefreshTokenService } from "./providers/auth-refresh-token.service"
import { AuthRegisterService } from "./providers/auth-register.service"
import { AuthLoginService } from "./providers/auth-login.service"
import { AuthLogoutService } from "./providers/auth-logout.service"
import { AuthResetPasswordService } from "./providers/auth-reset-password.service"
import { AuthChangePasswordService } from "./providers/auth-change-password.service"

@Module({
  imports: [
    LibGlobalNestModule,
    UserModule,
    JwtAccessTokenModule,
    JwtRefreshTokenModule,
    JwtPasswordTokenModule,
    EmailFactoryModule,
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
    AuthLogoutService,
    AuthResetPasswordService,
    AuthChangePasswordService,
  ],
})
export class AuthModule {}
