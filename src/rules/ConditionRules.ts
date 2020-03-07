import { Condition, Conditions } from "../config/generic/ConditionsConfigs";
import ConditionGroup from "./ConditionGroup";
import ProcessDataExtraction from "./ExtractData";

const HandleCondtions = (conditions: Conditions, docId: string): ConditionGroup => {
	return {
		operator: "&&",
		conditions: conditions.map(v => {
			if (Array.isArray(v)) {
				if (v.length == 0)
					return HandleCondtion(v[0], docId);
				return HandleCondtions(v, docId);
			}
			else if (v.type == "orGroup") {
				const out: ConditionGroup = {
					operator: "||",
					conditions: [HandleCondtions(v.conditions, docId)]
				};
				return out;
			} else {
				return HandleCondtion(v, docId);
			}
		})
	}
};

const HandleCondtion = (cond: Condition, docId: string): string => {
	switch(cond.type) {
		case "generic":
			let LHS = ProcessDataExtraction(cond.condition[0], docId);
			let RHS = cond.condition[1] == "in" ? cond.condition[2] : ProcessDataExtraction(cond.condition[2], docId);
			return `${LHS} ${cond.condition[1]} ${RHS}`;
		case "documentExists":
			return `${cond.requiredResult == true ? '' : '!'}exists(/databases/$(database)/documents${cond.documentId})`;
		case "valueIsAuthUid":
			return `${ProcessDataExtraction(cond.value, docId)} ${cond.requiredResult == true ? '===' : '!=='} request.auth.uid`;
	}
}

export default HandleCondtions;