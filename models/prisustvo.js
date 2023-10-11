const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Prisustvo = sequelize.define("prisustvo",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
          sedmica: Sequelize.INTEGER,
          predavanje: Sequelize.INTEGER,
          vjezbe: Sequelize.INTEGER
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );
    return Prisustvo;
};