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
exports.StatisticsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class StatisticsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('statistics', new pip_services3_commons_nodex_1.Descriptor('service-statistics', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._statisticsClient = this._dependencyResolver.getOneRequired('statistics');
    }
    getGroupsOperation() {
        return (req, res) => {
            this.getGroups(req, res);
        };
    }
    getCountersOperation() {
        return (req, res) => {
            this.getCounters(req, res);
        };
    }
    readCounterOperation() {
        return (req, res) => {
            this.readCounter(req, res);
        };
    }
    readCountersByGroupOperation() {
        return (req, res) => {
            this.readCountersByGroup(req, res);
        };
    }
    readCountersOperation() {
        return (req, res) => {
            this.readCounters(req, res);
        };
    }
    incrementCounterOperation() {
        return (req, res) => {
            this.incrementCounter(req, res);
        };
    }
    getGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._statisticsClient.getGroups(null, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getCounters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._statisticsClient.getCounters(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    readCounter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.param('name');
            let group = req.param('group');
            let type = pip_services3_commons_nodex_2.IntegerConverter.toInteger(req.param('type'));
            let fromTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
            let toTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
            let timezone = req.param('timezone');
            try {
                let counter = yield this._statisticsClient.readOneCounter(null, group, name, type, fromTime, toTime, timezone);
                this.sendResult(req, res, counter);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    readCountersByGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let group = req.param('group');
            let type = pip_services3_commons_nodex_2.IntegerConverter.toInteger(req.param('type'));
            let fromTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
            let toTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
            let timezone = req.param('timezone');
            try {
                let counter = yield this._statisticsClient.readCountersByGroup(null, group, type, fromTime, toTime, timezone);
                this.sendResult(req, res, counter);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    readCounters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let counters = req.body;
            let type = pip_services3_commons_nodex_2.IntegerConverter.toInteger(req.param('type'));
            let fromTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('from_time'));
            let toTime = pip_services3_commons_nodex_3.DateTimeConverter.toNullableDateTime(req.param('to_time'));
            let timezone = req.param('timezone');
            try {
                let result = yield this._statisticsClient.readCounters(null, counters, type, fromTime, toTime, timezone);
                this.sendResult(req, res, result);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    incrementCounter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let group = req.param('group');
            let name = req.param('name');
            let time = req.param('time');
            let timezone = req.param('timezone');
            let value = pip_services3_commons_nodex_2.IntegerConverter.toInteger(req.param('value'));
            try {
                yield this._statisticsClient.incrementCounter(null, group, name, time, timezone, value);
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.StatisticsOperationsV1 = StatisticsOperationsV1;
//# sourceMappingURL=StatisticsOperationsV1.js.map