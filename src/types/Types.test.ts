import { ProcessFields } from '.';
import { FieldsConfig } from '../config/generic/FieldConfigs';

const testCases: {id: string, config: FieldsConfig, result: string}[] = [
	{
		id: "Test empty config",
		config: {},
		result: "{}"
	},
	{
		id: "Test required string config",
		config: {
			stringField: {
				type: "string",
				required: true
			},
		},
		result: [
			`{`,
			`	stringField: string`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional string config",
		config: {
			stringField: {
				type: "string",
				required: false
			},
		},
		result: [
			`{`,
			`	stringField?: string`,
			`}`
		].join('\n')
	},
	{
		id: "Test required number config",
		config: {
			numberField: {
				type: "number",
				required: true
			},
		},
		result: [
			`{`,
			`	numberField: number`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional number config",
		config: {
			numberField: {
				type: "number",
				required: false
			},
		},
		result: [
			`{`,
			`	numberField?: number`,
			`}`
		].join('\n')
	},
	{
		id: "Test required timestamp config",
		config: {
			timestampField: {
				type: "timestamp",
				required: true
			},
		},
		result: [
			`{`,
			`	timestampField: number`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional timestamp config",
		config: {
			timestampField: {
				type: "timestamp",
				required: false
			},
		},
		result: [
			`{`,
			`	timestampField?: number`,
			`}`
		].join('\n')
	},
	{
		id: "Test required empty object config",
		config: {
			emptyObjectField: {
				type: "object",
				fields: {},
				required: true
			},
		},
		result: [
			`{`,
			`	emptyObjectField: {}`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional empty object config",
		config: {
			emptyObjectField: {
				type: "object",
				fields: {},
				required: false
			},
		},
		result: [
			`{`,
			`	emptyObjectField?: {}`,
			`}`
		].join('\n')
	},
	{
		id: "Test required populated object config",
		config: {
			filledOjectField: {
				type: "object",
				fields: {
					stringField: {
						type: "string",
						required: true
					}
				},
				required: true
			},
		},
		result: [
			`{`,
			`	filledOjectField: {`,
			`		stringField: string`,
			`	}`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional populated object config",
		config: {
			filledOjectField: {
				type: "object",
				fields: {
					stringField: {
						type: "string",
						required: true
					}
				},
				required: false
			},
		},
		result: [
			`{`,
			`	filledOjectField?: {`,
			`		stringField: string`,
			`	}`,
			`}`
		].join('\n')
	},
	{
		id: "Test required string array config",
		config: {
			arrayField: {
				type: "array",
				valueType: {
					type: "string"
				},
				required: true
			},
		},
		result: [
			`{`,
			`	arrayField: string[]`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional string array config",
		config: {
			arrayField: {
				type: "array",
				valueType: {
					type: "string"
				},
				required: false
			},
		},
		result: [
			`{`,
			`	arrayField?: string[]`,
			`}`
		].join('\n')
	},
	{
		id: "Test required number array config",
		config: {
			numberField: {
				type: "array",
				valueType: {
					type: "number"
				},
				required: true
			},
		},
		result: [
			`{`,
			`	numberField: number[]`,
			`}`
		].join('\n')
	},
	{
		id: "Test optional number array config",
		config: {
			numberField: {
				type: "array",
				valueType: {
					type: "number"
				},
				required: false
			},
		},
		result: [
			`{`,
			`	numberField?: number[]`,
			`}`
		].join('\n')
	},
	{
		id: "Test required object array config",
		config: {
			mapArrayField: {
				type: "array",
				valueType: {
					type: "object",
					fields: {
						test: {
							type: "string",
							required: true,
						},
						found: {
							type: "string",
							required: false,
						}
					}
				},
				required: true
			},
		},
		result: [
			`{`,
			`	mapArrayField: {`,
			`		found?: string,`,
			`		test: string`,
			`	}[]`,
			`}`
		].join('\n')
	},
	{
		id: "Test basic object config",
		config: {
			test: {
				type: "string",
				required: true,
			},
			found: {
				type: "string",
				required: false,
			}
		},
		result: [
			`{`,
			`	found?: string,`,
			`	test: string`,
			`}`
		].join('\n')
	}
];

describe('Types', () => {
  testCases.forEach(testCase => {
    it(testCase.id, () => {
      expect(ProcessFields(testCase.config)).toBe(testCase.result);
    });
  })
});