import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { ManagedReferences } from 'pip-services3-container-nodex';
import { TestFacadeService } from './TestFacadeService';

import { TestFactory } from './TestFactory';

export class TestReferences extends ManagedReferences {
    private _factory = new TestFactory();

    public constructor() {
        super();

        this.appendCore();
        this.appendMicroservices();
        this.appendFacade();

        this.configureService();
    }

    private appendCore(): void {
        this.put(null, this._factory);

        //this.append(new Descriptor('pip-services-commons', 'logger', 'console', 'default', '*'));
        //this.append(new Descriptor('pip-services-commons', 'counters', 'log', 'default', '*'));
        this.append(new Descriptor('service-logging', 'logger', 'direct', 'default', '*'));
        this.append(new Descriptor('service-perfmon', 'counters', 'direct', 'default', '*'));

        // this.append(new Descriptor('pip-services', 'facade-service', 'default', 'default', '*'));
    }

    private appendMicroservices(): void {
        this.append(new Descriptor('service-logging', 'persistence-messages', 'memory', 'default', '*'));
        this.append(new Descriptor('service-logging', 'persistence-errors', 'memory', 'default', '*'));
        this.append(new Descriptor('service-logging', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-logging', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-perfmon', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('service-perfmon', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-perfmon', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-eventlog', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('service-eventlog', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-eventlog', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-statistics', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('service-statistics', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-statistics', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-settings', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('service-settings', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-settings', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-blobs', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('service-blobs', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-blobs', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-email', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-email', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('service-sms', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('service-sms', 'client', 'direct', 'default', '*'));
    }

    private appendFacade(): void {
        this.append(new Descriptor('facade-infrastructure', 'service', 'test', 'default', '1.0'));
    }

    public append(descriptor: Descriptor): void {
        let component = this._factory.create(descriptor);
        this.put(descriptor, component);
    }

    private configureService(): void {
        // Configure Facade service
        let service = this.getOneRequired<TestFacadeService>(
            new Descriptor("facade-infrastructure", "service", "test", "*", "1.0")
            // new Descriptor('service-facade', 'service', 'test', 'default', '1.0')
        );
        service.configure(ConfigParams.fromTuples(
            'root_path', '', //'/api/1.0',
            'connection.protocol', 'http',
            'connection.host', '0.0.0.0',
            'connection.port', 3000
        ));
    }

}