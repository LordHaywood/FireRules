import { SingleCondition } from "../../config/generic/ConditionsConfigs";
import RenderField from "../../utils/RenderField";
import RenderFieldList from "../../utils/RenderFieldList";

// TODO: Add is[Number|Map|List] to tests

const RenderCondition = (cond: SingleCondition): string => {
  if (cond[0] == "doc" || cond[0] == "updateField" || cond[0] == "externalDoc")
    return RenderField(cond);
  switch (cond.length) {
    case 1:
      return `request.auth.uid != null`;
    case 2:
      if (cond[1] == "isObject")
        return `${RenderField(cond[0])} is object`;
      if (cond[1] == "isBoolean")
        return `${RenderField(cond[0])} is boolean`;
      if (cond[1] == "isTimestamp")
        return `${RenderField(cond[0])} is timestamp`;
      if (cond[1] == "isNumber")
        return `${RenderField(cond[0])} is number`;
      if (cond[1] == "isMap")
        return `${RenderField(cond[0])} is map`;
      if (cond[1] == "isLatLng")
        return `${RenderField(cond[0])} is LatLng`;
      if (cond[1] == "isString")
        return `${RenderField(cond[0])} is string`;
      if (cond[1] == "isList")
        return `${RenderField(cond[0])} is list`;
      if (cond[1] == "isFloat")
        return `float(${RenderField(cond[0])}) === ${RenderField(cond[0])}`;
      if (cond[1] == "isInteger")
        return `int(${RenderField(cond[0])}) === ${RenderField(cond[0])}`;
    case 3:
      if (cond[1] == "==" || cond[1] == "!==" || cond[1] == "<" || cond[1] == ">" || cond[1] == "<=" || cond[1] == ">=") {
        if (Array.isArray(cond[2]) && cond[2][0] == "param")
          return `${RenderField(cond[0])} ${cond[1]} ${cond[2][1]}`;
        else
          return `${RenderField(cond[0])} ${cond[1]} ${typeof cond[2] == "number" ? cond[2] : `"${cond[2]}"`}`;
      }
      if (cond[1] == "in")
        return `${RenderField(cond[0])} in ${RenderFieldList(cond[2])}`;
      if (cond[1] == "hasAll")
        return `${RenderField(cond[0])}.set().hasAll(${RenderFieldList(cond[2])})`;
      if (cond[1] == "hasAny")
        return `${RenderField(cond[0])}.set().hasAny(${RenderFieldList(cond[2])})`;
      if (cond[1] == "hasOnly")
        return `${RenderField(cond[0])}.set().hasOnly(${RenderFieldList(cond[2])})`;
    case 4:
      if (cond[1] == "withinRequest") {
        return `(request.time.toMillis() - ${RenderField(cond[0])}.seconds() * 1000) < duration.value(${cond[3]}, "${cond[2].charAt(0)}")`;
      }
      if (cond[1] == "size") 
        return `${RenderField(cond[0])}.size() ${cond[2]} ${cond[3]}`;
      if (cond[1] == "keys" || cond[1] == "values")
        return `${RenderField(cond[0])}.${cond[1]}().${cond[2]}(${RenderFieldList(cond[3])})`;
    case 5:
      if (cond[1] == "distanceTo") {
        let field = cond[2];
        if (field[0] == "latlng")
          return `${RenderField(cond[0])}.distance(latlng.value(${field[1]}, ${field[2]})) ${cond[3]} ${cond[4]}`;
        else 
          return `${RenderField(cond[0])}.distance(${RenderField(field)}) ${cond[3]} ${cond[4]}`;
      }
      if (cond[1] == "get") {
        if (typeof cond[2] == "number")
          return `${RenderField(cond[0])}[${cond[2]}] ${cond[3]} ${typeof cond[4] == "number" ? cond[4] : `"${cond[4]}"`}`;
        return `${RenderField(cond[0])}${Array.isArray(cond[2]) ? `[${cond[2][1]}]` : `.${cond[2]}`} ${cond[3]} ${typeof cond[4] == "number" ? cond[4] : `"${cond[4]}"`}`;
      }
      if (cond[1] == "diff")
        return `${RenderField(cond[0])}.${cond[1]}(${RenderField(["updateField", cond[0][1]])}).${cond[2]}().${cond[3]}(${RenderFieldList(cond[4])})`;
  }
  return "";
};

export default RenderCondition;