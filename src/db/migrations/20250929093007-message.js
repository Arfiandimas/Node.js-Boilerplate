/** @type {import('sequelize-cli').Migration} */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('message', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'text',
      },
      delivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }),

  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('message'),
};
