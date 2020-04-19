import { USER_ROLES } from "@libs/roles/modules/types"

export interface AccessTokenPayload {
    userId: string
    userEmail: string
    userRoles: USER_ROLES[]
}
