import {
    IUser,
} from '../interfaces';
import {
    validate
} from '../validations';
import * as Boom from '@hapi/boom';
import * as _ from 'lodash';
import * as joiSchema from '../validations/schemas/index';

import * as userRepository from '../repositories/user';
import * as caseRepository from '../repositories/case';
import { Role } from '../constants/role';

export const addPolice = async (payload: IUser) => {
    payload = validate(payload, joiSchema.addPolice);
    const userObject = await userRepository.createUser(payload, Role.PoliceOfficer);
    if (userObject) {
        await caseRepository.assignOpenCase(userObject.dataValues.id);
    }
    return userObject;
};

export const removePolice = async (policeId?: number) => {
    const payload = validate({id: policeId}, joiSchema.removePolice);

    const policeObject = await userRepository.getPoliceOfficer(Number(payload.id));
    if (!policeObject) {
        // TODO error message can be moved to constants.
        throw Boom.badRequest('Invalid police officer id provided.');
    }
    const pendingCases = _.find(policeObject.dataValues.cases, {isResolved: false});
    if (!_.isEmpty(pendingCases)) {
        // TODO error message can be moved to constants.
        throw Boom.badRequest('Police officer having pending case can\'t be removed.');
    }
    return userRepository.removePolice(Number(payload.id));
};
