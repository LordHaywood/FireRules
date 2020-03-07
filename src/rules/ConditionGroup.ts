type ConditionGroup = {
	operator: "&&"|"||",
	conditions: (ConditionGroup|string)[]
};

export default ConditionGroup;