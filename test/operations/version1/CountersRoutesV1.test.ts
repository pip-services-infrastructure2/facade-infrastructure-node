const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { CountersOperationsV1 } from '../../../src/operations/version1/CountersOperationsV1';

suite('CountersOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'counters', 'default', '1.0'), new CountersOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should get counters as admin', async () => {
        let page = await rest.get(
            '/v1/counters?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should clear counters as admin', async () => {
        await rest.del(
            '/v1/counters'
        );
    });

});