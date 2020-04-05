import { ExtractField } from "./ExtractField";
import { DocumentFieldsConfig } from "../config/generic/FieldConfigs";

describe("ExtractField", () => {
  test("object depth 1", () => {
    
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "string"
        }
      }
    };
    expect(ExtractField(obj, ["abc"])).toEqual(obj.fields.abc);
  });

  test("object depth 2", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "object",
          fields: {
            jeff: {
              type: "string"
            }
          }
        }
      }
    };
    expect(ExtractField(obj, ["abc"])).toEqual(obj.fields.abc);
    expect(ExtractField(obj, ["abc", "jeff"])).toEqual(obj.fields.abc.type == "object" && obj.fields.abc.fields.jeff);
  });

  test("object depth 1 with array", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "array",
          valueType: {
            type: "string"
          }
        }
      }
    };
    expect(ExtractField(obj, ["abc"])).toEqual(obj.fields.abc);
    expect(ExtractField(obj, ["abc", 0])).toEqual(obj.fields.abc.type == "array" && obj.fields.abc.valueType);
    expect(ExtractField(obj, ["abc", 1])).toEqual(obj.fields.abc.type == "array" && obj.fields.abc.valueType);
    expect(ExtractField(obj, ["abc", 3])).toEqual(obj.fields.abc.type == "array" && obj.fields.abc.valueType);
  });
  
  test("object depth 2 with array", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "object",
          fields: {
            jeff: {
              type: "array",
              valueType: {
                type: "string"
              }
            }
          }
        }
      }
    };
    expect(ExtractField(obj, ["abc"])).toEqual(obj.fields.abc);
    expect(ExtractField(obj, ["abc", "jeff"])).toEqual(obj.fields.abc.type == "object" && obj.fields.abc.fields.jeff);
    expect(ExtractField(obj, ["abc", "jeff", 0])).toEqual(obj.fields.abc.type == "object" && obj.fields.abc.fields.jeff.type == "array" && obj.fields.abc.fields.jeff.valueType);
    expect(ExtractField(obj, ["abc", "jeff", 2])).toEqual(obj.fields.abc.type == "object" && obj.fields.abc.fields.jeff.type == "array" && obj.fields.abc.fields.jeff.valueType);
  });
  
  test("object depth 3 with middle array", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "array",
          valueType: {
            type: "object",
            fields: {
              jeff: {
                type: "string"
              }
            }
          }
        }
      }
    };
    expect(ExtractField(obj, ["abc"])).toEqual(obj.fields.abc);
    expect(ExtractField(obj, ["abc", 0])).toEqual(obj.fields.abc.type == "array" && obj.fields.abc.valueType);
    expect(ExtractField(obj, ["abc", 1, "jeff"])).toEqual(obj.fields.abc.type == "array" && obj.fields.abc.valueType.type == "object" && obj.fields.abc.valueType.fields.jeff);
  });
});