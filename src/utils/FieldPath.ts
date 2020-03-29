export type Path = (string|number)[];

export const ValidPathStr = (path: string): boolean =>
  /^(\w+)((\.\w+)|(\[\d+\]))*$/.test(path);

export const ValidPathObj = (path: Path): boolean =>
  path.length != 0 &&
    typeof path[0] != "number" &&
    !path.reduce((r, v) => r || (typeof v == "number" && (!Number.isInteger(v)) || v < 0), false);

export const ExtractPath = (pathStr: string): Path =>
  pathStr.split(/[\.[]/g).map(v => v[v.length - 1] == "]" ? parseInt(v.substr(0, v.length - 1)) : v);

export const PathStringify = (path: Path): string =>
  path.reduce((t: string, v:string|number, i) => {
    if (typeof v == "string") {
      if (i != 0)
        return t + `.${v}`;
      return t + v;
    }
    return t + `[${v}]`;
  }, "")
