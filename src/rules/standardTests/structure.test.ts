import RenderRules from "../Rules";

describe("RenderRules.structure", () => {

  // Deny read/write access to all users under any conditions
  test("locked mode (forced for security)", () => {
    expect(RenderRules({
      documents: []
    })).toBe([
      `service cloud.firestore {`,
      `\tmatch /databases/{database}/documents {`,
      `\t\tmatch /{document=**} {`,
      `\t\t\tallow read, write: if false;`,
      `\t\t}`,
      ``,
      ``,
      `\t}`,
      `}`
    ].join('\n'));
  });

  test("basic read/write", () => {
    expect(RenderRules({
      documents: [
        {
          docId: ["cities", ["param", "city"]],
          config: {
            id: "City",
            description: "Document about a city",
            rules: {
              read: {
                requireAuth: false,
                additionalConditions: {
                  operator: "&&",
                  conditions: []
                }
              },
              write: {
                requireAuth: false,
                structure: {},
                additionalConditions: {
                  operator: "&&",
                  conditions: []
                }
              }
            },
            structure: {
              type: "object",
              fields: {}
            }
          }
        }
      ]
    })).toBe([
      `service cloud.firestore {`,
      `\tmatch /databases/{database}/documents {`,
      `\t\tmatch /{document=**} {`,
      `\t\t\tallow read, write: if false;`,
      `\t\t}`,
      ``,
      `\t\tmatch /cities/{city} {\n`,
      `\t\t\tallow read: if true;`,
      `\t\t\tallow write: if true;\n`,
      `\t\t}`,
      `\t}`,
      `}`
    ].join('\n'));
  });
});

const GranularOperations = {
  title: `Basic read/write rules`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow get: if <condition>;
      allow list: if <condition>;
    }

    match /cities/{city} {
      allow create: if <condition>;
      allow update: if <condition>;
      allow delete: if <condition>;
    }
  }
}`
}