import { MapConfig } from "../config/generic/FieldConfigs";
import { ProcessFieldRaw } from "./ProcessField";
import Indent from "../utils/Indent";

const ProcessMapFields = (config: MapConfig, depth: number = 1): string => {
	return [
    `{`,
    `${Indent(depth + 1)}[${config.key}: string]: ${ProcessFieldRaw(config.field, depth + 1)}`,
    `${Indent(depth)}}`
  ].join(`\n`);
};

export default ProcessMapFields;