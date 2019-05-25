import * as Sequelize from 'sequelize';
import { IUserInstance, IUserAttributes } from '../interfaces/models/user';

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (sequelize: Sequelize.Sequelize): Sequelize.Model<IUserInstance, IUserAttributes> {
    const user = sequelize.define<IUserInstance, IUserAttributes>('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [0, 255],
            },
        },
        roleId: {
            allowNull: false,
            type: Sequelize.INTEGER,
        }
    });
    user.associate = (models) => {
        user.hasMany(models.bikes, { foreignKey: 'ownerId', as: 'bikes' });
        user.hasMany(models.cases, { foreignKey: 'policeOfficerId', as: 'cases' });
    };
    return user;
}
