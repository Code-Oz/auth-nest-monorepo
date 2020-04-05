import { Injectable } from "@nestjs/common"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { UserConnectionDto } from "../validations/user-connection"

@Injectable()
export class AuthService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  register(userConnectionDto: UserConnectionDto): object {
    const { email, password } = userConnectionDto
    return this.jwtAccessTokenProvider.provideAccessToken({ toto: "ok" })
  }
}
