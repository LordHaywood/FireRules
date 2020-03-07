import { TreeStructure } from "../walker/TreeStructure";

const ObjectHasAllKeysRule = (path: string[], tree: TreeStructure): string =>
  `resource.data.${path.join('.')}${path.length > 0 ? '.' : ''}keys().hasAll(${Object.keys(tree).sort().map(v => `"${v}"`).join(',')})`;
  
export default ObjectHasAllKeysRule;