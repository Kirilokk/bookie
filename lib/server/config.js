import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
    POSTGRES_URL: process.env.POSTGRES_URL,
}


export default config;