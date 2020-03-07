import { CanCreate, CanRead, CanEdit, CanDelete } from "./EventConfigs";
import { FieldsConfig } from "./FieldConfigs";

type Config = {
	[docId: string]: DocumentConfig
};

export type DocumentConfig = {
	id: string,
	description: string,
	fields: FieldsConfig,
	canCreate?: CanCreate,
	canRead?: CanRead,
	canEdit?: CanEdit,
	canDelete?: CanDelete
}

export default Config;