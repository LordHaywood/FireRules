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

export type MapBaseConfig = {
  type: "map",
  key: string|["param", string]
	field: FieldConfig
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
export type MapConfig = FieldConfigBase & MapBaseConfig;
export type ArrayConfig = FieldConfigBase & ArrayBaseConfig;

export type ArrayFieldConfig =  StringBaseConfig | BooleanBaseConfig | NumberBaseConfig | TimestampBaseConfig | ObjectBaseConfig | MapBaseConfig;
export type FieldConfig = StringConfig | BooleanConfig | ObjectConfig | NumberConfig | TimestampConfig | ArrayConfig | MapConfig;

export type FieldsConfig = {
	[fieldId: string]: FieldConfig
};

export type DocumentFieldsConfig = ObjectConfig | MapConfig;