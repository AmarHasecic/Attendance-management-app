const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        
         index: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false

          },

          ime: Sequelize.STRING
    },
    {
        freezeTableName: true,
        timestamps: false
    }
    );
    return Student;
};