export const userServiceMock = {
    isExistUser: () => false,
    createUser: () => {
        return {
            email: "toto@toto.fr",
            password: "toto",
        }
    },
}
