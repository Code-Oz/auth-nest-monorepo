import * as bcrypt from "bcrypt"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserCredentialService {
    public async checkingCredentialPassword(
        password: string,
        passwordFromDbHashed: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, passwordFromDbHashed)
    }
}
