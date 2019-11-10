'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    status: DataTypes.STRING,
    item: DataTypes.STRING,
    deadline: DataTypes.DATEONLY,
    category: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {});
  List.associate = function (models) {
    List.belongsTo(models.User)
  };
  return List;
};