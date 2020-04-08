import { RulesInternalDocumentId, ConditionGroup } from "../../config/generic/ConditionsConfigs";
import SpecifcFieldStructure from "../../config/generic/SpecifcFieldStructure";

export type ReadCollectionInteraction = {
  type: "readCollection",
  path: RulesInternalDocumentId,
  conditions: ConditionGroup, // CollectionConditionGroup
  docLimit: number,
  pageation: boolean
};

export type ReadDocumentInteraction = {
  type: "readDocument",
  path: RulesInternalDocumentId,
  conditions: ConditionGroup, // CollectionConditionGroup
};

export type CreateDocumentInteraction = {
  type: "createDocument",
  path: RulesInternalDocumentId,
  structure: SpecifcFieldStructure,
  conditions: ConditionGroup, // CollectionConditionGroup
};

export type UpdateDocumentInteraction = {
  type: "updateDocument",
  path: RulesInternalDocumentId,
  structure: SpecifcFieldStructure,
  conditions: ConditionGroup, // CollectionConditionGroup
};

export type DeleteDocumentInteraction = {
  type: "deleteDocument",
  path: RulesInternalDocumentId,
  structure: SpecifcFieldStructure,
  conditions: ConditionGroup, // CollectionConditionGroup
};

export type Interaction = ReadCollectionInteraction |
  ReadDocumentInteraction |
  CreateDocumentInteraction |
  UpdateDocumentInteraction |
  DeleteDocumentInteraction;

export type Interactions = Interaction[];