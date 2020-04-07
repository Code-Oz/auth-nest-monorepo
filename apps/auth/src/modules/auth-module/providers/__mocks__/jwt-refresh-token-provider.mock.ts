export const jwtRefreshTokenProviderMock = {
    provideRefreshToken: () => {
        return {
            refresh_token: "fakeTokenRefresh",
        }
    },
    decodeToken: () => true,
}
