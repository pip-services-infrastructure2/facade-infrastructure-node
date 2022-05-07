import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class BlobsOperationsV1 extends RestOperations {
    private _blobsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBlobs(req: any, res: any): Promise<void>;
    getBlobInfo(req: any, res: any): Promise<void>;
    getBlob(req: any, res: any): Promise<void>;
    setBlob(req: any, res: any): Promise<void>;
    loadBlobFromUrl(req: any, res: any): Promise<void>;
    updateBlobInfo(req: any, res: any): Promise<void>;
    deleteBlob(req: any, res: any): Promise<void>;
}
