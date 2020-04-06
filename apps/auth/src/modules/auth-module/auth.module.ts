import { Module } from "@nestjs/common"
import { UserModule } from "@app/user"
import { APP_FILTER } from "@nestjs/core"

import { GlobalExceptionFilter } from "@app/lib-global-nest"
import { JwtAccessTokenModule } from "@app/jwt-access-token"
import { JwtRefreshTokenModule } from "@app/jwt-refresh-token"

import { AuthController } from "./controllers/auth.controller"
import { AuthService } from "./providers/auth.services"

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
    AuthService,
  ],
})
export class AuthModule {}
