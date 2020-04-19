import { SetMetadata } from "@nestjs/common"
import { ROLES } from "../types/roles.type"

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles)
