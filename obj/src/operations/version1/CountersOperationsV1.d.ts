import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class CountersOperationsV1 extends RestOperations {
    private _countersClient;
    constructor();
    setReferences(references: IReferences): void;
    getCounters(req: any, res: any): Promise<void>;
    private counterToText;
    private countersToText;
    getCountersAsText(req: any, res: any): Promise<void>;
    writeCounter(req: any, res: any): Promise<void>;
    clearCounters(req: any, res: any): Promise<void>;
}
