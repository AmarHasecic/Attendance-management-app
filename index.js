const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcrypt');

const db = require('./db.js');

const sequelize = require("sequelize");
const prisustvo = require('./models/prisustvo.js');


const PORT = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

//sesija
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}));


app.get('/predmet.html',function(req,res) {
    res.sendFile(__dirname + '/public/html/predmet.html');
  });

app.get('/prisustvo.html',function(req,res) {
    res.sendFile(__dirname + '/public/html/prisustvo.html');
  });

app.get('/prijava.html',function(req,res) {
    res.sendFile(__dirname + '/public/html/prijava.html');
  }); 

app.get('/predmeti.html',function(req,res) {
  if (req.session.data)
    res.sendFile(__dirname + '/public/html/predmeti.html');
  });   

app.get('/predmeti',function(req,res) {
 
  if (req.session.data){
     res.json(JSON.parse(req.session.data).predmeti)
  }
  else res.json({ "Greška":"Nastavnik nije loginovan."});
  });   

app.post('/login', function(req, res, next) {
    
    //obrada zahtjeva poslanog kroz ajax

        db.Nastavnik.findOne({where:{username: req.body.username}}).then(function(nastavnik){
            
        bcrypt.compare(req.body.password, nastavnik.password, function(err, hash) {
          if (err){
              console.error(err);
              res.json({ "poruka":"Neuspješna prijava"});
          }
          else if (hash) {
          //priprema podataka za spašavanje u sesiju
             username = nastavnik.username;
             
             nastavnik.getPredmetiNastavnika().then(function(resSet){
              var predmeti=[]
              resSet.forEach(predmet => {
                  predmeti.push(predmet.naziv);
              });
              //setanje podataka u sesiju
              req.session.data = JSON.stringify({username, predmeti});

              res.json({ "poruka":"Uspješna prijava"});
          });
          
        }
      });

    })
});

  app.post('/logout', function(req, res, next) {
    
    req.session.data = JSON.stringify(req.body);
    res.json({ "poruka":"Doviđenja"});

  });  

  app.get('/predmet/:NAZIV', (req, res) => {
   
var nazivPredmeta = req.params.NAZIV;
db.Prisustvo.findAll({where:{predmetId:nazivPredmeta}})
.then(function(p){
    
    var prisustva=[]
    var br_predavanja; 
    var br_vjezbi;
    var setIndexa = new Set();
    
    p.forEach(prisustvo => {
        prisustva.push({sedmica: prisustvo.sedmica, predavanja: prisustvo.predavanje, vjezbe: prisustvo.vjezbe, index: prisustvo.studentId});
        setIndexa.add(prisustvo.studentId);
        
    });

    db.Predmet.findOne({where:{naziv: nazivPredmeta}})
    .then(function(predmet){
    
           br_predavanja = predmet.br_predavanja_sedmicno;
           br_vjezbi = predmet.br_vjezbi_sedmicno;
           

           db.Student.findAll().then(studenti => {
               
            var studentiNiz = [];
            studenti.forEach(student => {
              if(Array.from(setIndexa).indexOf(student.index) !== -1)  
                 {  
                       studentiNiz.push({ime: student.ime, index: student.index});  
                 }  
           });

                 console.log({"studenti": studentiNiz, "prisustva": prisustva, "predmet":nazivPredmeta, "brojPredavanjaSedmicno": br_predavanja,"brojVjezbiSedmicno": br_vjezbi});
                res.json({"studenti": studentiNiz, "prisustva": prisustva, "predmet":nazivPredmeta, "brojPredavanjaSedmicno": br_predavanja,"brojVjezbiSedmicno": br_vjezbi});
            });
           })    
        });  
});  


app.post('/prisustvo/predmet/:NAZIV/student/:index', (req, res) => {
  const naziv = req.params.NAZIV;
  const index = req.params.index;

  fs.readFile('public/data/prisustva.json', 'utf8', (err, data) => {
       
    var listaPredmeta = JSON.parse(data); 
    var found=false;

    for(let obj of listaPredmeta){
      if(obj.predmet == naziv)
      for (let prisustvo of obj.prisustva) {
          if (prisustvo.index == index && prisustvo.sedmica==req.body.sedmica) {  
              
              found=true;

              prisustvo.predavanja = req.body.predavanja;
              prisustvo.vjezbe = req.body.vjezbe;
              
              //promjena podataka u json datoteci
              fs.writeFileSync('public/data/prisustva.json', JSON.stringify(listaPredmeta));
      
              res.json(JSON.stringify(obj)); 
              
          }
      }
      if(found==false){
  
         obj.prisustva.push({"sedmica":req.body.sedmica,"predavanja":req.body.predavanja,"vjezbe":req.body.vjezbe,"index":index});  

         //promjena podataka u json datoteci
         fs.writeFileSync('public/data/prisustva.json', JSON.stringify(listaPredmeta));
         res.json(JSON.stringify(obj));  
      }

  } 
}); 
});

  
  

app.listen(PORT, () => console.log('Server running'));

