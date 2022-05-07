import { Descriptor } from 'pip-services3-commons-nodex';
import { RestService } from 'pip-services3-rpc-nodex';

import { LoggingOperationsV1 } from '../../src/operations/version1/LoggingOperationsV1';
import { CountersOperationsV1 } from '../../src/operations/version1/CountersOperationsV1';
import { EventLogOperationsV1 } from '../../src/operations/version1/EventLogOperationsV1';
import { SettingsOperationsV1 } from '../../src/operations/version1/SettingsOperationsV1';
import { StatisticsOperationsV1 } from '../../src/operations/version1/StatisticsOperationsV1';
import { BlobsOperationsV1 } from '../../src/operations/version1/BlobsOperationsV1';
import { EmailOperationsV1 } from '../../src/operations/version1/EmailOperationsV1';
import { SmsOperationsV1 } from '../../src/operations/version1/SmsOperationsV1';

export class TestFacadeService extends RestService {

    public constructor() {
        super();

        this._baseRoute = 'v1';

        this._dependencyResolver.put('logging', new Descriptor("facade-infrastructure", "operations", "logging", "*", "1.0"));
        this._dependencyResolver.put('counters', new Descriptor("facade-infrastructure", "operations", "counters", "*", "1.0"));
        this._dependencyResolver.put('eventlog', new Descriptor("facade-infrastructure", "operations", "eventlog", "*", "1.0"));
        this._dependencyResolver.put('settings', new Descriptor("facade-infrastructure", "operations", "settings", "*", "1.0"));
        this._dependencyResolver.put('statistics', new Descriptor("facade-infrastructure", "operations", "statistics", "*", "1.0"));
        this._dependencyResolver.put('blobs', new Descriptor("facade-infrastructure", "operations", "blobs", "*", "1.0"));
        this._dependencyResolver.put('email', new Descriptor("facade-infrastructure", "operations", "email", "*", "1.0"));
        this._dependencyResolver.put('sms', new Descriptor("facade-infrastructure", "operations", "sms", "*", "1.0"));
    }

    public register(): void {
        let logging = this._dependencyResolver.getOneOptional<LoggingOperationsV1>('logging');
        if (logging) {``
            this.registerRoute('get', '/logging', null, (req, res) => logging.getMessages(req, res));
            this.registerRoute('get', '/logging/errors', null, (req, res) => logging.getErrors(req, res));
            this.registerRoute('get', '/logging/text', null, (req, res) => logging.getMessagesAsText(req, res));
            this.registerRoute('get', '/logging/errors/text', null, (req, res) => logging.getErrorsAsText(req, res));
            this.registerRoute('post', '/logging', null, (req, res) => logging.writeMessage(req, res));
            this.registerRoute('del', '/logging', null, (req, res) => logging.clearMessages(req, res));
        }

        let counters = this._dependencyResolver.getOneOptional<CountersOperationsV1>('counters');
        if (counters) {
            this.registerRoute('get', '/counters', null, (req, res) => counters.getCounters(req, res));
            this.registerRoute('get', '/counters/text', null, (req, res) => counters.getCountersAsText(req, res));
            this.registerRoute('post', '/counters', null, (req, res) => counters.writeCounter(req, res));
            this.registerRoute('del', '/counters', null, (req, res) => counters.clearCounters(req, res));
        }

        let eventlog = this._dependencyResolver.getOneOptional<EventLogOperationsV1>('eventlog');
        if (eventlog) {
            this.registerRoute('get', '/eventlog', null, (req, res) => eventlog.getEvents(req, res));
            this.registerRoute('post', '/eventlog', null, (req, res) => eventlog.logEvent(req, res));
        }

        let settings = this._dependencyResolver.getOneOptional<SettingsOperationsV1>('settings');
        if (settings) {
            this.registerRoute('get', '/settings', null, (req, res) => settings.getSections(req, res));
            this.registerRoute('get', '/settings/ids', null, (req, res) => settings.getSectionIds(req, res));
            this.registerRoute('get', '/settings/:id', null, (req, res) => settings.getSection(req, res));
            this.registerRoute('get', '/settings/:id/:key', null, (req, res) => settings.getParameter(req, res));
            this.registerRoute('post', '/settings/:id', null, (req, res) => settings.setSection(req, res));
            this.registerRoute('post', '/settings/:id/:key', null, (req, res) => settings.setParameter(req, res));
            this.registerRoute('post', '/settings/:id/:key/increment', null, (req, res) => settings.incrementParameter(req, res));
            this.registerRoute('put', '/settings/:id', null, (req, res) => settings.modifySection(req, res));
            this.registerRoute('del', '/settings/:id', null, (req, res) => settings.clearSection(req, res));
        }

        let statistics = this._dependencyResolver.getOneOptional<StatisticsOperationsV1>('statistics');
        if (statistics) {
            this.registerRoute('get', '/statistics/groups', null, (req, res) => statistics.getGroups(req, res));
            this.registerRoute('get', '/statistics/counters', null, (req, res) => statistics.getCounters(req, res));
            this.registerRoute('post', '/statistics', null, (req, res) => statistics.readCounters(req, res));
            this.registerRoute('get', '/statistics/:group', null, (req, res) => statistics.readCountersByGroup(req, res));
            this.registerRoute('get', '/statistics/:group/:name', null, (req, res) => statistics.readCounter(req, res));
            this.registerRoute('post', '/statistics/:group/:name', null, (req, res) => statistics.incrementCounter(req, res));
        }

        let blobs = this._dependencyResolver.getOneOptional<BlobsOperationsV1>('blobs');
        if (blobs) {
            this.registerRoute('get', '/blobs', null, (req, res) => blobs.getBlobs(req, res));
            this.registerRoute('get', '/blobs/:blob_id/info', null, (req, res) => blobs.getBlobInfo(req, res));
            this.registerRoute('get', '/blobs/:blob_id', null, (req, res) => blobs.getBlob(req, res));
            this.registerRoute('post', '/blobs', null, (req, res) => blobs.setBlob(req, res));
            this.registerRoute('put', '/blobs/:blob_id/info', null, (req, res) => blobs.updateBlobInfo(req, res));
            this.registerRoute('put', '/blobs/:blob_id', null, (req, res) => blobs.setBlob(req, res));
            this.registerRoute('del', '/blobs/:blob_id', null, (req, res) => blobs.deleteBlob(req, res));

            this.registerRoute('get', '/avatars/:blob_id', null, (req, res) => blobs.getBlob(req, res));
            this.registerRoute('put', '/avatars/:blob_id', null, (req, res) => blobs.setBlob(req, res));
            this.registerRoute('del', '/avatars/:blob_id', null, (req, res) => blobs.deleteBlob(req, res));
        }

        let email = this._dependencyResolver.getOneOptional<EmailOperationsV1>('email');
        if (email) {
            this.registerRoute('post', '/email', null, (req, res) => email.sendMessage(req, res));
        }

        let sms = this._dependencyResolver.getOneOptional<SmsOperationsV1>('sms');
        if (sms) {
            this.registerRoute('post', '/sms', null, (req, res) => sms.sendMessage(req, res));
        }
    }

}