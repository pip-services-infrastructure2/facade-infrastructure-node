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
exports.SmsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SmsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('sms', new pip_services3_commons_nodex_2.Descriptor('service-sms', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._smsClient = this._dependencyResolver.getOneRequired('sms');
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let recipientId = req.param('recipient_id');
            let recipientName = req.param('recipient_name');
            let recipientPhone = req.param('recipient_phone');
            let language = req.param('language');
            let parameters = new pip_services3_commons_nodex_1.ConfigParams(this.getFilterParams(req));
            let message = req.body || {};
            try {
                if (recipientId != null) {
                    let recipient = {
                        id: recipientId,
                        name: recipientName,
                        phone: recipientPhone,
                        language: language
                    };
                    yield this._smsClient.sendMessageToRecipient(null, recipient, message, parameters);
                }
                else {
                    yield this._smsClient.sendMessage(null, message, parameters);
                }
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.SmsOperationsV1 = SmsOperationsV1;
//# sourceMappingURL=SmsOperationsV1.js.map