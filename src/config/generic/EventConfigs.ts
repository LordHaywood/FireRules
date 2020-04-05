import { ConditionGroup, RulesInternalFieldId } from './ConditionsConfigs'; 

export type OnEventConfig = {
	fields?: RulesInternalFieldId[],
	params?: string[],
	requireAuth?: boolean,
	conditions?: ConditionGroup
}

export type CanCreate = {
	fields: RulesInternalFieldId[],
	params?: string[],
	requireAuth?: boolean,
	conditions?: ConditionGroup
};

export type CanRead = {
	fields: RulesInternalFieldId[],
	params: string[],
	requireAuth?: boolean,
	conditions?: ConditionGroup
};

export type CanEdit = {
	fields: RulesInternalFieldId[],
	params: string[],
	requireAuth?: boolean,
	conditions?: ConditionGroup
};

export type CanDelete = {
	params: string[],
	requireAuth?: boolean,
	conditions?: ConditionGroup
};