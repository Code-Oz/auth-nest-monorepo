import { Injectable } from "@nestjs/common"
import { USER_ROLES } from "../types"

@Injectable()
export class RolesGrantedService {

    public grantedBasicUserRole(): USER_ROLES[] {
        return [ USER_ROLES.BASIC ]
    }
}
