import { HasFieldId } from "./HasFieldId";
import { DocumentFieldsConfig } from "../config/generic/FieldConfigs";

describe("HasFieldId", () => {
  test("empty object", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {}
    };

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(false);
    expect(HasFieldId(obj, ["abc", 0])).toBe(false);
    expect(HasFieldId(obj, ["abc", "abc"])).toBe(false);
    expect(HasFieldId(obj, ["abc", "abc", 7])).toBe(false);
    expect(HasFieldId(obj, ["abc", 1, "abc"])).toBe(false);
  });

  test("object depth 1", () => {
    const obj: DocumentFieldsConfig = {
      type: "object",
      fields: {
        abc: {
          type: "string"
        }
      }
    };

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(true);
    expect(HasFieldId(obj, ["abc", 0])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff"])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasFieldId(obj, ["abc", 1, "jeff"])).toBe(false);
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

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(true);
    expect(HasFieldId(obj, ["abc", 0])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff"])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasFieldId(obj, ["abc", 1, "jeff"])).toBe(false);
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

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(true);
    expect(HasFieldId(obj, ["abc", 0])).toBe(true);
    expect(HasFieldId(obj, ["abc", 2])).toBe(true);
    expect(HasFieldId(obj, ["abc", 3])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff"])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasFieldId(obj, ["abc", 1, "jeff"])).toBe(false);
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

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(true);
    expect(HasFieldId(obj, ["abc", 0])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff"])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff", 0])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff", 2])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff", 3])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff", 7])).toBe(true);
    expect(HasFieldId(obj, ["abc", 1, "jeff"])).toBe(false);
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
                type: "number"
              }
            }
          }
        }
      }
    };

    expect(HasFieldId(obj, [])).toBe(true);
    expect(HasFieldId(obj, ["abc"])).toBe(true);
    expect(HasFieldId(obj, ["abc", 0])).toBe(true);
    expect(HasFieldId(obj, ["abc", "jeff"])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 0])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 2])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 3])).toBe(false);
    expect(HasFieldId(obj, ["abc", "jeff", 7])).toBe(false);
    expect(HasFieldId(obj, ["abc", 1, "jeff"])).toBe(true);
  });
});