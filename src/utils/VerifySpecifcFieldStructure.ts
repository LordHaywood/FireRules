import { FieldConfig } from "../config/generic/FieldConfigs";
import SpecifcFieldStructure from "../config/generic/SpecifcFieldStructure";

const VerifySpecifcFieldStructure = (structure: FieldConfig, specifcStructure: SpecifcFieldStructure): boolean => {
  if (typeof specifcStructure == "boolean")
    return true;

  if (structure.type == "object") {
    const structureKeys = Object.keys(structure.fields);
  
    for (let key in Object.keys(specifcStructure)) {
      if (structureKeys.indexOf(key) == -1)
        return false;

      const subSpecifcStructure = specifcStructure[key];
      if (typeof subSpecifcStructure != "boolean")
        return VerifySpecifcFieldStructure(structure.fields[key], subSpecifcStructure);
    }

    return true;
  } else if (structure.type == "map") {
    const specifcKeys = Object.keys(specifcStructure);
    if (specifcKeys.length != 1)
      return false;

    return VerifySpecifcFieldStructure(structure.field, specifcStructure[specifcKeys[0]]); 
  }

  return false;
}