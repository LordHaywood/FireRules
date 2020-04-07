import { RulesInternalDocumentId } from "../config/generic/ConditionsConfigs";

const RenderRulesDocumentId = (documentId: RulesInternalDocumentId): string => {
  let path: string = documentId.map(v => Array.isArray(v) ? `{${v}}` : v).join('/');
  return `/${path}`;
}

export default RenderRulesDocumentId;