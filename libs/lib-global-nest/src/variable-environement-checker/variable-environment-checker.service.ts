export const getVariableEnvironment = (variablekey: string | undefined) => {
    const envVariableValue = process.env[variablekey]
    if (!envVariableValue) {
        throw new Error(`Environment Variable not found: ${variablekey}`)
    }
    return envVariableValue
}
