
import { Test } from "@nestjs/testing"
import { RolesService } from ".."
import { ADMIN_ROLES } from "../../types"

describe("RolesService", () => {
  let rolesService: RolesService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [
            RolesService,
        ],
      })
      .compile()

    rolesService = moduleRef.get<RolesService>(RolesService)
  })

  describe("matchRoles function", () => {
    it("should return true: admin roles", (done) => {
        const roles = [ "any", "any2" ]
        const userRoles = [ ADMIN_ROLES ]
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(true)
        done()
    })
    it("should return true: user roles match", (done) => {
        const roles = [ "any", "any2" ]
        const userRoles = [ "any" ] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)
        expect(isGranted).toBe(true)

        const roles2 = [ "any", "any2" ]
        const userRoles2 = [ "any", "any2" ] as any
        const isGranted2 = rolesService.matchRoles(roles2, userRoles2)
        expect(isGranted2).toBe(true)

        const roles3 = [ "any1", "any2", "any3" ]
        const userRoles3 = [ "any1", "any2" ] as any
        const isGranted3 = rolesService.matchRoles(roles3, userRoles3)
        expect(isGranted3).toBe(true)

        const roles4 = [ "any1", "any2" ]
        const userRoles4 = [ "any1", "any2", "any3"  ] as any
        const isGranted4 = rolesService.matchRoles(roles4, userRoles4)
        expect(isGranted4).toBe(true)

        done()
    })
    it("should return false: userRoles and roles have undefined value", (done) => {
        const roles = [ undefined ] as any
        const userRoles = [ undefined ] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
    it("should return false: userRoles have undefined value", (done) => {
        const roles = [ "any1" ] as any
        const userRoles = [ undefined ] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
    it("should return false: roles have undefined value", (done) => {
        const roles = [ undefined ] as any
        const userRoles = [ "any1" ] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
    it("should return false: user don't have roles", (done) => {
        const roles = [ "any", "any2" ]
        const userRoles = [ "toto" ] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
    it("should return false: user role undefined", (done) => {
        const roles = [ "any", "any2" ]
        const userRoles = undefined as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
    it("should return false: user role length === 0", (done) => {
        const roles = [ "any", "any2" ]
        const userRoles = [] as any
        const isGranted = rolesService.matchRoles(roles, userRoles)

        expect(isGranted).toBe(false)
        done()
    })
  })
})
