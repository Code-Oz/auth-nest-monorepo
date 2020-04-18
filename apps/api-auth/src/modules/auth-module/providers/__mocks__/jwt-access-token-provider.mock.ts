export const jwtAccessTokenProviderMock = {
    provideAccessToken: () => {
        return {
            access_token: "fakeTokenAccess",
        }
    },
}
