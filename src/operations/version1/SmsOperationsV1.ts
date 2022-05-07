import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { SmsRecipientV1 } from 'client-sms-node';
import { ISmsClientV1 } from 'client-sms-node';


export class SmsOperationsV1  extends RestOperations {
    private _smsClient: ISmsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('sms', new Descriptor('service-sms', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._smsClient = this._dependencyResolver.getOneRequired<ISmsClientV1>('sms');
    }

    public async sendMessage(req: any, res: any): Promise<void> {
        let recipientId = req.param('recipient_id');
        let recipientName = req.param('recipient_name');
        let recipientPhone = req.param('recipient_phone');
        let language = req.param('language');

        let parameters = new ConfigParams(this.getFilterParams(req));
        let message = req.body || {};

        try {
            if (recipientId != null) {
                let recipient = <SmsRecipientV1>{
                    id: recipientId,
                    name: recipientName,
                    phone: recipientPhone,
                    language: language
                }

                await this._smsClient.sendMessageToRecipient(
                    null, recipient, message, parameters
                );
            } else {
                await this._smsClient.sendMessage(
                    null, message, parameters
                );
            }
            this.sendEmptyResult(req, res)
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

}