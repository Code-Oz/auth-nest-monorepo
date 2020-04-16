import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule } from "@nestjs/config"

import { getVariableEnvironment, LibGlobalNestModule } from "@app/lib-global-nest"

import { UserService } from "./providers/user.service"
import { UserCredentialService } from "./providers/user-credential.service"
import { UserSchema } from "./schemas/user.schema"
import { USERS_COLLECTION } from "./types/collection.types"

@Module({
    imports: [
        LibGlobalNestModule,
        MongooseModule.forRoot(getVariableEnvironment("MONGO_DB_STRING_CONNECTION")),
        MongooseModule.forFeature([{ name: USERS_COLLECTION, schema: UserSchema }]),
    ],
    providers: [
        UserService,
        UserCredentialService,
    ],
    exports: [
        UserService,
        UserCredentialService,
    ],
})
export class UserModule {}
