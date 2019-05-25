import * as Sequelize from 'sequelize';
import { ICaseInstance, ICaseAttributes } from '../interfaces/models/case';

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (sequelize: Sequelize.Sequelize): Sequelize.Model<ICaseInstance, ICaseAttributes> {
    const cases = sequelize.define<ICaseInstance, ICaseAttributes>('cases', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        bikeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'bikes',
              key: 'id'
            }
        },
        policeOfficerId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        theftDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        theftDescription: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isResolved: {
            type: Sequelize.BOOLEAN,
        },
        resolvedDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });
    cases.associate = (models) => {
        cases.belongsTo(models.users, { foreignKey: 'policeOfficerId', as: 'policeOfficer' });
        cases.belongsTo(models.bikes, { foreignKey: 'bikeId', as: 'bike' });
    };
    return cases;
}
