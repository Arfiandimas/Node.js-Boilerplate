export default {
  up: (queryInterface /* , Sequelize */) =>
    queryInterface.bulkInsert('role', [
      {
        name: 'admin',
        description: 'some description',
        created_date_time: new Date(),
      },
    ]),

  down: (queryInterface /* , Sequelize */) =>
    queryInterface.bulkDelete('role', null, {}),
};
