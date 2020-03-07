
/**
 *  boolean, number, string, geo point, binary blob, and timestamp. You can also use arrays or nested objects
 */

export type FieldConfig = StringConfig | BooleanConfig | ObjectConfig | NumberConfig | TimestampConfig | ArrayConfig;

export type StringConfig = {
	type: "string",
	min?: number,
	max?: number,
	verify?: {
		type: "regex",
		regex: string
	} | {
		type: "email"
	},
	enum?: string[],
	required?: boolean
};

export type BooleanConfig = {
	type: "boolean",
	required?: boolean
};

export type NumberConfig = {
	type: "number",
	min?: number,
	max?: number,
	enum?: number[],
	required?: boolean
};

export type TimestampConfig = {
	type: "timestamp",
	required?: boolean
};

export type ObjectConfig = {
	type: "object",
	fields: FieldsConfig,
	required?: boolean
};

export type ArrayConfig = {
	type: "array",
	valueType: StringConfig | BooleanConfig | ObjectConfig | NumberConfig | TimestampConfig,
	required?: boolean
};

export type FieldsConfig = {
	[fieldId: string]: FieldConfig
};