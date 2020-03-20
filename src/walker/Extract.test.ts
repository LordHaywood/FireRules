import { ExtractObjectType, ExtractFieldType, ExtractArrayFieldType, SplitFieldPath } from './Extract';

describe("SplitFieldPath", () => {
  test("single field", () => {
    expect(SplitFieldPath("field")).toEqual(["field"]);
  });
  
  test("multiple field", () => {
    expect(SplitFieldPath("field1.field2")).toEqual(["field1", "field2"]);
  });
});

describe("ExtractArrayFieldType", () => {
  test("String", () => {
    expect(ExtractArrayFieldType({
      type: "string",
    })).toStrictEqual({
      type: "string"
    });
  });
  
  test("Boolean", () => {
    expect(ExtractArrayFieldType({
      type: "boolean"
    })).toStrictEqual({
      type: "boolean"
    });
  });
  
  test("Number", () => {
    expect(ExtractArrayFieldType({
      type: "number"
    })).toStrictEqual({
      type: "number"
    });
  });
  
  test("Timestamp", () => {
    expect(ExtractArrayFieldType({
      type: "timestamp"
    })).toStrictEqual({
      type: "timestamp"
    });
  });


  test("Object", () => {
    expect(ExtractArrayFieldType({
      type: "object",
      fields: {}
    })).toStrictEqual({
      type: "object",
      map: {}
    });
    
    expect(ExtractArrayFieldType({
      type: "object",
      fields: {
        "string": {
          type: "string"
        },
        "boolean": {
          type: "boolean",
          required: true
        },
        "number": {
          type: "number"
        },
        "timestamp": {
          type: "timestamp"
        },
        "array": {
          type: "array",
          valueType: {
            type: "string"
          }
        },
        "object": {
          type: "object",
          fields: {}
        }
      }
    })).toStrictEqual({
      type: "object",
      map: {
        "string": {
          type: "string",
          required: false
        },
        "boolean": {
          type: "boolean",
          required: true
        },
        "number": {
          type: "number",
          required: false
        },
        "timestamp": {
          type: "timestamp",
          required: false
        },
        "array": {
          type: "array",
          valueType: {
            type: "string"
          },
          required: false
        },
        "object": {
          type: "object",
          map: {},
          required: false
        }
      }
    });
  });
});

describe("ExtractFieldType", () => {
  test("String", () => {
    expect(ExtractFieldType({
      type: "string",
    })).toStrictEqual({
      type: "string",
      required: false
    });
  });
  
  test("Boolean", () => {
    expect(ExtractFieldType({
      type: "boolean"
    })).toStrictEqual({
      type: "boolean",
      required: false
    });
  });
  
  test("Number", () => {
    expect(ExtractFieldType({
      type: "number"
    })).toStrictEqual({
      type: "number",
      required: false
    });
  });
  
  test("Timestamp", () => {
    expect(ExtractFieldType({
      type: "timestamp"
    })).toStrictEqual({
      type: "timestamp",
      required: false
    });
  });

  test("Array", () => {
    expect(ExtractFieldType({
      type: "array",
      valueType: {
        type: "string"
      }
    })).toStrictEqual({
      type: "array",
      valueType: {
        type: "string"
      },
      required: false
    });
  });


  test("Object", () => {
    expect(ExtractFieldType({
      type: "object",
      fields: {}
    })).toStrictEqual({
      type: "object",
      map: {},
      required: false
    });
    
    expect(ExtractFieldType({
      type: "object",
      fields: {
        "string": {
          type: "string"
        },
        "boolean": {
          type: "boolean",
          required: true
        },
        "number": {
          type: "number"
        },
        "timestamp": {
          type: "timestamp"
        },
        "array": {
          type: "array",
          valueType: {
            type: "string"
          }
        },
        "object": {
          type: "object",
          fields: {}
        }
      }
    })).toStrictEqual({
      type: "object",
      map: {
        "string": {
          type: "string",
          required: false
        },
        "boolean": {
          type: "boolean",
          required: true
        },
        "number": {
          type: "number",
          required: false
        },
        "timestamp": {
          type: "timestamp",
          required: false
        },
        "array": {
          type: "array",
          valueType: {
            type: "string"
          },
          required: false
        },
        "object": {
          type: "object",
          map: {},
          required: false
        }
      },
      required: false
    });
  });
});

describe("ExtractObjectType", () => {
  test("string", () => {
    expect(ExtractObjectType({
      stringField: {
        type: "string"
      }
    })).toEqual({
      stringField: {
        type: "string",
        required: false
      }
    });
  });
  
  test("Boolean", () => {
    expect(ExtractObjectType({
      booleanField: {
        type: "boolean"
      }
    })).toStrictEqual({
      booleanField: {
        type: "boolean",
        required: false
      }
    });
  });
  
  test("Number", () => {
    expect(ExtractObjectType({
      numberField: {
        type: "number"
      }
    })).toStrictEqual({
      numberField: {
        type: "number",
        required: false
      }
    });
  });
  
  test("Timestamp", () => {
    expect(ExtractObjectType({
      timestampField: {
        type: "timestamp"
      }
    })).toStrictEqual({
      timestampField: {
        type: "timestamp",
        required: false
      }
    });
  });


  test("Object", () => {
    expect(ExtractObjectType({
      objectField: {
        type: "object",
        fields: {}
      }
    })).toStrictEqual({
      objectField: {
        type: "object",
        map: {},
        required: false
      }
    });
    
    expect(ExtractObjectType({
      objectField: {
        type: "object",
        fields: {
          "string": {
            type: "string"
          },
          "boolean": {
            type: "boolean",
            required: true
          },
          "number": {
            type: "number"
          },
          "timestamp": {
            type: "timestamp"
          },
          "array": {
            type: "array",
            valueType: {
              type: "string"
            }
          },
          "object": {
            type: "object",
            fields: {}
          }
        }
      }
    })).toStrictEqual({
      objectField: {
        type: "object",
        map: {
          "string": {
            type: "string",
            required: false
          },
          "boolean": {
            type: "boolean",
            required: true
          },
          "number": {
            type: "number",
            required: false
          },
          "timestamp": {
            type: "timestamp",
            required: false
          },
          "array": {
            type: "array",
            valueType: {
              type: "string"
            },
            required: false
          },
          "object": {
            type: "object",
            map: {},
            required: false
          }
        },
        required: false
      }
    });
  });
});