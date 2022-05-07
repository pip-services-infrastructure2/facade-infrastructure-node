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
exports.BlobsOperationsV1 = void 0;
const busboy = require('busboy');
const url = require('url');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class BlobsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('blobs', new pip_services3_commons_nodex_1.Descriptor('service-blobs', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._blobsClient = this._dependencyResolver.getOneRequired('blobs');
    }
    getBlobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            try {
                let page = yield this._blobsClient.getBlobsByFilter(null, filter, paging);
                this.sendResult(req, res, page);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getBlobInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            try {
                let blob = yield this._blobsClient.getBlobById(null, blobId);
                this.sendResult(req, res, blob);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    getBlob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            let blob;
            let uri = null;
            try {
                // Get blob id
                blob = yield this._blobsClient.getBlobById(null, blobId);
                if (blob == null) {
                    throw new pip_services3_commons_nodex_2.NotFoundException(null, 'BLOB_NOT_FOUND', 'Blob ' + blobId + ' was not found').withDetails('blob_id', blobId);
                }
                // Redirect to URI if it exist
                uri = yield this._blobsClient.getBlobUriById(null, blobId);
                if (uri) {
                    res.writeHead(302, { 'Location': uri });
                    res.end();
                }
                // If URI is not avalable then stream blob directly
                if (uri)
                    return;
                else {
                    res.header('Content-Type', blob.content_type);
                    res.header('Content-Length', blob.size);
                    res.header('Content-Disposition', 'inline; filename=' + (blob.name || blob.id));
                    blob = yield this._blobsClient.getBlobStreamById(null, blobId, res);
                    this.sendResult(req, res, blob);
                }
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    setBlob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            let group = req.param('group');
            let expireTime = pip_services3_commons_nodex_4.DateTimeConverter.toNullableDateTime(req.param('expire_time'));
            let completed = pip_services3_commons_nodex_3.BooleanConverter.toBoolean(req.param('completed'));
            let blob;
            try {
                let form = new busboy({ headers: req.headers });
                form.on('file', (field, rs, name, encoding, contentType) => {
                    blob = {
                        id: blobId,
                        group: group,
                        name: name,
                        content_type: contentType,
                        size: null,
                        expire_time: expireTime,
                        completed: completed
                    };
                    this._blobsClient.createBlobFromStream(null, blob, rs).then((blob) => res.json(blob));
                });
                form.on('finish', () => {
                    //res.json(blob);
                });
                req.pipe(form);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    loadBlobFromUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            let group = req.param('group');
            let uri = req.param('url') || req.param('uri');
            let name = req.param('name');
            let expireTime = pip_services3_commons_nodex_4.DateTimeConverter.toNullableDateTime(req.param('expire_time'));
            let completed = pip_services3_commons_nodex_3.BooleanConverter.toBoolean(req.param('completed'));
            try {
                if (name == null || name == '') {
                    let path = new url.URL(uri).pathname || '';
                    let pos = path.lastIndexOf('/');
                    if (pos > 0)
                        name = path.substring(pos + 1);
                }
                let blob = {
                    id: blobId,
                    group: group,
                    name: name,
                    content_type: null,
                    size: null,
                    create_time: new Date(),
                    expire_time: expireTime,
                    completed: completed
                };
                blob = yield this._blobsClient.createBlobFromUri(null, blob, uri);
                res.json(blob);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    updateBlobInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            let blob = req.body || {};
            blob.id = blobId;
            try {
                blob = yield this._blobsClient.updateBlobInfo(null, blob);
                this.sendResult(req, res, blob);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    deleteBlob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blobId = req.param("id") || req.param("blob_id");
            try {
                yield this._blobsClient.deleteBlobById(null, blobId);
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
}
exports.BlobsOperationsV1 = BlobsOperationsV1;
//# sourceMappingURL=BlobsOperationsV1.js.map