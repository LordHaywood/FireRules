import ProcessMapFields from './ProcessMapFields';
import { ArrayConfig } from '../config/generic/FieldConfigs';

describe("ProcessMapFields", () => {
  test("Map<string, string>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "string"
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: string`,
      `\t}`
    ].join(`\n`));
  });
  
  test("Map<string, number>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "number"
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: number`,
      `\t}`
    ].join(`\n`));
  });
  
  test("Map<string, timestamp>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "timestamp"
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: number`,
      `\t}`
    ].join(`\n`));
  });
  
  test("Map<string, string[]>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "array",
        valueType: {
          type: "string"
        }
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: string[]`,
      `\t}`
    ].join(`\n`));
  });
  
  test("Map<string, {}>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "object",
        fields: {}
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: {}`,
      `\t}`
    ].join(`\n`));
  });

  test("Map<string, {type: string}>", () => {
    expect(ProcessMapFields({
      type: "map",
      key: "uid",
      field: {
        type: "object",
        fields: {
          type: {
            type: "string"
          }
        }
      }
    })).toBe([
      `{`,
      `\t\t[uid: string]: {`,
      `\t\t\ttype?: string`,
      `\t\t}`,
      `\t}`
    ].join(`\n`));
  });
});