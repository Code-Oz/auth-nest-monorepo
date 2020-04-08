import { Injectable } from "@nestjs/common"

@Injectable()
export class UserCredentialService {

    public checkingCredentialPassword(
        passwordFromRequest: string,
        passwordFromDb: string,
    ): boolean {
        return passwordFromRequest === passwordFromDb
    }
}
