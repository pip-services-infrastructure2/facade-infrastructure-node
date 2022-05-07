import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { LoggingOperationsV1 } from '../operations/version1/LoggingOperationsV1';
import { CountersOperationsV1 } from '../operations/version1/CountersOperationsV1';
import { EventLogOperationsV1 } from '../operations/version1/EventLogOperationsV1';
import { SettingsOperationsV1 } from '../operations/version1/SettingsOperationsV1';
import { StatisticsOperationsV1 } from '../operations/version1/StatisticsOperationsV1';
import { BlobsOperationsV1 } from '../operations/version1/BlobsOperationsV1';
import { EmailOperationsV1 } from '../operations/version1/EmailOperationsV1';
import { SmsOperationsV1 } from '../operations/version1/SmsOperationsV1';

export class InfrastructureFacadeFactory extends Factory {
	public static Descriptor = new Descriptor("facade-infrastructure", "factory", "default", "default", "1.0");

	public static LoggingOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "logging", "*", "1.0");
	public static CountersOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "counters", "*", "1.0");
	public static EventLogOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "eventlog", "*", "1.0");
	public static SettingsOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "settings", "*", "1.0");
	public static StatisticsOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "statistics", "*", "1.0");
	public static BlobsOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "blobs", "*", "1.0");
	public static EmailOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "email", "*", "1.0");
	public static SmsOperationsV1Descriptor = new Descriptor("facade-infrastructure", "operations", "sms", "*", "1.0");
	
	public constructor() {
		super();

		this.registerAsType(InfrastructureFacadeFactory.LoggingOperationsV1Descriptor, LoggingOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.CountersOperationsV1Descriptor, CountersOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.EventLogOperationsV1Descriptor, EventLogOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.SettingsOperationsV1Descriptor, SettingsOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.StatisticsOperationsV1Descriptor, StatisticsOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.BlobsOperationsV1Descriptor, BlobsOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.EmailOperationsV1Descriptor, EmailOperationsV1);
		this.registerAsType(InfrastructureFacadeFactory.SmsOperationsV1Descriptor, SmsOperationsV1);
	}
	
}
