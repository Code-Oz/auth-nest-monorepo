import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, "access-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "fake-access-token",
    })
  }

  async validate(payload: any) {
    return payload
  }
}
