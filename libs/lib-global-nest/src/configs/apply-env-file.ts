// Use to load correct .env file depending on current context (dev or test)
export const applyEnvFile = (): string => {
    switch (process.env.NODE_ENV) {
        case "dev":
            return ".dev.env"
        case "test":
            return ".test.env"
        default:
            throw new Error("Please enter a valid NODE_ENV in your command")
    }
}
