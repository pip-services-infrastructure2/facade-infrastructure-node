import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { LogLevelConverter } from 'pip-services3-components-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';

import { ILoggingClientV1 } from 'client-logging-node';
import { LogMessageV1 } from 'client-logging-node';


export class LoggingOperationsV1  extends RestOperations {
    private _loggingClient: ILoggingClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('logging', new Descriptor('service-logging', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._loggingClient = this._dependencyResolver.getOneRequired<ILoggingClientV1>('logging');
    }

    public async getMessages(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        
        try {
            let page = await this._loggingClient.readMessages(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getErrors(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._loggingClient.readErrors(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    private messageToText(message: LogMessageV1): string {
        let output = "["
            + (message.correlation_id || "---")
            + ":"
            + LogLevelConverter.toString(message.level)
            + ":"
            + StringConverter.toString(message.time)
            + "] "
            + message.message;

        if (message.error != null) {
            if (message.message == "")
                output += "Error: ";
            else output += ": ";
        
            output += message.error.type
                + " Code: " + message.error.code
                + " Message: " + message.error.message
                + " StackTrace: " + message.error.stack_trace;
        }

        return output;
    }

    private messagesToText(messages: LogMessageV1[]): string {
        if (messages == null) return null;

        let output = "";

        for (let message of messages) {
            if (output.length > 0) output += "\r\n";
            output += this.messageToText(message);
        }
 
        return output;
    }

    public async getMessagesAsText(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._loggingClient.readMessages(
                null, filter, paging
            );
            this.sendResult(req, res, this.messagesToText(page.data))
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getErrorsAsText(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._loggingClient.readErrors(
                null, filter, paging
            );
            this.sendResult(req, res, this.messagesToText(page.data))
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async writeMessage(req: any, res: any): Promise<void> {
        let message = req.body;
        
        try {
            let log = await this._loggingClient.writeMessage(
                null, message
            );
            this.sendResult(req, res, log);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async clearMessages(req: any, res: any): Promise<void> {
        try {
            await this._loggingClient.clear(null);
            this.sendEmptyResult(req, res);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }
}