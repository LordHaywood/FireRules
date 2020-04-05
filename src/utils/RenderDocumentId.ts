import { RulesInternalDocumentId } from "../config/generic/ConditionsConfigs";

const RenderDocumentId = (path: RulesInternalDocumentId): string => {
  if (path.length == 0 || path.length % 2 == 1)
    throw "Invalid Document Id"

  const localPath: string = path.map(v => Array.isArray(v) ? `$(${v[1]})` : v).join("/")
  return `/databases/$(database)/documents/${localPath}`;
}

export default RenderDocumentId;