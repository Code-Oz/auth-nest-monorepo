import { USER_ROLES } from "@libs/roles/modules/types"

export interface RefreshTokenPayload {
    userId: string
    userEmail: string
    refreshTokenId: string
    userRoles: USER_ROLES[]
}
