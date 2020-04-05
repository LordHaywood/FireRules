import { FieldsConfig } from "../config/generic/FieldConfigs";
import ProcessField from "./ProcessField";

const ProcessFields = (tree: FieldsConfig, depth: number = 1): string => {
	const list: string[] = Object.keys(tree).sort().map(fieldId =>
		ProcessField(tree[fieldId], depth, fieldId)
	);

	return `{${list.length > 0 ? '\n' + `	`.repeat(depth) : ''}${list.join(',\n' + `	`.repeat(depth))}${list.length > 0 ? '\n' + `	`.repeat(depth - 1) : ''}}`;
};

export default ProcessFields;