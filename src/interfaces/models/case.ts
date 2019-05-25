import { Instance } from 'sequelize';
import { IBikeInstance } from './bike';
import { IUserInstance } from './user';

export interface ICaseAttributes {
  id: number;
  bikeId: number;
  bike?: IBikeInstance;
  policeOfficerId?: number;
  policeOfficer?: IUserInstance;
  theftDate: Date;
  theftDescription: string;
  isResolved: boolean;
  resolvedDate?: Date;
}

export interface ICaseInstance extends Instance<ICaseAttributes> {
  dataValues: ICaseAttributes;
}
