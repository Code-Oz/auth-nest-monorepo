import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "refresh-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "fake-refresh-token",
    })
  }

  async validate(payload: any) {
    return payload
  }
}
