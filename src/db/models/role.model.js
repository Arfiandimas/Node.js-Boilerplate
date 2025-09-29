export default (sequelize, DataTypes) => {
	const role = sequelize.define(
		'role',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			tableName: 'role',
			timestamps: false,
		},
	);

	role.associate = (models) => {
		role.hasMany(models.user, {
			foreignKey: 'id',
			onDelete: 'CASCADE',
		});
	};

	return role;
};
