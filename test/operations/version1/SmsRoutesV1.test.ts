const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { SmsController } from 'service-sms-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { SmsOperationsV1 } from '../../../src/operations/version1/SmsOperationsV1';

suite('SmsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let smsController: SmsController;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'sms', 'default', '1.0'), new SmsOperationsV1())
        smsController = references.getOneRequired<SmsController>(
            new Descriptor('service-sms', 'controller', '*', '*', '1.0')
        );
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should send message', async () => {
        let message = {
            to: '+79102342354',
            text: 'This is a test message'
        };

        await rest.post(
            '/v1/sms',
            message
        );
    });

});