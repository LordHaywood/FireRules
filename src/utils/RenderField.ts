import { Field } from "../config/generic/ConditionsConfigs";
import RenderFieldId from "./RenderFieldId";
import RenderDocumentId from "./RenderDocumentId";

const RenderField = (fieldPath: Field): string => {
  switch (fieldPath[0]) {
    case "doc":
      return "resource.data" + RenderFieldId(fieldPath[1]);
    case "updateField":
      return "request.resource.data" + RenderFieldId(fieldPath[1]);
    case "externalDoc":
      return `get(${RenderDocumentId(fieldPath[1])}).data${RenderFieldId(fieldPath[2])}`;
  }
};

export default RenderField;