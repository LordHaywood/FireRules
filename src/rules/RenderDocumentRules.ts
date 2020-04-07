import DocumentConfig from "../config/generic/DocumentConfig";
import { RulesInternalDocumentId } from "../config/generic/ConditionsConfigs";
import RenderRulesDocumentId from "./RenderRulesDocumentId";
import RenderOperations from "./RenderOperations";
import Indent from "../utils/Indent";

const RenderDocumentRules = (documentId: RulesInternalDocumentId, config: DocumentConfig, indent: number = 0): string => {
  return [
    `${Indent(indent)}match ${RenderRulesDocumentId(documentId)} {`,
    RenderOperations(config, indent + 1),
    `${Indent(indent)}}`
  ].join('\n');
};

export default RenderDocumentRules;