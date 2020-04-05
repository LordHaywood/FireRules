import { DocumentConfig } from "../config/generic/MainConfig";
import { OnEventConfig } from "../config/generic/EventConfigs";
import { FieldConfig } from "../config/generic/FieldConfigs";
import ExtractObjectLevels from "../utils/ExtractObjectLevels";
import { ExtractField } from "../utils/ExtractField";
import { RulesInternalFieldId } from "../config/generic/ConditionsConfigs";

const ProcessLevels = (
  fieldConfig: FieldConfig,
  currentPath: RulesInternalFieldId,
  onLevel?: (fieldId: RulesInternalFieldId, type: FieldConfig) => void
) => {
  if (fieldConfig.type == "object" || fieldConfig.type == "map") {
    ExtractObjectLevels(fieldConfig).map(({path, structure}) => {
      onLevel && onLevel([...currentPath, ...path], structure);
    });
  }
}

const Walker = (
	config: DocumentConfig,
	canConfig: OnEventConfig,
	onLevel?: (fieldId: RulesInternalFieldId, type: FieldConfig) => void
): void => {
	if (!Array.isArray(canConfig.fields))
    return;

  canConfig.fields.forEach(fieldPath => {
    const fieldConfig: FieldConfig = ExtractField(config.structure, fieldPath);
    ProcessLevels(fieldConfig, fieldPath, onLevel);
  });
}

export default Walker;