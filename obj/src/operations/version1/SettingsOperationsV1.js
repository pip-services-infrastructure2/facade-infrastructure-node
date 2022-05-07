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
exports.SettingsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SettingsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('settings', new pip_services3_commons_nodex_2.Descriptor('service-settings', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._settingsClient = this._dependencyResolver.getOneRequired('settings');
    }
    getSectionIds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._settingsClient.getSectionIds(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getSections(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._settingsClient.getSections(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            try {
                let config = yield this._settingsClient.getSectionById(null, id);
                this.sendResult(req, res, config);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    setSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            let parameters = pip_services3_commons_nodex_1.ConfigParams.fromValue(req.body);
            try {
                let config = yield this._settingsClient.setSection(null, id, parameters);
                this.sendResult(req, res, config);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getParameter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            let key = req.param('key') || req.param('param');
            try {
                let parameters = yield this._settingsClient.getSectionById(null, id);
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res, value);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    setParameter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            let key = req.param('key') || req.param('param');
            let value = req.param('value');
            let updateParams = pip_services3_commons_nodex_1.ConfigParams.fromTuples(key, value);
            try {
                let parameters = yield this._settingsClient.modifySection(null, id, updateParams, null);
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res, value);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    incrementParameter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            let key = req.param('key') || req.param('param');
            let value = pip_services3_commons_nodex_3.LongConverter.toLong(req.param('value') || req.param('count'));
            let incrementParams = pip_services3_commons_nodex_1.ConfigParams.fromTuples(key, value);
            try {
                let parameters = yield this._settingsClient.modifySection(null, id, null, incrementParams);
                let value = parameters ? parameters.get(key) : null;
                this.sendResult(req, res, value);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    modifySection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            let params = req.body || {};
            let updateParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(params.update_params);
            let incrementParams = pip_services3_commons_nodex_1.ConfigParams.fromValue(params.increment_params);
            try {
                let config = yield this._settingsClient.modifySection(null, id, updateParams, incrementParams);
                this.sendResult(req, res, config);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    clearSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.param('id') || req.param('section');
            try {
                yield this._settingsClient.setSection(null, id, new pip_services3_commons_nodex_1.ConfigParams());
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.SettingsOperationsV1 = SettingsOperationsV1;
//# sourceMappingURL=SettingsOperationsV1.js.map