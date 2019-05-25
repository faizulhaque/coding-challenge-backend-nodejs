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

import * as dbRepository from '../src/repositories/db';
import * as bikeRepository from '../src/repositories/bike';
import * as userRepository from '../src/repositories/user';
import * as caseRepository from '../src/repositories/case';

import * as bikeService from '../src/services/bike';

describe('Report Stolen Bike Negative Cases', () => {
    test('Missing Full Name', async () => {
        const fullNameValidationError = new Error(
            'child "fullName" fails because ["fullName" is required]'
        );
        const payload: any = {};
        return expect(bikeService.report(payload))
            .rejects.toEqual(fullNameValidationError);
    });
    test('Missing License Number', async () => {
        const licenseNumberValidationError = new Error(
            'child "licenseNumber" fails because ["licenseNumber" is required]'
        );
        const payload: any = { fullName: 'abc' };
        return expect(bikeService.report(payload))
            .rejects.toEqual(licenseNumberValidationError);
    });
    test('Missing Date', async () => {
        const dateValidationError = new Error(
            'child "date" fails because ["date" is required]'
        );
        const payload: any = { fullName: 'abc', licenseNumber: 'abc' };
        return expect(bikeService.report(payload))
            .rejects.toEqual(dateValidationError);
    });
    test('Missing Description', async () => {
        const descriptionValidationError = new Error(
            'child "description" fails because ["description" is required]'
        );
        const payload: any = {
            fullName: 'abc',
            licenseNumber: 'abc',
            date: '2019-05-25T06:41:30.065Z'
        };
        return expect(bikeService.report(payload))
            .rejects.toEqual(descriptionValidationError);
    });
    test('Missing Color', async () => {
        const colorValidationError = new Error(
            'child "color" fails because ["color" is required]'
        );
        const payload: any = {
            fullName: 'abc',
            licenseNumber: 'abc',
            date: '2019-05-25T06:41:30.065Z',
            description: 'abc'
        };
        return expect(bikeService.report(payload))
            .rejects.toEqual(colorValidationError);
    });
    test('Missing Type', async () => {
        const typeValidationError = new Error(
            'child "type" fails because ["type" is required]'
        );
        const payload: any = {
            fullName: 'abc',
            licenseNumber: 'abc',
            date: '2019-05-25T06:41:30.065Z',
            description: 'abc',
            color: 'red'
        };
        return expect(bikeService.report(payload))
            .rejects.toEqual(typeValidationError);
    });
});

describe('Report Stolen Bike Positive Case', () => {
    test('Should Insert and Return CaseId', async () => {
        const mockBike = {
            dataValues: {
                id: 1
            }
        };
        const mockPoliceOfficer = {
            dataValues: {
                id: 1
            }
        };
        const mockCaseFile = {
            dataValues: {
                id: 1
            }
        };
        Object.defineProperty(dbRepository, 'getTransaction',
        { value: jest.fn().mockImplementation(() => Promise.resolve({
            commit: () => {
                return Promise.resolve();
            },
            rollback: () => {
                return Promise.resolve();
            }
        })) });
        Object.defineProperty(bikeRepository, 'report',
        { value: jest.fn().mockImplementation(() => Promise.resolve(mockBike)) });
        Object.defineProperty(userRepository, 'getAvailablePoliceOfficer',
        { value: jest.fn().mockImplementation(() => Promise.resolve(mockPoliceOfficer)) });
        Object.defineProperty(caseRepository, 'fileACase',
        { value: jest.fn().mockImplementation(() => Promise.resolve(mockCaseFile)) });

        const payload: any = {
            fullName: 'Faiz',
            licenseNumber: 'pqr',
            date: '2019-05-25T06:41:30.065Z',
            description: 'Stolen 3 also',
            color: 'red',
            type: 'm'
        };
        return expect(bikeService.report(payload))
            .resolves.toEqual({caseId: mockCaseFile.dataValues.id});
    });
});
