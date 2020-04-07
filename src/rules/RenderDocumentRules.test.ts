import RenderDocumentRules from "./RenderDocumentRules";

describe("RenderDocumentRules", () => {
  test("empty", () => {
    expect(RenderDocumentRules(["users", "specifcUID"], {
      id: "User",
      description: "A users document",
      rules: {},
      structure: {
        type: "object",
        fields: {}
      }
    })).toBe(`match /users/specifcUID {\n\n\n\n}`);
  });

  test("has param", () => {
    expect(RenderDocumentRules(["users", ["param", "uid"]], {
      id: "User",
      description: "A users document",
      rules: {},
      structure: {
        type: "object",
        fields: {}
      }
    })).toBe(`match /users/{uid} {\n\n\n\n}`);
  });

  test("indent works", () => {
    expect(RenderDocumentRules(["users", "specifcUID"], {
      id: "User",
      description: "A users document",
      rules: {},
      structure: {
        type: "object",
        fields: {}
      }
    }, 1)).toBe(`\tmatch /users/specifcUID {\n\n\n\n\t}`);
  });

  test("requires auth", () => {
    expect(RenderDocumentRules(["users", "specifcUID"], {
      id: "User",
      description: "A users document",
      rules: {
        read: {
          requireAuth: true
        }
      },
      structure: {
        type: "object",
        fields: {}
      }
    })).toBe(`match /users/specifcUID {\n\n\tallow read: if request.auth.uid != null;\n\n}`);
  });

  test("requires auth", () => {
    expect(RenderDocumentRules(["users", "specifcUID"], {
      id: "User",
      description: "A users document",
      rules: {
        read: {
          requireAuth: true,
          additionalConditions: {
            operator: "&&",
            conditions: [
              [["doc", ["fieldId"]], "==", "abc"]
            ]
          }
        }
      },
      structure: {
        type: "object",
        fields: {}
      }
    })).toBe(`match /users/specifcUID {\n\n\tallow read: if (\n\t\trequest.auth.uid != null &&\n\t\tresource.data.fieldId == "abc"\n\t);\n\n}`);
  });
});