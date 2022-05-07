const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EventLogOperationsV1 } from '../../../src/operations/version1/EventLogOperationsV1';

suite('EventLogOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'eventlog', 'default', '1.0'), new EventLogOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should get logged system events as admin', async () => {
        let page = await rest.get(
            '/v1/eventlog?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

});