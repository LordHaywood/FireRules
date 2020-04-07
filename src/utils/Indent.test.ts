import Indent from "./Indent";

describe("Indent", () => {
  test("0", () => {
    expect(Indent(0)).toBe('');
  });

  test("1", () => {
    expect(Indent(1)).toBe('\t');
  });

  test("2", () => {
    expect(Indent(2)).toBe('\t\t');
  });

  test("3", () => {
    expect(Indent(3)).toBe('\t\t\t');
  });
});