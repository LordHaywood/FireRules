import DocumentConfig from "../config/generic/DocumentConfig";
import RulesConfig from "./types/RulesConfig";
import RenderOperationCondtions from "./RenderOperationCondtions";
import Indent from "../utils/Indent";

type OperationInfo = {type: string, condtions: string}
type OperationList = OperationInfo[]

const RenderOperations = (config: DocumentConfig, indent: number = 1): string => {
  const rules: RulesConfig = config.rules;
  const list: OperationList = [];

  if (rules.create)
    list.push({type: "create", condtions: RenderOperationCondtions(rules.create, indent)});
  if (rules.delete)
    list.push({type: "delete", condtions: RenderOperationCondtions(rules.delete, indent)});
  if (rules.get)
    list.push({type: "get", condtions: RenderOperationCondtions(rules.get, indent)});
  if (rules.list)
    list.push({type: "list", condtions: RenderOperationCondtions(rules.list, indent)});
  if (rules.read)
    list.push({type: "read", condtions: RenderOperationCondtions(rules.read, indent)});
  if (rules.update)
    list.push({type: "update", condtions: RenderOperationCondtions(rules.update, indent)});
  if (rules.write)
    list.push({type: "write", condtions: RenderOperationCondtions(rules.write, indent)});

  return list.reduce((list: string[], operation: OperationInfo) => {
    list.push(`allow ${operation.type}: if ${operation.condtions};`)
    return list;
  }, []).map(v => Indent(indent) + v).join('\n');
}

export default RenderOperations;