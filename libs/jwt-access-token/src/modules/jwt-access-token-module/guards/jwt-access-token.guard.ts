import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard("access-token") {}
