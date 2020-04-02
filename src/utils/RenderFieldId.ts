import { FieldId } from "../config/generic/ConditionsConfigs";

const RenderFieldId = (path: FieldId): string =>
  path.reduce((out: string, v) => {
    if (Array.isArray(v) && v[0] == "param")
      out += `[${v[1]}]`;
    else if (typeof v == "number") {
      if (!Number.isInteger(v) || v < 0)
        throw "Invalid array index";
      out += `[${v}]`;
    } else
      out += `.${v}`;
    return out;
  }, "");

export default RenderFieldId;