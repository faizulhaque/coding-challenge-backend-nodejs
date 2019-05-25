import { Database } from '../models/';
import { SBCPLogger } from '../../src/services';
import * as Logger from 'bunyan';
const loggerInstance: Logger = new SBCPLogger('SBCP-API').createLogger();

export const bootstrap = async (): Promise<boolean> => {
    let key: string = '';
    try {
        // Testing Database connection
        key = 'database';
        await Database.authenticate();
        loggerInstance.info('database connected');

    } catch (err) {
        await Database.close();
        loggerInstance.error('Error while authenticating %s', key);
        throw err;
    }
    return Promise.resolve(true);
};

export const logger = loggerInstance;
