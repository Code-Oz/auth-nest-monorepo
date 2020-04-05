import { Injectable, HttpException } from "@nestjs/common"
import { JwtAccessTokenProvider } from "@app/jwt-access-token"
import { UserConnectionDto } from "../validations/user-connection"
import { UserService } from "@app/user"
import { UserAlreadyExistException } from "../custom-errors/user-already-exist.exception"

@Injectable()
export class AuthService {
  constructor(
    private jwtAccessTokenProvider: JwtAccessTokenProvider,
    private userService: UserService,
  ) {}

  getHello(): string {
    return "Hello World!"
  }

  async register(userConnectionDto: UserConnectionDto): Promise<object> {
    const { email } = userConnectionDto
    const isExistingUser = await this.userService.isExistUser(email)

    if (isExistingUser) {
      throw new UserAlreadyExistException()
    }

    return this.jwtAccessTokenProvider.provideAccessToken({ toto: "ok" })
  }
}
