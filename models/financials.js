module.exports = function(sequelize, DataTypes) {
  var Financials = sequelize.define("Financials", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    goaldescr: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    income: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    date: DataTypes.DATE,
    goaldate: DataTypes.STRING
  });

  Financials.associate = function(models) {
    Financials.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Financials;
};
