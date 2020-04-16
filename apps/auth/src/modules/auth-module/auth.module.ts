import { Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"

import { UserModule } from "@lib/user"
import { GlobalExceptionFilter, GlobalNestModule } from "@lib/global-nest"
import { JwtAccessTokenModule } from "@lib/jwt-access-token"
import { JwtRefreshTokenModule } from "@lib/jwt-refresh-token"
import { JwtPasswordTokenModule } from "@lib/jwt-password-token"
import { EmailFactoryModule } from "@lib/email-factory"

import { AuthController } from "./controllers/auth.controller"
import { AuthRefreshTokenService } from "./providers/auth-refresh-token.service"
import { AuthRegisterService } from "./providers/auth-register.service"
import { AuthLoginService } from "./providers/auth-login.service"
import { AuthLogoutService } from "./providers/auth-logout.service"
import { AuthResetPasswordService } from "./providers/auth-reset-password.service"
import { AuthChangePasswordService } from "./providers/auth-change-password.service"

@Module({
    imports: [
        GlobalNestModule,
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
