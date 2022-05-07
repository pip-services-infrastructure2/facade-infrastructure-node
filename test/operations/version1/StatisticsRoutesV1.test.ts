const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { IStatisticsClientV1 } from 'client-statistics-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { StatisticsOperationsV1 } from '../../../src/operations/version1/StatisticsOperationsV1';

suite('StatisticsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let statisticsClient: IStatisticsClientV1;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'statistics', 'default', '1.0'), new StatisticsOperationsV1())
        statisticsClient = references.getOneRequired<IStatisticsClientV1>(
            new Descriptor('service-statistics', 'client', '*', '*', '*')
        );
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should get statistics groups as admin', async () => {
        let page = await rest.get(
            '/v1/statistics/groups?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should get statistics counters as admin', async () => {
        let page = await rest.get(
            '/v1/statistics/counters?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should read statistics counters as admin', async () => {
        let sets = await rest.post(
            '/v1/statistics?type=0',
            [
                { group: 'test', name: 'value1' },
                { group: 'test', name: 'value2' }
            ]
        );
        assert.isArray(sets);
    });

    test('should get user statistics', async () => {
        await statisticsClient.incrementCounter(
            null, '123', 'test', new Date(), 'UTC', 1
        );

        let set = await rest.get(
            '/v1/statistics/123/test?type=0'
        );

        assert.isObject(set);
        assert.lengthOf(set.values, 1);
        assert.equal(1, set.values[0].value);

        let sets = await rest.get(
            '/v1/statistics/123?type=0'
        );

        assert.isArray(sets);
        assert.lengthOf(sets, 1);
    });

});