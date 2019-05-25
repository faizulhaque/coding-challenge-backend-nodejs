jest.mock('../src/interfaces/models', () => {
    return {
        models: {}
    };
});

jest.mock('../src/models', () => {
    return {
        Database: {},
        Models: {}
    };
});

import * as userRepository from '../src/repositories/user';
import * as caseRepository from '../src/repositories/case';

import * as policeService from '../src/services/police';
import { Role } from '../src/constants';
import * as Boom from '@hapi/boom';

describe('Add Police Negative Cases', () => {
    test('Missing Full Name', async () => {
        const fullNameValidationError = new Error(
            'child "fullName" fails because ["fullName" is required]'
        );
        const payload: any = {};
        return expect(policeService.addPolice(payload))
            .rejects.toEqual(fullNameValidationError);
    });
});

describe('Add Police Positive Cases', () => {
    test('Should Insert and Return user Object', async () => {
        const mockPolice = {
            dataValues: {
                id: 1,
                fullName: 'abc',
                roleId: Role.PoliceOfficer
            }
        };
        Object.defineProperty(userRepository, 'createUser',
        { value: jest.fn().mockImplementation(() => Promise.resolve(mockPolice)) });
        Object.defineProperty(caseRepository, 'assignOpenCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve({})) });

        const payload: any = {
            fullName: mockPolice.dataValues.fullName
        };
        return expect(policeService.addPolice(payload))
            .resolves.toEqual(mockPolice);
    });
});

describe('Remove Police Negative Cases', () => {
    test('Missing id', async () => {
        const idValidationError = new Error(
            'child "id" fails because ["id" is required]'
        );
        return expect(policeService.removePolice())
            .rejects.toEqual(idValidationError);
    });
    test('Invalid police Id', async () => {
        Object.defineProperty(userRepository, 'getPoliceOfficer',
        { value: jest.fn().mockImplementation(() => Promise.resolve()) });
        return expect(policeService.removePolice(0))
            .rejects.toEqual(Boom.badRequest('Invalid police officer id provided.'));
    });
    test('Police officer having in-progress case', async () => {
        Object.defineProperty(userRepository, 'getPoliceOfficer',
        { value: jest.fn().mockImplementation(() => Promise.resolve({
            dataValues: {
                cases: [{
                    isResolved: false
                }]
            }
        })) });
        return expect(policeService.removePolice(0))
            .rejects.toEqual(Boom.badRequest('Police officer having pending case can\'t be removed.'));
    });
});

describe('Remove Police Positive Cases', () => {
    test('Should Insert and Return user Object', async () => {
        Object.defineProperty(userRepository, 'getPoliceOfficer',
        { value: jest.fn().mockImplementation(() => Promise.resolve({
            dataValues: {
                cases: [{
                    isResolved: true
                }]
            }
        })) });
        Object.defineProperty(userRepository, 'removePolice',
        { value: jest.fn().mockImplementation(() => Promise.resolve('success')) });
        return expect(policeService.removePolice(0))
            .resolves.toEqual('success');
    });
});
