export interface workflowDto {
  id: number;
  name: number;
  isActive: string;
  serviceName: string;
  createdOn: Date;
}
export interface Addworkflow {
  id?: number;
  serviceId: number;
  name: string;
  isActive: boolean;
}

export interface statusDto {
  id: number;
  name: number;
  createdOn: Date;
}
export interface ActionDto {
  toStateId: number;
  toStateName: string;
  id: number;
  name: string;
  conditionExpression: string;
  users: any;
  createdOn: Date;
}

export interface addAction {
  conditionExpression: string;
  name: string;
  toStateId: number;
}
export interface usersDto {
  id: number;
  userName: string;
  createdOn: Date;
}
