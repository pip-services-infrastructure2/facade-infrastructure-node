import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { LongConverter } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';

import { ISettingsClientV1 } from 'client-settings-node';


export class SettingsOperationsV1  extends RestOperations {
    private _settingsClient: ISettingsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('settings', new Descriptor('service-settings', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._settingsClient = this._dependencyResolver.getOneRequired<ISettingsClientV1>('settings');
    }

    public async getSectionIds(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._settingsClient.getSectionIds(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getSections(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._settingsClient.getSections(
                null, filter, paging
            );
            this.sendResult(req, res, page)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getSection(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');

        try {
            let config = await this._settingsClient.getSectionById(
                null, id
            );
            this.sendResult(req, res, config)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async setSection(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');
        let parameters = ConfigParams.fromValue(req.body);

        try {
            let config = await this._settingsClient.setSection(
                null, id, parameters
            );
            this.sendResult(req, res, config)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getParameter(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');

        try {
            let parameters = await this._settingsClient.getSectionById(
                null, id
            );
            let value = parameters ? parameters.get(key) : null;
            this.sendResult(req, res, value)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async setParameter(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');
        let value = req.param('value');
        let updateParams = ConfigParams.fromTuples(
            key, value
        );

        try {
            let parameters = await this._settingsClient.modifySection(
                null, id, updateParams, null
            );
            let value = parameters ? parameters.get(key) : null;
            this.sendResult(req, res, value)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async incrementParameter(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');
        let key = req.param('key') || req.param('param');
        let value = LongConverter.toLong(req.param('value') || req.param('count'));
        let incrementParams = ConfigParams.fromTuples(
            key, value
        );

        try {
            let parameters = await this._settingsClient.modifySection(
                null, id, null, incrementParams
            );
            let value = parameters ? parameters.get(key) : null;
            this.sendResult(req, res, value)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async modifySection(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');
        let params = req.body || {};
        let updateParams = ConfigParams.fromValue(params.update_params);
        let incrementParams = ConfigParams.fromValue(params.increment_params);

        try {
            let config = await this._settingsClient.modifySection(
                null, id, updateParams, incrementParams
            );
            this.sendResult(req, res, config)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async clearSection(req: any, res: any): Promise<void> {
        let id = req.param('id') || req.param('section');

        try {
            await this._settingsClient.setSection(
                null, id, new ConfigParams()
            );
            this.sendEmptyResult(req, res);
        } catch(err) {
            this.sendError(req, res, err);
        }        
    }

}