import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { ROLES, USER_ROLES } from "../types"
import { RolesService } from "../providers"
import { UserDontHaveRoles } from "../custom-errors"

@Injectable()
export class RolesGuard<TUser extends { roles: USER_ROLES[] }> implements CanActivate {
  constructor(
        private reflector: Reflector,
        private rolesService: RolesService,
    ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get list of roles from SetMedata for this path
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler())
    if (!roles) {
        return true
    }

    const request = context.switchToHttp().getRequest()
    // Get decoded token thanks to JwtGuards
    const user: TUser = request.user
    const isGranted = this.rolesService.matchRoles(roles, user.roles)

    if (!isGranted) {
        throw new UserDontHaveRoles()
    }

    return isGranted
  }
}
