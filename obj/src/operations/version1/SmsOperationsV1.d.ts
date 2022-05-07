import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class SmsOperationsV1 extends RestOperations {
    private _smsClient;
    constructor();
    setReferences(references: IReferences): void;
    sendMessage(req: any, res: any): Promise<void>;
}
