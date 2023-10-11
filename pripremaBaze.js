const db = require('./db.js')


//Migracija
async function dodajProfesora(username,password) {
    try {
        const professor = await db.Nastavnik.create({
            username: username,
            password: password
        });
        console.log(professor.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }
}

async function dodajPredmet(naziv, br_predavanja, br_vjezbi, nastavnik) {
    try {
        const predmet = await db.Predmet.create({
            naziv: naziv,
            br_predavanja_sedmicno: br_predavanja,
            br_vjezbi_sedmicno: br_vjezbi,
            nastavnikUsername: nastavnik
        });
        console.log(predmet.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }
}

async function dodajPrisustvo(sedmica, predavanje, vjezbe, predmetId, studentId) {
    try {
        const prisustvo = await db.Prisustvo.create({
            sedmica: sedmica,
            predavanje: predavanje,
            vjezbe: vjezbe,
            predmetId: predmetId,
            studentId: studentId
        });
        console.log(prisustvo.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }
}

async function dodajStudenta(index, ime, predmetId) {
    try {
        const student = await db.Student.create({
            index: index,
            ime: ime,
            predmetId: predmetId
        });
        console.log(student.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }
}

/*
async function assignNastavnik(nastavnikId, predmetId) {
    try {

      const predmet = await db.Predmet.findByPk(predmetId);
      const nastavnik = await db.Nastavnik.findByPk(nastavnikId);
      await predmet.setNastavnik(nastavnik);
      await predmet.save();
    } catch (err) {
      console.log('Nešto pošlo po zlu');
      throw err;
    }
  }
*/


//Inicijalizacija podataka u bazi

db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija(){
        dodajProfesora('test', '$2a$12$9IZR7.MISMzfNMZyS.L90ex2xAUowvbgWgilr.Cp45FXHuJYeAyuO');
        
        dodajPredmet('Web tehnologije',5,5,'test');
        dodajPredmet('Razvoj mobilnih aplikacija',5,5,'test');
       
        dodajStudenta(12345, 'Neko Nekic', 'Web tehnologije');
        dodajStudenta(12346, 'Drugi Neko', 'Web tehnologije');
        dodajStudenta(12347, 'Nekic Treci','Web tehnologije'); 

        dodajPrisustvo(1,2,2,'Web tehnologije',12345);
        dodajPrisustvo(1,2,2,'Web tehnologije',12346);
        dodajPrisustvo(1,1,2,'Web tehnologije',12347);

        dodajPrisustvo(2,2,1,'Web tehnologije',12345);
        dodajPrisustvo(2,2,2,'Web tehnologije',12346);
        dodajPrisustvo(2,1,2,'Web tehnologije',12347);

        dodajPrisustvo(3,2,1,'Web tehnologije',12345);
        dodajPrisustvo(3,2,2,'Web tehnologije',12346);
        dodajPrisustvo(3,1,2,'Web tehnologije',12347);

        dodajPrisustvo(4,2,1,'Web tehnologije',12345);
        dodajPrisustvo(4,2,2,'Web tehnologije',12346);
        dodajPrisustvo(4,1,2,'Web tehnologije',12347);
       
}
