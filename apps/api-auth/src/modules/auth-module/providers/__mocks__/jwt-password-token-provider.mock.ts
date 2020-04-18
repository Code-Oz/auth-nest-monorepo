export const jwtPasswordTokenProviderMock = {
    providePasswordToken: () => {
        return {
            password_token: "fakePasswordToken",
        }
    },
}
