'use strict';
const Sequelize = require('sequelize');

const timestamps = {
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
};

const userTable = (queryInterface, Sequelize) => {
  return queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    roleId: {
      type: Sequelize.INTEGER,
    },
    ...timestamps
  });
};

const bikeTable = (queryInterface, Sequelize) => {
  return queryInterface.createTable('bikes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ownerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false,
    },
    licenseNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ...timestamps
  });
};

const caseTable = (queryInterface, Sequelize) => {
  return queryInterface.createTable('cases', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    bikeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'bikes',
        key: 'id'
      },
      allowNull: false,
    },
    policeOfficerId: {
      type: Sequelize.INTEGER,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: true,
    },
    theftDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    theftDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isResolved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    resolvedDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    ...timestamps
  });
};


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await userTable(queryInterface, Sequelize);
    await bikeTable(queryInterface, Sequelize);
    await caseTable(queryInterface, Sequelize);
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('bikes');
    await queryInterface.dropTable('cases');
  }
};
