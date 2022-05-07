"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureFacadeFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const LoggingOperationsV1_1 = require("../operations/version1/LoggingOperationsV1");
const CountersOperationsV1_1 = require("../operations/version1/CountersOperationsV1");
const EventLogOperationsV1_1 = require("../operations/version1/EventLogOperationsV1");
const SettingsOperationsV1_1 = require("../operations/version1/SettingsOperationsV1");
const StatisticsOperationsV1_1 = require("../operations/version1/StatisticsOperationsV1");
const BlobsOperationsV1_1 = require("../operations/version1/BlobsOperationsV1");
const EmailOperationsV1_1 = require("../operations/version1/EmailOperationsV1");
const SmsOperationsV1_1 = require("../operations/version1/SmsOperationsV1");
class InfrastructureFacadeFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(InfrastructureFacadeFactory.LoggingOperationsV1Descriptor, LoggingOperationsV1_1.LoggingOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.CountersOperationsV1Descriptor, CountersOperationsV1_1.CountersOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.EventLogOperationsV1Descriptor, EventLogOperationsV1_1.EventLogOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.SettingsOperationsV1Descriptor, SettingsOperationsV1_1.SettingsOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor, StatisticsOperationsV1_1.StatisticsOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.BlobsOperationsV1Descriptor, BlobsOperationsV1_1.BlobsOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.EmailOperationsV1Descriptor, EmailOperationsV1_1.EmailOperationsV1);
        this.registerAsType(InfrastructureFacadeFactory.SmsOperationsV1Descriptor, SmsOperationsV1_1.SmsOperationsV1);
    }
}
exports.InfrastructureFacadeFactory = InfrastructureFacadeFactory;
InfrastructureFacadeFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "factory", "default", "default", "1.0");
InfrastructureFacadeFactory.LoggingOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "logging", "*", "1.0");
InfrastructureFacadeFactory.CountersOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "counters", "*", "1.0");
InfrastructureFacadeFactory.EventLogOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "eventlog", "*", "1.0");
InfrastructureFacadeFactory.SettingsOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "settings", "*", "1.0");
InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "statistics", "*", "1.0");
InfrastructureFacadeFactory.BlobsOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "blobs", "*", "1.0");
InfrastructureFacadeFactory.EmailOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "email", "*", "1.0");
InfrastructureFacadeFactory.SmsOperationsV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("facade-infrastructure", "operations", "sms", "*", "1.0");
//# sourceMappingURL=InfrastructureFacadeFactory.js.map