import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { StringConverter } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IPerfMonClientV1 } from 'client-perfmon-node';
import { CounterV1 } from 'client-perfmon-node';


export class CountersOperationsV1  extends RestOperations {
    private _countersClient: IPerfMonClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('counters', new Descriptor('service-perfmon', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._countersClient = this._dependencyResolver.getOneRequired<IPerfMonClientV1>('counters');
    }

    public async getCounters(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._countersClient.readCounters(null, filter, paging);
            this.sendResult(req, res, page);
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

    private counterToText(counter: CounterV1): string {
        var output = "Counter " + counter.name + " { ";
        output += "\"type\": " + counter.type;
        if (counter.last != null)
            output += ", \"last\": " + StringConverter.toString(counter.last);
        if (counter.count != null)
            output += ", \"count\": " + StringConverter.toString(counter.count);
        if (counter.min != null)
            output += ", \"min\": " + StringConverter.toString(counter.min);
        if (counter.max != null)
            output += ", \"max\": " + StringConverter.toString(counter.max);
        if (counter.average != null)
            output += ", \"avg\": " + StringConverter.toString(counter.average);
        if (counter.time != null)
            output += ", \"time\": " + StringConverter.toString(counter.time);
        output += " }";
        return output;
    }

    private countersToText(counters: CounterV1[]): string {
        if (counters == null) return null;

        let output = "";
        for (let counter of counters) {
            if (output.length > 0) output += "\r\n";
            output += this.counterToText(counter);
        }

        return output;    
    }

    public async getCountersAsText(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._countersClient.readCounters(null, filter, paging);
            this.sendResult(req, res, this.countersToText(page.data));
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async writeCounter(req: any, res: any): Promise<void> {
        let counter = req.body;

        try {
            await this._countersClient.writeCounter(null, counter);
            this.sendEmptyResult(req, res);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async clearCounters(req: any, res: any): Promise<void> {
        try {
            await this._countersClient.clear(null);
            this.sendEmptyResult(req, res);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

}