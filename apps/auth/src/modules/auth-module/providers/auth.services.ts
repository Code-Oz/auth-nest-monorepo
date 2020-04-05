import { Injectable } from "@nestjs/common"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"

@Injectable()
export class AuthService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  getToken(): object {
    return this.jwtAccessTokenProvider.provideAccessToken({ toto: "ok" })
  }
}
