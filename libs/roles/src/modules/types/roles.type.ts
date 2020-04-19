export const ROLES = "roles"

export enum USER_ROLES {
    ADMIN = "ADMIN",
    BASIC = "BASIC",
}

// Provide all roles, even if @Roles don't include it
export const ADMIN_ROLES = USER_ROLES.ADMIN
