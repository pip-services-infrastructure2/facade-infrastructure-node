const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { SettingsOperationsV1 } from '../../../src/operations/version1/SettingsOperationsV1';

suite('SettingsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'settings', 'default', '1.0'), new SettingsOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should get settings section ids as admin', async () => {
        let page = await rest.get(
            '/v1/settings/ids?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should get settings sections as admin', async () => {
        let page = await rest.get(
            '/v1/settings?paging=1&skip=0&take=2'
        );
        assert.isObject(page);
    });

    test('should get user settings', async () => {
        let parameters = await rest.get(
            '/v1/settings/123'
        );
        assert.isObject(parameters);
    });

    test('should set user settings', async () => {
        let SETTINGS = ConfigParams.fromValue({
            privacy: {
                dashboard: { category: 'aboutme', hidden: false },
                journal: { category: 'aboutme', hidden: false },
                coulddo: { category: 'set', hidden: true }
            }
        });
        let settings1: ConfigParams;

        // Update party settings
        let settings = await rest.post(
            '/v1/settings/123',
            SETTINGS
        );

        assert.isObject(settings);
        settings1 = settings;

        // Read and check party settings
        settings = await rest.get(
            '/v1/settings/123'
        );

        assert.deepEqual(settings, SETTINGS.getAsObject());
    });

});