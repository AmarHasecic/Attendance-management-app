
const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt22","root","password",{host:"127.0.0.1",dialect:"mysql"});
const db={};

db.sequelize = sequelize;

//import modela
db.Nastavnik = require('./models/nastavnik.js')(sequelize, Sequelize.DataTypes);
db.Predmet = require('./models/predmet.js')(sequelize, Sequelize.DataTypes);
db.Prisustvo = require('./models/prisustvo.js')(sequelize, Sequelize.DataTypes);
db.Student = require('./models/student.js')(sequelize, Sequelize.DataTypes);


//relacije
db.Nastavnik.hasMany(db.Predmet,{as:'predmetiNastavnika'});

db.Predmet.belongsToMany(db.Student, {
    as: 'studenti',
    through: {
        model: db.Prisustvo,
        unique: false,
        foreignKey: 'predmetId'
    },
    foreignKey: 'predmetId'
});

db.Student.belongsToMany(db.Predmet, {
    as: 'predmeti',
    through: {
        model: db.Prisustvo,
        unique: false,
        foreignKey: 'studentId'
    },
    foreignKey: 'studentId'
});




module.exports=db;