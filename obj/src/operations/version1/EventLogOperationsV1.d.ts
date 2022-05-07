import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class EventLogOperationsV1 extends RestOperations {
    private _eventLogClient;
    constructor();
    setReferences(references: IReferences): void;
    getEvents(req: any, res: any): Promise<void>;
    logEvent(req: any, res: any): Promise<void>;
}
