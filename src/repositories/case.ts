import { Models } from '../models/index';
import { Transaction } from 'sequelize';
import { ICaseInstance, ICaseAttributes } from '../interfaces/models/case';

const Case = Models.cases;

export const fileACase = async (payload: ICaseAttributes,
                                transaction: Transaction): Promise<ICaseInstance> => {
    return Case.create(payload, { transaction });
};

export const assignOpenCase = async (policeOfficeId: number): Promise<void> => {
    const openCase: ICaseInstance = await Case.findOne({
        where: {
            isResolved: false
        }
    });
    if (openCase) {
        await Case.update({
            policeOfficerId: policeOfficeId
        }, {
            where: {
                id: openCase.dataValues.id
            }
        });
    }
};

export const findCase = async (caseId: number): Promise<ICaseInstance | null> => {
    return Case.findOne({
        where: {
            id: caseId
        }
    });
};

export const resolveCase = async (caseId: number) => {
    return Case.update({
        isResolved: true
    }, {
        where: {
            id: caseId
        }
    });
};
