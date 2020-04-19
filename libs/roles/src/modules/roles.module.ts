import { Module } from "@nestjs/common"

import { RolesService, RolesGrantedService } from "./providers"

@Module({
    providers: [ RolesService, RolesGrantedService ],
    exports: [ RolesService, RolesGrantedService ],
})
export class RolesModule {}
