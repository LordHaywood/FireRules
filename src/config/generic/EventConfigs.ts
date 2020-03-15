import Conditions from './ConditionsConfigs'; 

export type OnEventConfig = {
	fields?: string[],
	params?: string[],
	requireAuth?: boolean,
	conditions?: Conditions
}

export type CanCreate = {
	fields: string[],
	params?: string[],
	requireAuth?: boolean,
	conditions?: Conditions
};

export type CanRead = {
	fields: string[],
	params: string[],
	requireAuth?: boolean,
	conditions?: Conditions
};

export type CanEdit = {
	fields: string[],
	params: string[],
	requireAuth?: boolean,
	conditions?: Conditions
};

export type CanDelete = {
	params: string[],
	requireAuth?: boolean,
	conditions?: Conditions
};