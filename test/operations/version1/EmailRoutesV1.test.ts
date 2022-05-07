const assert = require('chai').assert;

import { ConfigParams, Descriptor } from 'pip-services3-commons-nodex';
import { EmailController } from 'service-email-node';

import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { EmailOperationsV1 } from '../../../src/operations/version1/EmailOperationsV1';

suite('EmailOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;
    let emailController: EmailController;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('facade-infrastructure', 'operations', 'email', 'default', '1.0'), new EmailOperationsV1())
        emailController = references.getOneRequired<EmailController>(
            new Descriptor('service-email', 'controller', '*', '*', '1.0')
        );

        emailController.configure(ConfigParams.fromTuples(
            "message.from", 'somebody@somewhere.com',

            "connection.host", 'smtp@gmail.com',
            "connection.port", 465,
            "connection.ssl", true,

            "credential.username", null,
            "credential.password", null,

            "options.disabled", true
        ));

        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should send message', async () => {
        let message = {
            to: 'test1@somewhere.com',
            subject: 'Test',
            text: 'This is a test message'
        };

        await rest.post(
            '/v1/email',
            message
        );
    });

});