import { intersectionWith } from "lodash"

import { Injectable } from "@nestjs/common"
import { USER_ROLES, ADMIN_ROLES } from "../types"

@Injectable()
export class RolesService {

    public matchRoles(roles: string[], userRoles: USER_ROLES[]): boolean {
        if (!!userRoles?.includes(ADMIN_ROLES)) {
            return true
        }

        const rolesIntersection = intersectionWith(roles, userRoles, this.compareRoles)
        return !!rolesIntersection.length
    }

    private compareRoles(first: string, second: USER_ROLES): boolean {
        return !!first && !!second && first === second
    }
}
