import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class StatisticsOperationsV1 extends RestOperations {
    private _statisticsClient;
    constructor();
    setReferences(references: IReferences): void;
    getGroupsOperation(): (req: any, res: any) => void;
    getCountersOperation(): (req: any, res: any) => void;
    readCounterOperation(): (req: any, res: any) => void;
    readCountersByGroupOperation(): (req: any, res: any) => void;
    readCountersOperation(): (req: any, res: any) => void;
    incrementCounterOperation(): (req: any, res: any) => void;
    getGroups(req: any, res: any): Promise<void>;
    getCounters(req: any, res: any): Promise<void>;
    readCounter(req: any, res: any): Promise<void>;
    readCountersByGroup(req: any, res: any): Promise<void>;
    readCounters(req: any, res: any): Promise<void>;
    incrementCounter(req: any, res: any): Promise<void>;
}
