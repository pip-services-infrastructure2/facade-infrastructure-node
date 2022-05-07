import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { EmailRecipientV1 } from 'client-email-node';
import { IEmailClientV1 } from 'client-email-node';



export class EmailOperationsV1  extends RestOperations {
    private _emailClient: IEmailClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('email', new Descriptor('service-email', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._emailClient = this._dependencyResolver.getOneRequired<IEmailClientV1>('email');
    }

    public async sendMessage(req: any, res: any): Promise<void> {
        let recipientId = req.param('recipient_id');
        let recipientName = req.param('recipient_name');
        let recipientEmail = req.param('recipient_email');
        let language = req.param('language');
        let parameters = new ConfigParams(this.getFilterParams(req));
        let message = req.body || {};

        try {
            if (recipientId != null) {
                let recipient = <EmailRecipientV1>{
                    id: recipientId,
                    name: recipientName,
                    email: recipientEmail,
                    language: language
                };

                await this._emailClient.sendMessageToRecipient(
                    null, recipient, message, parameters
                );
            } else {
                await this._emailClient.sendMessage(
                    null, message, parameters, 
                );
            }
            this.sendEmptyResult(req, res)
        } catch(err) {
            this.sendError(req, res, err);
        }
        
    }
}