import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthResetPasswordService {
  constructor(
  ) {}

  async postResetPassword(refreshTokenDto: any): Promise<{ message: string }> {
    return {
      message: "An email has been send.",
    }
  }

}
