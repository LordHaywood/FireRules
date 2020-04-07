import Walker from './Walker';
import { DocumentConfig } from '../config/generic/FireRulesConfig';
import { OnEventConfig } from '../config/generic/EventConfigs';
import { FieldConfig, ArrayConfig, ArrayFieldConfig } from '../config/generic/FieldConfigs';
import { RulesInternalFieldId } from '../config/generic/ConditionsConfigs';

const extractLevelsFromWalker = (documentConfig: DocumentConfig, onEventConfig: OnEventConfig): {fieldId: RulesInternalFieldId, type: FieldConfig}[] => {
  const output: {fieldId: RulesInternalFieldId, type: FieldConfig}[] = [];
  
  Walker(documentConfig, onEventConfig, (fieldId: RulesInternalFieldId, type: FieldConfig) => {
    output.push({
      fieldId,
      type
    });
  });

  return output;
}

const basicTypes: ("string"|"boolean"|"number"|"timestamp")[] = ["string", "boolean", "number", "timestamp"];

describe("Walker", () => {
  describe("onLevel", () => {

    basicTypes.forEach(type => {
      describe(type, () => {
        [true, false].forEach(required => {
          test(required ? "Required" : "Optional", () => {
            const documentConfig: DocumentConfig = {
              id: "docId",
              description: "abc",
              structure: {
                type: "object",
                fields: {
                  "field": {
                    type: type,
                    required: required
                  }
                }
              }
            };

            expect(extractLevelsFromWalker(documentConfig, {
              fields: [
                ["field"]
              ]
            })).toStrictEqual([]);

            expect(extractLevelsFromWalker(documentConfig, {
              fields: [[]]
            })).toStrictEqual([
              {
                fieldId: [],
                type: {
                  type: "object",
                  fields: {
                    field: {
                      required,
                      type
                    }
                  }
                }
              }
            ]);

            expect(extractLevelsFromWalker(documentConfig, {
              fields: [
                [],
                ["field"]
              ]
            })).toStrictEqual([
              {
                fieldId: [],
                type: {
                  type: "object",
                  fields: {
                    field: {
                      required,
                      type
                    }
                  }
                }
              }
            ]);
          });
        });
      });
    });
    
    const arrayTypes: {
      type: "array", 
      format: ArrayFieldConfig,
      expected: ArrayFieldConfig
    }[] = [
      {
        type: "array", 
        format: {
          type: "string"
        },
        expected: {
          type: "string"
        }
      },
      {
        type: "array", 
        format: {
          type: "number"
        },
        expected: {
          type: "number"
        }
      },
      {
        type: "array", 
        format: {
          type: "boolean"
        },
        expected: {
          type: "boolean"
        }
      },
      {
        type: "array", 
        format: {
          type: "timestamp"
        },
        expected: {
          type: "timestamp"
        }
      },
      {
        type: "array", 
        format: {
          type: "object",
          fields: {}
        },
        expected: {
          type: "object",
          fields: {}
        }
      }
    ];

    arrayTypes.forEach(v => {
      describe(v.type + " " + v.format.type, () => {
        [true, false].forEach(required => {
          test(required ? "Required" : "Optional", () => {
            const fieldConfig: ArrayConfig = {
              type: "array",
              required: required,
              valueType: v.format
            };

            const documentConfig: DocumentConfig = {
              id: "docId",
              description: "abc",
              structure: {
                type: "object",
                fields: {
                  field: fieldConfig
                }
              }
            };

            expect(extractLevelsFromWalker(documentConfig, {
              fields: [
                []
              ]
            })).toStrictEqual([
              {
                fieldId: [],
                type: {
                  type: "object",
                  fields: {
                    field: fieldConfig
                  }
                },
              }
            ]);
          });
        });
      });
    });
  });

  
  describe("depth of objects", () => {
    const documentConfig: DocumentConfig = {
      id: "docId",
      description: "abc",
      structure: {
        type: "object",
        fields: {
          child1: {
            type: "object",
            fields: {
              child2: {
                type: "object",
                fields: {
                  child3: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    };

    expect(extractLevelsFromWalker(documentConfig, {
      fields: [
        []
      ]
    })).toStrictEqual([
      {
        fieldId: [],
        type: documentConfig.structure
      },
      {
        fieldId: ["child1"],
        type: documentConfig.structure.type == "object" && documentConfig.structure.fields.child1
      },
      {
        fieldId: ["child1", "child2"],
        type: documentConfig.structure.type == "object" &&
          documentConfig.structure.fields.child1 &&
          documentConfig.structure.fields.child1.type == "object" &&
          documentConfig.structure.fields.child1.fields.child2
      }
    ]);
  });
});