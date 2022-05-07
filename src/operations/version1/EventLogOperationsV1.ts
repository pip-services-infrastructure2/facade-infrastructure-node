import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IEventLogClientV1 } from 'client-eventlog-node';


export class EventLogOperationsV1  extends RestOperations {
    private _eventLogClient: IEventLogClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('eventlog', new Descriptor('service-eventlog', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._eventLogClient = this._dependencyResolver.getOneRequired<IEventLogClientV1>('eventlog');
    }

    public async getEvents(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._eventLogClient.getEvents(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

    public async logEvent(req: any, res: any): Promise<void> {
        let event = req.body;

        try {
            let log = await this._eventLogClient.logEvent(
                null, event
            );
            this.sendResult(req, res, log)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

}