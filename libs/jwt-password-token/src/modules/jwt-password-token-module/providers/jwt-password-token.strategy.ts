import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"

import { getVariableEnvironment } from "@app/lib-global-nest"

@Injectable()
export class JwtPasswordTokenStrategy extends PassportStrategy(Strategy, "password-token") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getVariableEnvironment("JWT_PASSWORD_TOKEN_SECRET"),
    })
  }

  async validate(payload: any) {
    return payload
  }
}
