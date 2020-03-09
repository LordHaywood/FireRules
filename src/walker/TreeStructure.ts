export type TreeElement = {
  required: boolean,
  type: "string"|"number"|"boolean"|"timestamp"
} | {
  required: boolean,
  type: 'object',
  map: Record<string, TreeElement>
} | {
  required: boolean,
  type: 'array',
  valueType: TreeArrayElement
};

export type TreeArrayElement = {
  type: "string"|"number"|"boolean"|"timestamp"
} | {
  type: 'object',
  map: Record<string, TreeElement>
};

export type TreeStructure = Record<string, TreeElement>;