const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { LoggingOperationsV1 } from '../../../src/operations/version1/LoggingOperationsV1';

suite('LoggingOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'logging', 'default', '1.0'), new LoggingOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should get logged messages as admin', async () => {
        let page = await rest.get(
            '/v1/logging?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should get logged errors as admin', async () => {
        let page = await rest.get(
            '/v1/logging/errors?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should clear log as admin', async () => {
        await rest.del(
            '/v1/logging'
        );
    });

});