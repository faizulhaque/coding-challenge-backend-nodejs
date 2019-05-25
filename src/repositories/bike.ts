import { Models } from '../models/index';
import { Operators as Op } from '../models';
import { Role } from '../constants/role';
import { IReportBike, ISearchBike, IPagination } from '../interfaces/index';
import { Transaction } from 'sequelize';
import { IBikeInstance, IBikeAttributes } from '../interfaces/models/bike';
import { IUserInstance } from '../interfaces/models/user';
import { logger } from '../bootstrap/index';
import { listenerCount } from 'cluster';

const Bike = Models.bikes;
const User = Models.users;
const Case = Models.cases;

export const report = async (reportBike: IReportBike, transaction: Transaction): Promise<IBikeInstance> => {

    const user: IUserInstance = await User.create({
        id: 0,
        fullName: reportBike.fullName,
        roleId: Role.BikeOwner
    }, { transaction });

    const bikeObject: IBikeAttributes = {
        id: 0,
        color: reportBike.color,
        licenseNumber: reportBike.licenseNumber,
        ownerId: user.dataValues.id,
        type: reportBike.type
    };

    return Bike.create(bikeObject, { transaction });

};

export const search = async (payload: ISearchBike, paginate:
    IPagination): Promise<{ rows: IBikeInstance[], count: number }> => {

    const include: any = [{
        model: User,
        as: 'owner',
        required: true
    }, {
        model: Case,
        as: 'cases'
    }];

    const where: any = {};

    const orCondition: any = [];

    if (payload.color != null) {
        orCondition.push({color: payload.color});
    }
    if (payload.type != null) {
        orCondition.push({type: payload.type});
    }

    if (payload.fullName != null) {
        include[0].where = {
            fullName: payload.fullName
        };
    }

    if (payload.date != null) {
        include[1].where = {
            theftDate: payload.date
        };
    }
    if (payload.isResolved != null) {
        include[1].where = include[1].where || {};
        include[1].where.isResolved = payload.isResolved;
        include[1].required = true;
    }
    if (payload.description != null) {
        include[1].where = include[1].where || {};
        include[1].where.theftDescription = {
            [Op.like]: `%${payload.description}%`
        };
        include[1].required = true;
    }

    if (payload.licenseNumber != null) {
        where.licenseNumber = payload.licenseNumber;
    }

    if (orCondition.length) {
        where.$or = orCondition;
    }

    const searchCriteria: any = {
        where,
        include,
        limit: paginate.limit,
        offset: paginate.offset
    };
    logger.info('searchCriteria', JSON.stringify(searchCriteria));
    return Bike.findAndCountAll(searchCriteria);
};
