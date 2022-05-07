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
exports.LoggingOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class LoggingOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('logging', new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._loggingClient = this._dependencyResolver.getOneRequired('logging');
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._loggingClient.readMessages(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getErrors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._loggingClient.readErrors(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    messageToText(message) {
        let output = "["
            + (message.correlation_id || "---")
            + ":"
            + pip_services3_components_nodex_1.LogLevelConverter.toString(message.level)
            + ":"
            + pip_services3_commons_nodex_2.StringConverter.toString(message.time)
            + "] "
            + message.message;
        if (message.error != null) {
            if (message.message == "")
                output += "Error: ";
            else
                output += ": ";
            output += message.error.type
                + " Code: " + message.error.code
                + " Message: " + message.error.message
                + " StackTrace: " + message.error.stack_trace;
        }
        return output;
    }
    messagesToText(messages) {
        if (messages == null)
            return null;
        let output = "";
        for (let message of messages) {
            if (output.length > 0)
                output += "\r\n";
            output += this.messageToText(message);
        }
        return output;
    }
    getMessagesAsText(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._loggingClient.readMessages(null, filter, paging);
                this.sendResult(req, res, this.messagesToText(page.data));
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getErrorsAsText(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._loggingClient.readErrors(null, filter, paging);
                this.sendResult(req, res, this.messagesToText(page.data));
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    writeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = req.body;
            try {
                let log = yield this._loggingClient.writeMessage(null, message);
                this.sendResult(req, res, log);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    clearMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._loggingClient.clear(null);
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.LoggingOperationsV1 = LoggingOperationsV1;
//# sourceMappingURL=LoggingOperationsV1.js.map