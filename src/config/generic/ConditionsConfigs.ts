export type RulesExternalFieldId = (string|number)[];
export type RulesInternalFieldId = (string|number|["param", string])[];
export type RulesExternalDocumentId = string[];
export type RulesInternalDocumentId = (string|["param", string])[];

export type NewFieldIdentifier<DataType> = ["data"|"prevData"|"postData", DataType, string] | ["externalDocData", string[], DataType, string];
export type ParamIdentifier = ["param", string];

export type DocFieldPath = ["doc", RulesInternalFieldId];
export type ExternalDocFieldPath = ["externalDoc", RulesInternalDocumentId, RulesInternalFieldId];
export type UpdateFieldPath = ["updateField", RulesInternalFieldId];

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

  
export type Utils = 
  ["requiresAuth"];

export type SingleCondition = Boolean | Timestamp | Number | String | LatLng | Map | List | Utils;

export type ConditionGroup = {
  operator: "&&"|"||",
  conditions: ConditionList
};

export type ConditionList = (SingleCondition|ConditionGroup)[];