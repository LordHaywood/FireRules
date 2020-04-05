import Config from "../config/generic/MainConfig";
import FieldConfigMap from "./FieldConfigMap";
import ProcessField from "./ProcessField";
import ProccessTypes from "./ProcessTypes";

const ProcessTypes = (globalConfig: Config): string => {
	const FieldConfigMap: FieldConfigMap = ProccessTypes(globalConfig);

	return Object.keys(FieldConfigMap).sort().map((id: string) =>	
		`export type ${id} = ${ProcessField(FieldConfigMap[id])};\n`
	).join('\n');
};

export default ProcessTypes;