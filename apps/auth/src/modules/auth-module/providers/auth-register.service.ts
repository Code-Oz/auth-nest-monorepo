import { Injectable } from "@nestjs/common"

import { UserService } from "@lib/user"
import { JwtRefreshTokenService } from "@lib/jwt-refresh-token"

import { UserConnectionDto } from "../validations/user-connection.dto"
import { UserAlreadyExistException } from "../custom-errors/user-already-exist.exception"
import { MessageResponse } from "../types/message-response.types"
import { postRegisterResponseMessage } from "../controllers/response-messages/post-register-response"

@Injectable()
export class AuthRegisterService {
    constructor(
        private jwtRefreshTokenService: JwtRefreshTokenService,
        private userService: UserService,
    ) {}

    async postRegister(userConnectionDto: UserConnectionDto): Promise<MessageResponse> {
        const { email, password } = userConnectionDto
        const isExistingUser = await this.userService.isExistUser(email)
        const isTokenExist = await this.jwtRefreshTokenService.isTokenExist(email)

        if (isExistingUser || isTokenExist) {
            throw new UserAlreadyExistException()
        }

        await this.userService.createUser({ email, password })

        return {
            message: postRegisterResponseMessage,
        }
    }
}
