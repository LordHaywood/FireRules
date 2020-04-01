type FieldConfigBase = {
	required?: boolean
}

type StringBaseConfig = {
	type: "string",
	min?: number,
	max?: number,
	verify?: {
		type: "regex",
		regex: string
	} | {
		type: "email"
	},
	enum?: string[]
};

type BooleanBaseConfig = {
	type: "boolean"
};

type NumberBaseConfig = {
	type: "number",
	min?: number,
	max?: number,
	enum?: number[]
};

export type TimestampBaseConfig = {
	type: "timestamp"
};

export type ObjectBaseConfig = {
	type: "object",
	fields: FieldsConfig
};

export type ArrayBaseConfig = {
	type: "array",
	valueType: ArrayFieldConfig
};

export type BaseFieldConfig = StringBaseConfig | BooleanBaseConfig | NumberBaseConfig | TimestampBaseConfig | ObjectBaseConfig | ArrayBaseConfig;

export type StringConfig = FieldConfigBase & StringBaseConfig;
export type BooleanConfig = FieldConfigBase & BooleanBaseConfig;
export type NumberConfig = FieldConfigBase & NumberBaseConfig;
export type TimestampConfig = FieldConfigBase & TimestampBaseConfig;
export type ObjectConfig = FieldConfigBase & ObjectBaseConfig;
export type ArrayConfig = FieldConfigBase & ArrayBaseConfig;

export type ArrayFieldConfig =  StringBaseConfig | BooleanBaseConfig | NumberBaseConfig | TimestampBaseConfig | ObjectBaseConfig;
export type FieldConfig = StringConfig | BooleanConfig | ObjectConfig | NumberConfig | TimestampConfig | ArrayConfig;

export type FieldsConfig = {
	[fieldId: string]: FieldConfig
};