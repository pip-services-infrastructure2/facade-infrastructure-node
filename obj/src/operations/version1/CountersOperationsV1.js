"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountersOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class CountersOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('counters', new pip_services3_commons_nodex_1.Descriptor('service-perfmon', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._countersClient = this._dependencyResolver.getOneRequired('counters');
    }
    getCounters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._countersClient.readCounters(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    counterToText(counter) {
        var output = "Counter " + counter.name + " { ";
        output += "\"type\": " + counter.type;
        if (counter.last != null)
            output += ", \"last\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.last);
        if (counter.count != null)
            output += ", \"count\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.count);
        if (counter.min != null)
            output += ", \"min\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.min);
        if (counter.max != null)
            output += ", \"max\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.max);
        if (counter.average != null)
            output += ", \"avg\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.average);
        if (counter.time != null)
            output += ", \"time\": " + pip_services3_commons_nodex_2.StringConverter.toString(counter.time);
        output += " }";
        return output;
    }
    countersToText(counters) {
        if (counters == null)
            return null;
        let output = "";
        for (let counter of counters) {
            if (output.length > 0)
                output += "\r\n";
            output += this.counterToText(counter);
        }
        return output;
    }
    getCountersAsText(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._countersClient.readCounters(null, filter, paging);
                this.sendResult(req, res, this.countersToText(page.data));
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    writeCounter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let counter = req.body;
            try {
                yield this._countersClient.writeCounter(null, counter);
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    clearCounters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._countersClient.clear(null);
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.CountersOperationsV1 = CountersOperationsV1;
//# sourceMappingURL=CountersOperationsV1.js.map