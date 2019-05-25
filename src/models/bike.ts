import * as Sequelize from 'sequelize';
import { IBikeInstance, IBikeAttributes } from '../interfaces/models/bike';

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (sequelize: Sequelize.Sequelize): Sequelize.Model<IBikeInstance, IBikeAttributes> {
    const bike = sequelize.define<IBikeInstance, IBikeAttributes>('bikes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            }
        },
        licenseNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    bike.associate = (models) => {
        bike.belongsTo(models.users, { foreignKey: 'ownerId', as: 'owner' });
        bike.hasMany(models.cases, { foreignKey: 'bikeId', as: 'cases' });
    };
    return bike;
}
