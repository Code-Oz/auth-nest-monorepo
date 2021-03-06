import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"

import { getVariableEnvironment, GlobalNestModule } from "@lib/global-nest"
import { RolesModule } from "@libs/roles"

import { JwtRefreshTokenProvider } from "./providers/jwt-refresh-token.provider"
import { JwtRefreshTokenStrategy } from "./providers/jwt-refresh-token.strategy"
import { JwtRefreshTokenService } from "./providers/jwt-refresh-token.service"
import { JwtRefreshTokenAuthGuard } from "./guards/jwt-access-token.guard"
import { REFRESH_TOKEN_COLLECTION } from "./types/refresh-collections.types"
import { RefreshTokenSchema } from "./schemas/refresh-token.schema"
import { JwtRefreshTokenDatabaseCreation, JwtRefreshTokenDatabaseFind, JwtRefreshTokenDatabaseUpdate } from "./providers/database-layers"

@Module({
    imports: [
        GlobalNestModule,
        RolesModule,
        JwtModule.register({
            secret: getVariableEnvironment("JWT_REFRESH_TOKEN_SECRET"),
            signOptions: { expiresIn: getVariableEnvironment("JWT_REFRESH_TOKEN_EXPIRE_IN") },
        }),
        MongooseModule.forRoot(getVariableEnvironment("MONGO_DB_STRING_CONNECTION")),
        MongooseModule.forFeature([
            {
                name: REFRESH_TOKEN_COLLECTION,
                schema: RefreshTokenSchema,
            },
        ]),
    ],
    providers: [
        JwtRefreshTokenProvider,
        JwtRefreshTokenService,
        JwtRefreshTokenStrategy,
        JwtRefreshTokenAuthGuard,
        JwtRefreshTokenDatabaseCreation,
        JwtRefreshTokenDatabaseFind,
        JwtRefreshTokenDatabaseUpdate,
    ],
    exports: [
        JwtRefreshTokenProvider,
        JwtRefreshTokenService,
        JwtRefreshTokenAuthGuard,
    ],
})
export class JwtRefreshTokenModule {}
