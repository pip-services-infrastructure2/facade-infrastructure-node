import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { IntegerConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IStatisticsClientV1 } from 'client-statistics-node';


export class StatisticsOperationsV1  extends RestOperations {
    private _statisticsClient: IStatisticsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('statistics', new Descriptor('service-statistics', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._statisticsClient = this._dependencyResolver.getOneRequired<IStatisticsClientV1>('statistics');
    }

    public getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        }
    }

    public getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        }
    }

    public readCounterOperation() {
        return (req, res) => {
            this.readCounter(req, res);
        }
    }

    public readCountersByGroupOperation() {
        return (req, res) => {
            this.readCountersByGroup(req, res);
        }
    }

    public readCountersOperation() {
        return (req, res) => {
            this.readCounters(req, res);
        }
    }

    public incrementCounterOperation() {
        return (req, res) => {
            this.incrementCounter(req, res);
        }
    }

    public async getGroups(req: any, res: any): Promise<void> {
        let paging = this.getPagingParams(req);

        try {
            let page = await this._statisticsClient.getGroups(
                null, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getCounters(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);
        
        try {
            let page = await this._statisticsClient.getCounters(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async readCounter(req: any, res: any): Promise<void> {
        let name = req.param('name');
        let group = req.param('group');
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        try {
            let counter = await this._statisticsClient.readOneCounter(
                null, group, name, type, fromTime, toTime, timezone
            );
            this.sendResult(req, res, counter)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async readCountersByGroup(req: any, res: any): Promise<void> {
        let group = req.param('group');
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        try {
            let counter = await this._statisticsClient.readCountersByGroup(
                null, group, type, fromTime, toTime, timezone
            );
            this.sendResult(req, res, counter)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async readCounters(req: any, res: any): Promise<void> {
        let counters = req.body;
        let type = IntegerConverter.toInteger(req.param('type'));
        let fromTime = DateTimeConverter.toNullableDateTime(req.param('from_time'));
        let toTime = DateTimeConverter.toNullableDateTime(req.param('to_time'));
        let timezone = req.param('timezone');
        
        try {
            let result = await this._statisticsClient.readCounters(
                null, counters, type, fromTime, toTime, timezone
            );
            this.sendResult(req, res, result)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async incrementCounter(req: any, res: any): Promise<void> {
        let group = req.param('group');
        let name = req.param('name');
        let time = req.param('time');
        let timezone = req.param('timezone');
        let value = IntegerConverter.toInteger(req.param('value'));

        try {
            await this._statisticsClient.incrementCounter(
                null, group, name, time, timezone, value
            );
            this.sendEmptyResult(req, res)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }
}