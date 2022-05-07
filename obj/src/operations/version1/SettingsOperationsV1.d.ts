import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class SettingsOperationsV1 extends RestOperations {
    private _settingsClient;
    constructor();
    setReferences(references: IReferences): void;
    getSectionIds(req: any, res: any): Promise<void>;
    getSections(req: any, res: any): Promise<void>;
    getSection(req: any, res: any): Promise<void>;
    setSection(req: any, res: any): Promise<void>;
    getParameter(req: any, res: any): Promise<void>;
    setParameter(req: any, res: any): Promise<void>;
    incrementParameter(req: any, res: any): Promise<void>;
    modifySection(req: any, res: any): Promise<void>;
    clearSection(req: any, res: any): Promise<void>;
}
