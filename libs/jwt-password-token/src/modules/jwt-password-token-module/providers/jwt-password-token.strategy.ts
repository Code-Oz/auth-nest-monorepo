import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtPasswordTokenStrategy extends PassportStrategy(Strategy, "password-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "fake-password-token",
    })
  }

  async validate(payload: any) {
    return payload
  }
}
