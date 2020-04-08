import StructureConditions from "./StructureConditions";
import { DocumentFieldsConfig } from "../config/generic/FieldConfigs";
import { ConditionGroup } from "../config/generic/ConditionsConfigs";

const data: {
  name: string,
  structure: DocumentFieldsConfig,
  conditions: ConditionGroup
}[] = [
  {
    name: "empty object",
    structure: {
      type: "object",
      fields: {}
    },
    conditions: {
      operator: "&&",
      conditions: [
        [["doc", []], "isObject"]
      ]
    }
  },
  {
    name: "empty map",
    structure: {
      type: "map",
      key: "uid",
      field: {
        type: "string"
      }
    },
    conditions: {
      operator: "&&",
      conditions: [
        [["doc", []], "isMap"]
      ]
    }
  },
  {
    name: "string object",
    structure: {
      type: "object",
      fields: {
        a: {
          type: "string"
        }
      }
    },
    conditions: {
      operator: "&&",
      conditions: [
        [["doc", []], "isObject"],
        [["doc", []], "keys", "hasOnly", ["a"]],
        [["doc", ["a"]], "isString"]
      ]
    }
  },
  {
    name: "filled object",
    structure: {
      type: "object",
      fields: {
        a: {
          type: "string"
        },
        b: {
          type: "array",
          valueType: {
            type: "string"
          }
        },
        c: {
          type: "boolean"
        },
        d: {
          type: "timestamp"
        },
        e: {
          type: "object",
          fields: {}
        }
      }
    },
    conditions: {
      operator: "&&",
      conditions: [
        [["doc", []], "isObject"],
        [["doc", []], "keys", "hasOnly", ["a", "b", "c", "d", "e"]],
        [["doc", ["a"]], "isString"],
        [["doc", ["b"]], "isList"],
        [["doc", ["c"]], "isBoolean"],
        [["doc", ["d"]], "isTimestamp"],
        [["doc", ["e"]], "isObject"]
      ]
    }
  },
  {
    name: "deep object",
    structure: {
      type: "object",
      fields: {
        a: {
          type: "object",
          fields: {
            b: {
              type: "string"
            }
          }
        }
      }
    },
    conditions: {
      operator: "&&",
      conditions: [
        [["doc", []], "isObject"],
        [["doc", []], "keys", "hasOnly", ["a"]],
        [["doc", ["a"]], "isObject"],
        [["doc", ["a"]], "keys", "hasOnly", ["b"]],
        [["doc", ["a", "b"]], "isString"],
      ]
    }
  },
];

describe("StructureConditions", () => {
  data.forEach(testCase => {
    test(testCase.name, () => {
      expect(StructureConditions(testCase.structure)).toEqual(testCase.conditions);
    });
  });
});