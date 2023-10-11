const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Nastavnik = sequelize.define("nastavnik",{
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false

          },
        password: Sequelize.STRING

    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );
    return Nastavnik;
};