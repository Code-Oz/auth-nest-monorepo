import { Controller, UseGuards, Post, Body, UseFilters } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"

import { DecodedToken, ClassValidationExceptionFilter, HashPassword } from "@app/lib-global-nest"
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

import { PostRegisterResponse201 } from "./response-messages/post-register-response"
import { PostLogoutResponse201 } from "./response-messages/post-logout-response"
import { PostChangePasswordResponse201 } from "./response-messages/post-change-password-response"
import { PostResetPasswordResponse201 } from "./response-messages/post-reset-password-response"

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
  @ApiResponse({ status: 201, description: "When user succeeded to regist", type: PostRegisterResponse201 })
  @ApiResponse({ status: 400, description: "Class Validation error" })
  @ApiResponse({ status: 409, description: "User already register" })
  async postRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @HashPassword("password") hashedPassword: { [field: string]: string },
  ): Promise<MessageResponse> {
    return await this.authRegisterService.postRegister({ ...userRegisterDto, ...hashedPassword })
  }

  @Post("login")
  @ApiOperation({ summary: "Login user in the application with email and password" })
  @ApiResponse({ status: 201, description: "When user succeeded to login", type: ProvidersToken })
  @ApiResponse({ status: 400, description: "Class Validation error" })
  @ApiResponse({ status: 403, description: "Wrong Credential" })
  async postLogin(
    @Body() userConnectionDto: UserConnectionDto,
  ): Promise<ProvidersToken> {
    return await this.authLoginService.postLogin(userConnectionDto)
  }

  @Post("logout")
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiOperation({ summary: "Logout user on the application" })
  @ApiResponse({ status: 201, description: "When user succeeded to logout", type: PostLogoutResponse201 })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Token is not available in db" })
  @ApiBearerAuth("refresh-token")
  async postLogout(
    @DecodedToken() refreshTokenPayload: RefreshTokenPayload,
  ): Promise<MessageResponse> {
    return await this.authLogoutService.postLogout(refreshTokenPayload)
  }

  @Post("reset_password")
  @ApiOperation({ summary: "Send email to user for giving him mail in order to change password user" })
  @ApiResponse({ status: 201, description: "Email for reseting password has been send to email if exist", type: PostResetPasswordResponse201 })
  async postResetPassword(
    @Body() userEmailDto: UserEmailDto,
  ): Promise<MessageResponse> {
    return await this.authResetPasswordService.postResetPassword(userEmailDto)
  }

  @Post("change_password")
  @UseGuards(JwtPasswordTokenAuthGuard)
  @ApiOperation({ summary: "Logout user on the application" })
  @ApiResponse({ status: 201, description: "Change password user thanks to token given in email", type: PostChangePasswordResponse201 })
  @ApiBearerAuth("password-token")
  async postChangePassword(
    @DecodedToken() passwordTokenPayload: PasswordTokenPayload,
    @Body() changePasswordTokenDto: ChangePasswordDto,
    @HashPassword("password") hashedPassword: { [field: string]: string },
  ): Promise<MessageResponse> {
    return await this.authChangePasswordService.postChangePassword({ ...changePasswordTokenDto, ...hashedPassword }, passwordTokenPayload)
  }

  @Post("access_token")
  @UseGuards(JwtRefreshTokenAuthGuard)
  @ApiOperation({ summary: "Give a new access token from refresh token for accessing to API" })
  @ApiResponse({ status: 201, description: "Get new access token", type: AccessToken })
  @ApiResponse({ status: 403, description: "Token is not available" })
  @ApiBearerAuth("refresh-token")
  async postAccessToken(
    @DecodedToken() refreshTokenPayload: RefreshTokenPayload,
  ): Promise<AccessToken> {
    return await this.authService.postAccessToken(refreshTokenPayload)
  }

}
