type FieldIdentifier = ["data"|"prevData"|"postData", string] | ["externalDocData", string[], string]|["param", string];

export type FieldExtractor = FieldIdentifier|string|number;

export type Condition = {
	type: "valueIsAuthUid",
	value: FieldIdentifier,
  requiredResult: boolean
} |	{
	type: "documentExists",
  documentId: string,
  requiredResult: boolean
} |	{
	type: "generic",
	condition: Operator
};

type NormalOperator = [FieldExtractor, "==="|"!=="|"<"|">"|"<="|">=", FieldExtractor];
type InOperator = [FieldExtractor, "in", FieldExtractor|(string[])|(number[])];

type Operator = NormalOperator | InOperator;

type ConditionGroup = {
	type: "orGroup",
	conditions: Conditions
}

export type Conditions = (Condition[]|ConditionGroup|Condition)[];