import * as Sequelize from 'sequelize';
import { IUserInstance, IUserAttributes } from './user';
import { IBikeInstance, IBikeAttributes } from './bike';
import { ICaseInstance, ICaseAttributes } from './case';

export interface IModelFactory extends Sequelize.Models {
    user: Sequelize.Model<IUserInstance, IUserAttributes>;
    bike: Sequelize.Model<IBikeInstance, IBikeAttributes>;
    case: Sequelize.Model<ICaseInstance, ICaseAttributes>;
}
