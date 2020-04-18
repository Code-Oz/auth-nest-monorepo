export const jwtRefreshTokenServiceMock = {
    isTokenExist: () => false,
    saveToken: () => true,
    isTokenAvailable: () => true,
    makeSingletonConnection: jest.fn(),
    changeStatusToken: jest.fn(),
}
