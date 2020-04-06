import { Module } from "@nestjs/common"
import { UserModule } from "@app/user"
import { APP_FILTER } from "@nestjs/core"

import { JwtAccessTokenModule } from "@app/jwt-access-token"
import { GlobalExceptionFilter } from "@app/lib-global-nest"

import { AuthController } from "./controllers/auth.controller"
import { AuthService } from "./providers/auth.services"

@Module({
  imports: [
    UserModule,
    JwtAccessTokenModule,
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
