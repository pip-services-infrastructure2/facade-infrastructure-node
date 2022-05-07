import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class EmailOperationsV1 extends RestOperations {
    private _emailClient;
    constructor();
    setReferences(references: IReferences): void;
    sendMessage(req: any, res: any): Promise<void>;
}
