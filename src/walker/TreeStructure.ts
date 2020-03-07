export type TreeElment = {
  required: boolean,
  type: "string"|"number"|"boolean"|"timestamp"
} | {
  required: boolean,
  type: 'object',
  map: Record<string, TreeElment>
} | {
  required: boolean,
  type: 'array',
  valueType: TreeElment
};

export type TreeStructure = Record<string, TreeElment>;