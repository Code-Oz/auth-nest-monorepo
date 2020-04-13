import { Controller, UseGuards, Post, Body, UseFilters } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"

import { AuthUser, ClassValidationExceptionFilter } from "@app/lib-global-nest"
import { JwtRefreshTokenAuthGuard, RefreshTokenPayload } from "@app/jwt-refresh-token"
import { JwtPasswordTokenAuthGuard, PasswordTokenPayload } from "@app/jwt-password-token"

import { UserConnectionDto } from "../validations/user-connection.dto"
import { UserRegisterDto } from "../validations/user-register.dto"
import { UserEmailDto } from "../validations/user-email.dto"
import { ChangePasswordDto } from "../validations/change-password.dto"
import { ProvidersToken } from "../types/providers-token.type"
import { AccessToken } from "../types/access-token.type"
import { MessageResponse } from "../types/message-response.types"
import { AuthRefreshTokenService } from "../providers/auth-refresh-token.service"
import { AuthRegisterService } from "../providers/auth-register.service"
import { AuthLoginService } from "../providers/auth-login.service"
import { AuthLogoutService } from "../providers/auth-logout.service"
import { AuthResetPasswordService } from "../providers/auth-reset-password.service"
import { AuthChangePasswordService } from "../providers/auth-change-password.service"

import { MessageResponsePostRegister } from "../swagger/types/post-register/message-response-post-register.class"
import { MessageErrorPostRegister } from "../swagger/types/post-register/message-error-post-register.class"

@UseFilters(ClassValidationExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
    private readonly authLoginService: AuthLoginService,
    private readonly authLogoutService: AuthLogoutService,
    private readonly authResetPasswordService: AuthResetPasswordService,
    private readonly authChangePasswordService: AuthChangePasswordService,
    private readonly authService: AuthRefreshTokenService,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register user in the application" })
  @ApiResponse({ status: 201, description: "User has been register", type: MessageResponsePostRegister })
  // Regroup error exception filter return typage for type MessageErrorPostRegister correctly
  @ApiResponse({ status: 400, description: "Error: Bad Request", type: MessageErrorPostRegister })
  async postRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<MessageResponse> {
    return await this.authRegisterService.postRegister(userRegisterDto)
  }

  @Post("login")
  async postLogin(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<ProvidersToken> {
    return await this.authLoginService.postLogin(userConnectionDto)
  }

  @Post("logout")
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiBearerAuth("refresh-token")
  async postLogout(
    @AuthUser() authUser: RefreshTokenPayload,
  ): Promise<MessageResponse> {
    return await this.authLogoutService.postLogout(authUser)
  }

  @Post("reset_password")
  async postResetPassword(
    @Body() userEmailDto: UserEmailDto,
  ): Promise<MessageResponse> {
    return await this.authResetPasswordService.postResetPassword(userEmailDto)
  }

  @Post("change_password")
  @UseGuards(JwtPasswordTokenAuthGuard)
  @ApiBearerAuth("password-token")
  async postChangePassword(
    @AuthUser() authUser: PasswordTokenPayload,
    @Body() changePasswordTokenDto: ChangePasswordDto,
  ): Promise<MessageResponse> {
    return await this.authChangePasswordService.postChangePassword(changePasswordTokenDto, authUser)
  }

  @Post("access_token")
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiBearerAuth("refresh-token")
  async postAccessToken(
    @AuthUser() authUser: RefreshTokenPayload,
  ): Promise<AccessToken> {
    return await this.authService.postAccessToken(authUser)
  }

}
