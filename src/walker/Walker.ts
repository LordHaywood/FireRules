import { DocumentConfig } from "../config/generic/MainConfig";
import { OnEventConfig } from "../config/generic/EventConfigs";
import { FieldConfig } from "../config/generic/FieldConfigs";
import ExtractObjectLevels from "../utils/ExtractObjectLevels";
import { ExtractField } from "../utils/ExtractField";
import FlattenObject from "../utils/FlattenObject";
import { FieldId } from "../config/generic/ConditionsConfigs";

const Walker = (
	config: DocumentConfig,
	canConfig: OnEventConfig,
	onLevel?: (fieldId: FieldId, type: FieldConfig) => void,
	onConfig?: (fieldId: FieldId, config: FieldConfig) => void
): void => {
	if (!(canConfig && canConfig.fields))
    return;

  canConfig.fields.map(path =>
    ExtractObjectLevels(ExtractField(config, path), {throwIfCyclic: true}).map(({path, structure}) => {
      onLevel && onLevel(path, structure);

      if (onConfig && structure.type == "object")
        FlattenObject(structure.fields, path).map(({path, config}) => onConfig(path, config));
    })
  );
}

export default Walker;