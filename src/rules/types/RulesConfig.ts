import { ConditionGroup } from "../../config/generic/ConditionsConfigs"
import SpecifcFieldStructure from "../../config/generic/SpecifcFieldStructure"

type BaseConfig = {
  additionalConditions: ConditionGroup
}

type ReadOperation = BaseConfig & {
  requireAuth: boolean,
};

type GetOperation = BaseConfig & {
  requireAuth: boolean,
};

type ListOperation = BaseConfig & {
  requireAuth: boolean,
  maxRequest: number
};

type WriteOperation = BaseConfig & {
  structure: SpecifcFieldStructure,
  requireAuth: boolean
};

type CreateOperation = BaseConfig & {
  structure: SpecifcFieldStructure,
  requireAuth: boolean
};

type UpdateOperation = BaseConfig & {
  structure: SpecifcFieldStructure,
  requireAuth: boolean
};

type DeleteOperation = BaseConfig & {
  requireAuth: boolean
};

export type Operation = ReadOperation | GetOperation | ListOperation | WriteOperation | CreateOperation | UpdateOperation | DeleteOperation;

type RulesConfig = {
  read?: ReadOperation

  get?: GetOperation
  list?: ListOperation
  
  write?: WriteOperation

  create?: CreateOperation
  update?: UpdateOperation
  delete?: DeleteOperation
}

export default RulesConfig;