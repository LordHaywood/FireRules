import { CanCreate, CanRead, CanEdit, CanDelete } from "./EventConfigs";
import { DocumentFieldsConfig } from "./FieldConfigs";

type Config = {
	[docId: string]: DocumentConfig
};

export type DocumentConfig = {
	id: string,
	description: string,
	structure: DocumentFieldsConfig,
	canCreate?: CanCreate,
	canRead?: CanRead,
	canEdit?: CanEdit,
	canDelete?: CanDelete
}

export default Config;