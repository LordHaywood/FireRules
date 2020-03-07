import ConditionGroup from "./ConditionGroup";

const ReduceConditionGroups = (group: ConditionGroup, indent: number = 1): string => {
	if (Array.isArray(group.conditions)) {
		return "(\n" + "	".repeat(indent) + group.conditions.map((v): string => {
			if (typeof v == "string") {
				return v;
			} else {
				return ReduceConditionGroups(v, indent + 1);
			}
		}).join(` ${group.operator}\n` + "	".repeat(indent)) + "\n" +  "	".repeat(indent - 1)  + ")";
	} else {
		return ReduceConditionGroups(group.conditions, indent + 1);
	}
}

export default ReduceConditionGroups;