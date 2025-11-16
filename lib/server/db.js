import { Client } from 'pg';
import config from './config.js';


export function getClient() { 
    const client = new Client({
        connectionString: config.POSTGRES_URL,
    });
    return client;
}



