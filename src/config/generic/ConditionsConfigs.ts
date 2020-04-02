export type FieldId = Array<string|number|["param", string]>;
export type DocumentId = Array<string|["param", string]>;

export type NewFieldIdentifier<DataType> = ["data"|"prevData"|"postData", DataType, string] | ["externalDocData", string[], DataType, string];
export type ParamIdentifier = ["param", string];

export type DocFieldPath = ["doc", FieldId];
export type ExternalDocFieldPath = ["externalDoc", DocumentId, FieldId];
export type UpdateFieldPath = ["updateField", FieldId];

export type Field = ExternalDocFieldPath | DocFieldPath | UpdateFieldPath;

export type Boolean = 
Field;

export type Timestamp = 
  [Field, "withinRequest", "seconds"|"minutes"|"hours"|"days", number];

export type Number = 
  [Field, "=="|"!=="|"<"|">"|"<="|">=", number] |
  [Field, "in", number[]] |
  [Field, "isInteger"] |
  [Field, "isFloat"];

export type String = 
  [Field, "=="|"!==", string|ParamIdentifier] |
  [Field, "size", "=="|"!=="|"<"|">"|"<="|">=", number] |
  [Field, "in", string[]];

export type LatLng = 
  [Field, "distanceTo", ["latlng", number, number]|Field, "=="|"!=="|"<"|">"|"<="|">=", number];

export type Map = 
  [Field, "size", "=="|"!=="|"<"|">"|"<="|">=", number] |
  [Field, "get", string|["param", string], "=="|"!=="|"<"|">"|"<="|">=", number|string] |
  [Field, "keys", "hasAll"|"hasAny"|"hasOnly", string[]] |
  [Field, "values", "hasAll"|"hasAny"|"hasOnly", (string|number)[]] |
  [Field, "diff", "addedKeys"|"effectedKeys"|"changedKeys"|"unchangedKeys", "hasAll"|"hasAny"|"hasOnly", string[]];

export type List =
  [Field, "size", "=="|"!=="|"<"|">"|"<="|">=", number] |
  [Field, "get", number, "=="|"!=="|"<"|">"|"<="|">=", number|string] |
  [Field, "hasAll", (string|number)[]] |
  [Field, "hasAny", (string|number)[]] |
  [Field, "hasOnly", (string|number)[]];

export type SingleCondition = Boolean | Timestamp | Number | String | LatLng | Map | List;

export type ConditionGroup = {
  operation: "&&"|"||",
  conditions: SingleCondition[]
};

export default ConditionGroup;