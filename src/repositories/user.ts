import { Models, Database } from '../models/index';
import { Role } from '../constants/role';
import { IUserInstance } from '../interfaces/models/user';
import { IUser } from '../interfaces/user';
import { Transaction } from 'sequelize';
import police from '../routes/police';

const User = Models.users;
const Case = Models.cases;

export const getAvailablePoliceOfficer = async (): Promise<IUserInstance | null> => {
    return User.findOne({
        where: {
            roleId: Role.PoliceOfficer
        },
        include: [{
            model: Case,
            as: 'cases',
            required: false,
            where: {
                isResolved: true
            }
        }]
    });
};

export const createUser = async (payload: IUser, roleId: number): Promise<IUserInstance> => {
    return User.create({
        id: 0,
        fullName: payload.fullName,
        roleId
    });
};

export const getPoliceOfficer = async (policeId: number): Promise<IUserInstance | null> => {
    return User.findOne({
        where: {
            id: policeId,
            roleId: Role.PoliceOfficer
        },
        include: [{
            model: Case,
            required: false,
            as: 'cases'
        }]
    });
};

export const removePolice = async (policeId: number): Promise<string> => {
    await User.destroy({
        where: {
            id: policeId,
            roleId: Role.PoliceOfficer
        }
    });
    return 'Success';
};
