import Walker from './index';
import { DocumentConfig } from '../config/generic/MainConfig';
import { OnEventConfig } from '../config/generic/EventConfigs';
import { TreeStructure, TreeElement, TreeArrayElement } from './TreeStructure';
import { ArrayFieldConfig, FieldConfig, ArrayConfig, ObjectConfig, FieldsConfig } from '../config/generic/FieldConfigs';

const extractLevelsFromWalker = (documentConfig: DocumentConfig, onEventConfig: OnEventConfig): {level: number, path: string[], type: TreeStructure}[] => {
  const output: {level: number, path: string[], type: TreeStructure}[] = [];
  
  Walker(documentConfig, onEventConfig, (level: number, path: string[], type: TreeStructure) => {
    output.push({
      level,
      path,
      type
    });
  });

  return output;
}

describe("Walker", () => {
  describe("onLevel", () => {
    const basicTypes: ("string"|"boolean"|"number"|"timestamp")[] = ["string", "boolean", "number", "timestamp"];
    basicTypes.forEach(type => {
      describe(type, () => {
        [true, false].forEach(required => {
          test(required ? "Required" : "Optional", () => {
            const documentConfig: DocumentConfig = {
              id: "docId",
              description: "abc",
              fields: {
                "field": {
                  type: type,
                  required: required
                }
              }
            };
            
            const onEventConfig: OnEventConfig = {
              fields: ["field"]
            };

            expect(extractLevelsFromWalker(documentConfig, onEventConfig)).toStrictEqual([
              {
                level: 0,
                path: [],
                type: {
                  "field": {
                    type: type,
                    required: required,
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
      expected: TreeArrayElement
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
          map: {}
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
              fields: {
                field: fieldConfig
              }
            };
            
            const onEventConfig: OnEventConfig = {
              fields: ["field"]
            };

            expect(extractLevelsFromWalker(documentConfig, onEventConfig)).toStrictEqual([
              {
                level: 0,
                path: [],
                type: {
                  "field": v.type == "array" ? {
                    required,
                    type: "array",
                    valueType: v.expected
                  } : {
                    required,
                    type: "object",
                    valueType: v.expected
                  }
                }
              }
            ]);
          });
        });
      });
    });
    
  });
});

// TODO: Add object tests