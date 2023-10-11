const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        
         naziv: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false

          },
          br_predavanja_sedmicno: Sequelize.INTEGER,
          br_vjezbi_sedmicno: Sequelize.INTEGER
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );
    return Predmet;
};