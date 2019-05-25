import * as Boom from '@hapi/boom';
import * as caseRepository from '../repositories/case';

export const resolveCase = async (caseId: number) => {

    if (!caseId) {
        // TODO error message can be moved to constants.
        throw Boom.badRequest('Invalid caseId provided.');
    }
    const caseObject = await caseRepository.findCase(caseId);
    if (!caseObject) {
        // TODO error message can be moved to constants.
        throw Boom.badRequest('case not found.');
    }
    if (caseObject.dataValues.isResolved) {
        // TODO error message can be moved to constants.
        throw Boom.badRequest('case is already in resolved state.');
    }
    await caseRepository.resolveCase(caseId);
    await caseRepository.assignOpenCase(Number(caseObject.dataValues.policeOfficerId));
    return 'success';
};
