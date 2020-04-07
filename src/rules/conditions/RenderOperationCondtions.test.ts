import RenderOperationCondtions from "./RenderOperationCondtions";

describe("RenderOperationCondtions", () => {
  test("only doesn't require auth", () => {
    expect(RenderOperationCondtions({
      requireAuth: false,
      additionalConditions: {
        operator: "&&",
        conditions: []
      }
    })).toBe(`true`);
  });

  test("only requires auth", () => {
    expect(RenderOperationCondtions({
      requireAuth: true,
      additionalConditions: {
        operator: "&&",
        conditions: []
      }
    })).toBe(`request.auth.uid != null`);
  });

  test("single condition", () => {
    expect(RenderOperationCondtions({
      requireAuth: false,
      additionalConditions: {
        operator: "&&",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"]
        ]
      }
    })).toBe(`resource.data.field.id == "abc"`);
  });

  test("multiple conditions", () => {
    expect(RenderOperationCondtions({
      requireAuth: false,
      additionalConditions: {
        operator: "&&",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"],
          [["doc", ["field", "id"]], "!==", "346"]
        ]
      }
    }, 0)).toBe(`(\n\tresource.data.field.id == "abc" &&\n\tresource.data.field.id !== "346"\n)`);
  });

  test("&& condition with auth", () => {
    expect(RenderOperationCondtions({
      requireAuth: true,
      additionalConditions: {
        operator: "&&",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"],
          [["doc", ["field", "id"]], "!==", "346"]
        ]
      }
    }, 0)).toBe(`(\n\trequest.auth.uid != null &&\n\tresource.data.field.id == "abc" &&\n\tresource.data.field.id !== "346"\n)`);
  });

  test("&& condition with auth", () => {
    expect(RenderOperationCondtions({
      requireAuth: true,
      additionalConditions: {
        operator: "||",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"],
          [["doc", ["field", "id"]], "!==", "346"]
        ]
      }
    }, 0)).toBe(`(\n\trequest.auth.uid != null &&\n\t(\n\t\tresource.data.field.id == "abc" ||\n\t\tresource.data.field.id !== "346"\n\t)\n)`);
  });

  test("sub conditions group", () => {
    expect(RenderOperationCondtions({
      requireAuth: false,
      additionalConditions: {
        operator: "&&",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"],
          {
            operator: "||",
            conditions: [
              [["doc", ["field", "id"]], "==", "abc"],
              [["doc", ["field", "id"]], "!==", "346"]
            ]
          }
        ]
      }
    }, 0)).toBe(`(\n\tresource.data.field.id == "abc" &&\n\t(\n\t\tresource.data.field.id == "abc" ||\n\t\tresource.data.field.id !== "346"\n\t)\n)`);
  });

  test("reduces group", () => {
    expect(RenderOperationCondtions({
      requireAuth: false,
      additionalConditions: {
        operator: "&&",
        conditions: [
          [["doc", ["field", "id"]], "==", "abc"],
          {
            operator: "&&",
            conditions: [
              [["doc", ["field", "id"]], "==", "edf"],
              [["doc", ["field", "id"]], "!==", "346"]
            ]
          }
        ]
      }
    }, 0)).toBe(`(\n\tresource.data.field.id == "abc" &&\n\tresource.data.field.id == "edf" &&\n\tresource.data.field.id !== "346"\n)`);
  });
});