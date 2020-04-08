import DocumentConfig from "../config/generic/DocumentConfig";
import RulesConfig from "./types/RulesConfig";
import RenderOperationCondtions from "./conditions/RenderOperationCondtions";
import Indent from "../utils/Indent";

type OperationInfo = {type: string, condtions: string}
type OperationList = OperationInfo[]

const RenderOperations = (documentConfig: DocumentConfig, indent: number = 1): string => {
  const rules: RulesConfig = documentConfig.rules;
  const list: OperationList = [];

  if (rules.create)
    list.push({type: "create", condtions: RenderOperationCondtions(rules.create, {
      documentConfig,
      operator: "create",
      indent
    })});
  if (rules.delete)
    list.push({type: "delete", condtions: RenderOperationCondtions(rules.delete, {
      documentConfig,
      operator: "delete",
      indent
    })});
  if (rules.get)
    list.push({type: "get", condtions: RenderOperationCondtions(rules.get, {
      documentConfig,
      operator: "get",
      indent
    })});
  if (rules.list)
    list.push({type: "list", condtions: RenderOperationCondtions(rules.list, {
      documentConfig,
      operator: "list",
      indent
    })});
  if (rules.read)
    list.push({type: "read", condtions: RenderOperationCondtions(rules.read, {
      documentConfig,
      operator: "read",
      indent
    })});
  if (rules.update)
    list.push({type: "update", condtions: RenderOperationCondtions(rules.update, {
      documentConfig,
      operator: "update",
      indent
    })});
  if (rules.write)
    list.push({type: "write", condtions: RenderOperationCondtions(rules.write, {
      documentConfig,
      operator: "write",
      indent
    })});

  return list.reduce((list: string[], operation: OperationInfo) => {
    list.push(`allow ${operation.type}: if ${operation.condtions};`)
    return list;
  }, []).map(v => Indent(indent) + v).join('\n');
}

export default RenderOperations;