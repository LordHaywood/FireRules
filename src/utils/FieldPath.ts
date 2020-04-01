import { FieldId } from "../config/generic/ConditionsConfigs";

export const ValidPathStr = (path: string): boolean =>
  /^(\w+)((\.\w+)|(\[\d+\]))*$/.test(path);

export const ValidPathObj = (path: FieldId): boolean =>
  path.length != 0 &&
    typeof path[0] != "number" &&
    !path.reduce((r, v) => r || (typeof v == "number" && (!Number.isInteger(v)) || v < 0), false);

export const ExtractPath = (pathStr: string): FieldId =>
  pathStr.split(/[\.[]/g).map(v => v[v.length - 1] == "]" ? parseInt(v.substr(0, v.length - 1)) : v);

export const PathStringify = (path: FieldId): string =>
  path.reduce((t: string, v, i) => {
    if (Array.isArray(v))
      v = v[1];
    if (typeof v == "string") {
      if (i != 0)
        return t + `.${v}`;
      return t + v;
    }
    return t + `[${v}]`;
  }, "")
