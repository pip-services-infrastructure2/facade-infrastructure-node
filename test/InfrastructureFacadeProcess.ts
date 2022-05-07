import { ProcessContainer } from 'pip-services3-container-nodex';

import { TestFactory } from './fixtures/TestFactory';

export class InfrastructureFacadeProcess extends ProcessContainer {

    public constructor() {
        super("infrastructure", "Client facade for infrastructure microservice");
        this._factories.add(new TestFactory);
    }

}
