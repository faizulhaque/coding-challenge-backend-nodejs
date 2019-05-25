import { Instance } from 'sequelize';
import { IBikeAttributes } from './bike';
import { ICaseAttributes } from './case';

export interface IUserAttributes {
  id: number;
  fullName: string;
  roleId: number;
  bikes?: IBikeAttributes[];
  cases?: ICaseAttributes[];
}

export interface IUserInstance extends Instance<IUserAttributes> {
  dataValues: IUserAttributes;
}
