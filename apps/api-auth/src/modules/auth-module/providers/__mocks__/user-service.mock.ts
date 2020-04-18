export const userServiceMock = {
    isExistUser: () => false,
    createUser: () => {
        return {
            email: "toto@toto.fr",
            password: "toto",
        }
    },
    findUserByEmail: () => {
        return {
            email: "toto@toto.fr",
            password: "toto",
        }
    },
    changeUserPassword: () => undefined,
}
