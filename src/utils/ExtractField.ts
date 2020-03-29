import { ValidPathStr, Path, ExtractPath } from "./FieldPath";

export const HasPath = (obj: any, path: Path): boolean => {
  for (let field of path) {
    if ((typeof field == "string" && !obj[field]) || (typeof field == "number" && !(Array.isArray(obj) && obj[field])))
      return false;
    obj = obj[field];
  }

  return true
};

export const ExtractField = (obj: any, pathStr: string): any => {
  if (!ValidPathStr(pathStr))
    throw "Invalid Path";

  const path: Path = ExtractPath(pathStr);

  if (!HasPath(obj, path))
    throw "Invalid path";
  
  for (let field of path)
    obj = obj[field];

  return obj;
};