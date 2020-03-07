import { FieldConfig } from "../config/generic/FieldConfigs";

const FieldRules = (fieldPath: string[], fieldConfig: FieldConfig): string[] => {
	let output: string[] = [];
	switch (fieldConfig.type) {
		case "string":
			output.push(`incomingData().${fieldPath.join('.')} is string`);
			if (fieldConfig.min)
				output.push(`incomingData().${fieldPath.join('.')}.size() >= ${fieldConfig.min}`);
			if (fieldConfig.max)
				output.push(`incomingData().${fieldPath.join('.')}.size() <= ${fieldConfig.max}`);
			if (fieldConfig.enum)
				output.push(`incomingData().${fieldPath.join('.')} in ["${fieldConfig.enum.join('","')}"]`);
			if (fieldConfig.verify) {
				if (fieldConfig.verify.type == 'email')
					output.push(`incomingData().${fieldPath.join('.')}.matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)`);
				if (fieldConfig.verify.type == 'regex')
					output.push(`incomingData().${fieldPath.join('.')}.matches(${fieldConfig.verify.regex})`);
			}
			break;
		case "number":
			output.push(`incomingData().${fieldPath.join('.')} is number`);
			if (fieldConfig.min)
				output.push(`incomingData().${fieldPath.join('.')}.size() >= ${fieldConfig.min}`);
			if (fieldConfig.max)
				output.push(`incomingData().${fieldPath.join('.')}.size() <= ${fieldConfig.max}`);
			if (fieldConfig.enum)
				output.push(`incomingData().${fieldPath.join('.')} in [${fieldConfig.enum.join(',')}]`);
			break;
		case "boolean":
			output.push(`incomingData().${fieldPath.join('.')} is boolean`);
			output.push(`incomingData().${fieldPath.join('.')} in [true, false]`);
			break;
		case "object":
			output.push(`incomingData().${fieldPath.join('.')} is map`);
			output.push(`incomingData().${fieldPath.join('.')}.keys().hasAll(["${Object.keys(fieldConfig.fields).join('","')}"])`);
			Object.keys(fieldConfig.fields).sort().forEach(fieldId => {
				output.push(...FieldRules([...fieldPath, fieldId], fieldConfig.fields[fieldId]))
			});
			break;
	}
	return output;
}

export default FieldRules;