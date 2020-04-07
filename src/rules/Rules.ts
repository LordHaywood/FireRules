import FireRulesConfig from "../config/generic/FireRulesConfig";
import RenderDocumentRules from "./RenderDocumentRules";
import Indent from "../utils/Indent";

const Rules = (config: FireRulesConfig): string => {
  return [
    `service cloud.firestore {`,
    `${Indent(1)}match /databases/{database}/documents {`,
    config.documents.map(v => RenderDocumentRules(v.docId, v.config)).join('\n\n'),
    `${Indent(1)}}`,
    `}`
  ].join('\n');
};

export default Rules;