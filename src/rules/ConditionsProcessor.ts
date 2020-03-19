import ConditionGroup, { SingleCondition, FieldPath, ExternalDocFieldPath, Field, UpdateFieldPath } from "../config/generic/ConditionsConfigs";

export const RenderInteralFieldPath = (fieldPath: FieldPath): string => {
  return "resource.data" + RenderFieldPath(fieldPath[1]);
}

export const RenderInteralUpdateFieldPath = (fieldPath: UpdateFieldPath): string => {
  return "request.resource.data" + RenderFieldPath(fieldPath[1]);
}

export const RenderFieldPath = (path: (string|["param", string])[]): string => {
  return path.reduce((out: string, v): string => {
    if (Array.isArray(v) && v[0] == "param")
      out += `[${v[1]}]`;
    else
      out += `.${v}`;
    return out;
  }, "");
}

export const RenderDocFieldPath = (docFieldPath: ExternalDocFieldPath): string => {
  return `get(/databases/$(database)/documents/${docFieldPath[1].map(v => Array.isArray(v) && v[0] == "param" ? `$(${v[1]})`: v).join('/')}).data${RenderFieldPath(docFieldPath[2][1])}`;
};

export const RenderFieldList = (list: (number|string)[]): string => {
  return `[${list.map(v => typeof v == "number" ? v : `"${v}"`).join(',')}]`;
}

export const RenderField = (fieldPath: Field): string => {
  if (fieldPath[0] == "doc")
    return RenderDocFieldPath(fieldPath);
  if (fieldPath[0] == "updateField")
    return RenderInteralUpdateFieldPath(fieldPath);
  return RenderInteralFieldPath(fieldPath);
};

export const RenderFields = (cond: SingleCondition): string => {
  if (cond[0] == "field" || cond[0] == "updateField" || cond[0] == "doc")
    return RenderField(cond);
  switch (cond.length) {
    case 2:
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
        return `${RenderField(cond[0])}["${cond[2]}"] ${cond[3]} ${typeof cond[4] == "number" ? cond[4] : `"${cond[4]}"`}`; // TODO
  }
  return "";
};

export const RenderFieldGroup = (group: ConditionGroup): string => {
  switch (group.conditions.length) {
    case 0:
      return "true";
    case 1:
      if (!Array.isArray(group.conditions[0]))
        return RenderFieldGroup(group.conditions[0]);
      return RenderFields(group.conditions[0]);
    default:
      return "( " + group.conditions.map((cond: SingleCondition): string => {
        if (!Array.isArray(cond))
          return RenderFieldGroup(cond);
        return RenderFields(cond);
      }).join(` ${group.operation} `) + " )";
  }
};