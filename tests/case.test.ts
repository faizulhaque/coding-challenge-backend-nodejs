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

import * as caseRepository from '../src/repositories/case';

import * as caseService from '../src/services/case';

import * as Boom from '@hapi/boom';

describe('Resolve Case Negative Cases', () => {
    test('Invalid Id', async () => {
        return expect(caseService.resolveCase(0))
            .rejects.toEqual(Boom.badRequest('Invalid caseId provided.'));
    });
    test('Invalid Id', async () => {
        Object.defineProperty(caseRepository, 'findCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve()) });
        return expect(caseService.resolveCase(1))
            .rejects.toEqual(Boom.badRequest('case not found.'));
    });
    test('Invalid Id', async () => {
        Object.defineProperty(caseRepository, 'findCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve({
            dataValues: {
                isResolved: true
            }
        })) });
        return expect(caseService.resolveCase(1))
            .rejects.toEqual(Boom.badRequest('case is already in resolved state.'));
    });
});

describe('Resolve Case Positive Cases', () => {
    test('Should mark resolve and Return success', async () => {
        Object.defineProperty(caseRepository, 'findCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve({
            dataValues: {
                isResolved: false
            }
        })) });
        Object.defineProperty(caseRepository, 'resolveCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve()) });
        Object.defineProperty(caseRepository, 'assignOpenCase',
        { value: jest.fn().mockImplementation(() => Promise.resolve()) });
        return expect(caseService.resolveCase(1))
            .resolves.toEqual('success');
    });
});
