import { RulesInternalDocumentId } from "../../config/generic/ConditionsConfigs"

type Param = ["param", string];

type FieldId = ["field", (string|number|FieldId|Param)[]]

type EventDocId = (string|Param|FieldId)[];

type FieldStucture = {
  [key: string]: number|string|FieldId|Param|FieldStucture
};

export type EditDocumentAction = {
  type: "createDocument"|"updateDocument",
  docId: EventDocId,
  fields: FieldStucture
}

export type DeleteDocumentAction = {
  type: "deleteDocument",
  docId: EventDocId
}

export type DocumentAction = EditDocumentAction | DeleteDocumentAction;

type Action = DocumentAction;

export type DocumentEvent = {
  type: "Document.onCreate"|"Document.onUpdate"|"Document.onDelete",
  documentId: RulesInternalDocumentId,
  actions: Action|(Action[])
}