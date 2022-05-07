import { DefaultContainerFactory } from 'pip-services3-container-nodex';

import { LoggingServiceFactory } from 'service-logging-node';
import { LoggingClientFactory } from 'client-logging-node';
import { PerfMonServiceFactory } from 'service-perfmon-node';
import { PerfMonClientFactory } from 'client-perfmon-node';
import { EventLogServiceFactory } from 'service-eventlog-node';
import { EventLogClientFactory } from 'client-eventlog-node';
import { StatisticsServiceFactory } from 'service-statistics-node';
import { StatisticsClientFactory } from 'client-statistics-node';
import { SettingsServiceFactory } from 'service-settings-node';
import { SettingsClientFactory } from 'client-settings-node';
import { FacetsServiceFactory } from 'service-facets-node';
import { FacetsClientFactory } from 'client-facets-node';
import { BlobsServiceFactory } from 'service-blobs-node';
import { BlobsClientFactory } from 'client-blobs-node';
import { EmailClientFactory } from 'client-email-node';
import { EmailServiceFactory } from 'service-email-node';
import { SmsClientFactory } from 'client-sms-node';
import { SmsServiceFactory } from 'service-sms-node';

import { InfrastructureFacadeFactory } from '../../src/build/InfrastructureFacadeFactory';
import { TestFacadeFactory } from './TestFacadeFactory';

export class TestFactory extends DefaultContainerFactory {

    public constructor() {
        super();

        this.add(new InfrastructureFacadeFactory);
        this.add(new TestFacadeFactory);

        this.add(new LoggingServiceFactory);
        this.add(new LoggingClientFactory);
        this.add(new PerfMonServiceFactory);
        this.add(new PerfMonClientFactory);
        this.add(new EventLogServiceFactory);
        this.add(new EventLogClientFactory);
        this.add(new StatisticsServiceFactory);
        this.add(new StatisticsClientFactory);
        this.add(new SettingsServiceFactory);
        this.add(new SettingsClientFactory);
        this.add(new FacetsServiceFactory);
        this.add(new FacetsClientFactory);
        this.add(new BlobsServiceFactory);
        this.add(new BlobsClientFactory);
        this.add(new EmailServiceFactory);
        this.add(new EmailClientFactory);
        this.add(new SmsServiceFactory);
        this.add(new SmsClientFactory);
    }

}
