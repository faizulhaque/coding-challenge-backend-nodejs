import {
    IReportBike,
    ISearchBike,
    IPagination
} from '../interfaces';
import {
    validate
} from '../validations';
import * as joiSchema from '../validations/schemas/index';

import * as bikeRepository from '../repositories/bike';
import * as caseRepository from '../repositories/case';
import * as userRepository from '../repositories/user';
import * as dbRepository from '../repositories/db';
import { Transaction } from 'sequelize';
import { ICaseAttributes } from '../interfaces/models/case';

// import * as Logger from 'bunyan';
// import { SBCPLogger } from '../../src/services';
// const loggerInstance: Logger = new SBCPLogger('SBCP-API').createLogger();

export const report = async (payload: IReportBike) => {
    payload = validate(payload, joiSchema.bikeReport);

    const transaction: Transaction = await dbRepository.getTransaction();
    try {
        // TODO Improvement
        // 1. Duplicate check for already exists bike by
        // licenseNumber or already case exists by licenseNumber

        const [bike, availablePoliceOfficer] = await Promise.all([
            bikeRepository.report(payload, transaction),
            await userRepository.getAvailablePoliceOfficer()
        ]);
        const caseObject: ICaseAttributes = {
            id: 0,
            bikeId: bike.dataValues.id,
            theftDate: payload.date,
            theftDescription: payload.description,
            isResolved: false,
        };
        if (availablePoliceOfficer) {
            caseObject.policeOfficerId = availablePoliceOfficer.dataValues.id;
        }
        const caseFiled = await caseRepository.fileACase(caseObject, transaction);
        await transaction.commit();
        return {
            caseId: caseFiled.dataValues.id
        };
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

export const search = async (payload: ISearchBike, pagination: IPagination) => {
    return bikeRepository.search(payload, pagination);
};
