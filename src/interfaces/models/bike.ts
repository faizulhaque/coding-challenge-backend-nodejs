import { Instance } from 'sequelize';
import { IUserAttributes } from './user';
import { ICaseAttributes } from './case';

export interface IBikeAttributes {
  id: number;
  ownerId: number;
  owner?: IUserAttributes;
  licenseNumber: string;
  color: string;
  type: string;
  cases?: ICaseAttributes[];
}

export interface IBikeInstance extends Instance<IBikeAttributes> {
  dataValues: IBikeAttributes;
}
