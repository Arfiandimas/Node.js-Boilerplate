export default (sequelize, DataTypes) => {
  const message = sequelize.define(
    'message',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      from: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      to: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: 'text',
      },
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'message',
      timestamps: false,
    },
  );

  return message;
};