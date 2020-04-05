import { Module } from "@nestjs/common"
import { AuthController } from "./controllers/auth.controller"
import { AuthService } from "./providers/auth.services"
import { UserModule } from "@app/user"

@Module({
  imports: [
    UserModule,
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
})
export class AuthModule {}
