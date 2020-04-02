import ConditionGroup, { SingleCondition, ExternalDocFieldPath, Field, DocumentId, FieldId } from "../config/generic/ConditionsConfigs";

export const RenderFieldList = (list: (number|string)[]): string => {
  return `[${list.map(v => typeof v == "number" ? v : `"${v}"`).join(',')}]`;
}

export const RenderDocumentId = (path: DocumentId): string => {
  return `/databases/$(database)/documents/${path.map(v => Array.isArray(v) ? `$(${v[1]})` : v).join("/")}`;
}

export const RenderFieldPath = (path: FieldId): string => {
  return path.reduce((out: string, v): string => {
    if (Array.isArray(v) && v[0] == "param")
      out += `[${v[1]}]`;
    else
      out += `.${v}`;
    return out;
  }, "");
}

export const RenderField = (fieldPath: Field): string => {
  switch (fieldPath[0]) {
    case "doc":
      return "resource.data" + RenderFieldPath(fieldPath[1]);
    case "updateField":
      return "request.resource.data" + RenderFieldPath(fieldPath[1]);
    case "externalDoc":
      return `get(${RenderDocumentId(fieldPath[1])}).data${RenderFieldPath(fieldPath[2])}`;
  }
};

export const RenderFields = (cond: SingleCondition): string => {
  if (cond[0] == "doc" || cond[0] == "updateField" || cond[0] == "externalDoc")
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
        return `${RenderField(cond[0])}.${cond[1]}(${RenderField(["updateField", cond[0][1]])}).${cond[2]}().${cond[3]}(${RenderFieldList(cond[4])})`;
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