import { Module } from "@nestjs/common"
import { AuthController } from "./controllers/auth.controller"
import { AuthService } from "./providers/auth.services"
import { UserModule } from "@app/user"
import { JwtAccessTokenModule } from "@app/jwt-access-token"

@Module({
  imports: [
    UserModule,
    JwtAccessTokenModule,
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {}
