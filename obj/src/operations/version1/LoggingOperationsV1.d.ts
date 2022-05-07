import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class LoggingOperationsV1 extends RestOperations {
    private _loggingClient;
    constructor();
    setReferences(references: IReferences): void;
    getMessages(req: any, res: any): Promise<void>;
    getErrors(req: any, res: any): Promise<void>;
    private messageToText;
    private messagesToText;
    getMessagesAsText(req: any, res: any): Promise<void>;
    getErrorsAsText(req: any, res: any): Promise<void>;
    writeMessage(req: any, res: any): Promise<void>;
    clearMessages(req: any, res: any): Promise<void>;
}
