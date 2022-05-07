const busboy = require('busboy');
const url = require('url');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { NotFoundException } from 'pip-services3-commons-nodex';
import { BooleanConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IBlobsClientV1 } from 'client-blobs-node';
import { BlobInfoV1 } from 'client-blobs-node';

export class BlobsOperationsV1  extends RestOperations {
    private _blobsClient: IBlobsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('blobs', new Descriptor('service-blobs', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._blobsClient = this._dependencyResolver.getOneRequired<IBlobsClientV1>('blobs');
    }

    public async getBlobs(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        try {
            let page = await this._blobsClient.getBlobsByFilter(null, filter, paging);
            this.sendResult(req, res, page);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async getBlobInfo(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");

        try {
            let blob = await this._blobsClient.getBlobById(null, blobId);
            this.sendResult(req, res, blob);
        } catch (err) {
            this.sendError(req, res, err);
        }
        
    }

    public async getBlob(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");
        let blob: BlobInfoV1;
        let uri: string = null;

        try {
            // Get blob id
            blob = await this._blobsClient.getBlobById(null, blobId);
            if (blob == null) {
                throw new NotFoundException(
                    null,
                    'BLOB_NOT_FOUND',
                    'Blob ' + blobId + ' was not found'
                ).withDetails('blob_id', blobId);
            }
            // Redirect to URI if it exist
            uri = await this._blobsClient.getBlobUriById(null, blobId);
            if (uri) {
                res.writeHead(302, { 'Location': uri });
                res.end();
            }
            // If URI is not avalable then stream blob directly
            if (uri) return;
            else {
                res.header('Content-Type', blob.content_type);
                res.header('Content-Length', blob.size);
                res.header('Content-Disposition', 'inline; filename=' + (blob.name || blob.id));
                blob = await this._blobsClient.getBlobStreamById(null, blobId, res);
                this.sendResult(req, res, blob);
            } 
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

    public async setBlob(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");
        let group = req.param('group');
        let expireTime = DateTimeConverter.toNullableDateTime(req.param('expire_time'));
        let completed = BooleanConverter.toBoolean(req.param('completed'));
        let blob: BlobInfoV1;

        try {
            let form = new busboy({ headers: req.headers });
            form.on('file', (field, rs, name, encoding, contentType) => {
                blob = <BlobInfoV1>{
                    id: blobId,
                    group: group,
                    name: name,
                    content_type: contentType,
                    size: null,
                    expire_time: expireTime,
                    completed: completed
                };

                this._blobsClient.createBlobFromStream(null, blob, rs).then((blob: BlobInfoV1) => res.json(blob));
            });
            form.on('finish', () => {
                //res.json(blob);
            })
            req.pipe(form);
        } catch(err) {
            this.sendError(req, res, err);
        }
    }

    public async loadBlobFromUrl(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");
        let group = req.param('group');
        let uri = req.param('url') || req.param('uri');
        let name = req.param('name');
        let expireTime = DateTimeConverter.toNullableDateTime(req.param('expire_time'));
        let completed = BooleanConverter.toBoolean(req.param('completed'));
        
        try {
            if (name == null || name == '') {
                let path = new url.URL(uri).pathname || '';
                let pos = path.lastIndexOf('/');
                if (pos > 0)
                    name = path.substring(pos + 1);
            }

            let blob: BlobInfoV1 = <BlobInfoV1>{
                id: blobId,
                group: group,
                name: name,
                content_type: null,
                size: null,
                create_time: new Date(),
                expire_time: expireTime,
                completed: completed
            };

            blob = await this._blobsClient.createBlobFromUri(null, blob, uri);
            res.json(blob);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }
    
    public async updateBlobInfo(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");
        let blob = req.body || {};
        blob.id = blobId;

        try {
            blob = await this._blobsClient.updateBlobInfo(null, blob);
            this.sendResult(req, res, blob);
        } catch (err) {
            this.sendError(req, res, err);
        }
        
    }

    public async deleteBlob(req: any, res: any): Promise<void> {
        let blobId = req.param("id") || req.param("blob_id");

        try {
            await this._blobsClient.deleteBlobById(null, blobId);
            this.sendEmptyResult(req, res)
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

}