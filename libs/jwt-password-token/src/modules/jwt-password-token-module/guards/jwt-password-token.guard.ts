import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtPasswordTokenAuthGuard extends AuthGuard("password-token") {}
