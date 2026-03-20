import * as fs from 'node:fs'
import * as path from 'node:path'
import dotenv, { type DotenvParseOutput } from 'dotenv'

const dotEnvToMap = (parsed: DotenvParseOutput) => {
    
    return Object.keys(parsed).reduce((acc, it) => {
        acc[it] = process.env[it]
        return acc
    }, {} as Record<string, string | undefined>)
    
}

export const getEnvironmentVars = (): Record<string, string | undefined> => {
    
    const env = path.resolve(__dirname, '../.env')
    const sampleEnv = path.resolve(__dirname, '../sample.env')
    
    if (process.env.IS_CI) {
        const cfg = dotenv.config({ path: sampleEnv })
        const parsed: DotenvParseOutput = cfg.parsed || {}
        
        return dotEnvToMap(parsed)
    }

    if (!fs.existsSync(env)) return {}

    const { parsed } = dotenv.config({ path: env })

    // console.info('Loading env vars from system', parsed)

    return dotEnvToMap(parsed || {})
}

export const loadEnvironment = (existingEnv = null): Record<string, string> => {
    const env = existingEnv || getEnvironmentVars()

    // For Vite, these need to be the fully qualified process notation
    return Object.keys(env).reduce((acc, it) => {
        acc[`process.env.${it}`] = JSON.stringify(env[it])
        return acc
    }, {} as Record<string, string>)
}
