import { Module } from "@nestjs/common"
import { UserModule } from "@app/user"
import { JwtAccessTokenModule } from "@app/jwt-access-token"
import { APP_FILTER } from "@nestjs/core"

import { AuthController } from "./controllers/auth.controller"
import { AuthService } from "./providers/auth.services"
import { GlobalExceptionFilter } from "./exception-filters/global.exception.filter"

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
