import { Injectable } from "@nestjs/common"

import { UserDocument, UserCreationModel } from "../schemas/user.schema"
import { UserDatabaseCreation, UserDatabaseFind, UserDatabaseUpdate } from "./database-layers"

@Injectable()
export class UserService {
    constructor(
        private userDatabaseCreation: UserDatabaseCreation,
        private userDatabaseFind: UserDatabaseFind,
        private userDatabaseUpdate: UserDatabaseUpdate,
    ) {}

    public async createUser(user: UserCreationModel): Promise<UserDocument> {
        return await this.userDatabaseCreation.createUser(user)
    }

    public async isExistUser(email: string): Promise<boolean> {
        const user = await this.findUserByEmail(email)
        return !!user
    }

    public async findUserByEmail(email: string): Promise<UserDocument> {
        return await this.userDatabaseFind.findUserByEmail(email)
    }

    public async changeUserPassword(email: string, newPassword: string): Promise<void> {
        await this.userDatabaseUpdate.updateOneByEmail(email, { password: newPassword })
    }
}
