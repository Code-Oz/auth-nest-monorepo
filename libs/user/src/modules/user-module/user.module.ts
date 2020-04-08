import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { UserService } from "./providers/user.service"
import { UserCredentialService } from "./providers/user-credential.service"
import { UserSchema } from "./schemas/user.schema"
import { USERS_COLLECTION } from "./types/collection.types"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/nest"),
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
