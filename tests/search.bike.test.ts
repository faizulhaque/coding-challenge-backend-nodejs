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

import * as bikeRepository from '../src/repositories/bike';

import * as bikeService from '../src/services/bike';
import { IPagination } from '../src/interfaces';

describe('Search Positive Cases', () => {
    test('Should mark resolve and Return success', async () => {
        const mockData = {test: 1};
        Object.defineProperty(bikeRepository, 'search',
        { value: jest.fn().mockImplementation(() => Promise.resolve(mockData)) });
        const pagination: IPagination = {
            limit: 10,
            offset: 0,
            sortBy: 'id',
            sortOrder: 'asc'
        };
        return expect(bikeService.search({}, pagination))
            .resolves.toEqual(mockData);
    });
});
