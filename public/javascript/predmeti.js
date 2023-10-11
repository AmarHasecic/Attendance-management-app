//varijable

var brojKlikovaMenija = 0;

//Callback funkcije

function postLogoutCallback(error,odgovor){
   
   if(error==null){ 
       window.location.href = '/prijava.html';

   }
   else{
          console.log("server vraca error: ",error);
   }

}    


function getPredmetiCallback(error,odgovor){
    
    if(error==null){ 

        // Kod koji genersie html meni
        var meniString = "<ul id='meni'>";
        for (var i = 0; i < odgovor.length; i++) {
            meniString += "<li><button class='predmetiItem' onclick='otvoriPrisustva(event)'>" + odgovor[i] + "</button></li>";
        }
        meniString += "</ul>";
        document.getElementById("lista-predmeta").innerHTML = meniString;
    }
    else{
       console.log("server vraca error: ",error);
    }
        
}

var odgovorServera;
function getPredmetCallback(error,odgovor){

    if(error==null){ 
        
        console.log(odgovor);
        prisustvo = TabelaPrisustvo(document.getElementById("tabela-prisustva"), odgovor); 
        odgovorServera = JSON.stzringify(odgovor);
  
    }
    else{
       console.log("server vraca error: ",error);
    }

}

var sedmica;
function postPrisustvoCallback(error, odgovor){

    if(error==null){ 
        
       prisustvo = TabelaPrisustvo(document.getElementById("tabela-prisustva"), JSON.parse(odgovor), sedmica); 
       odgovorServera=JSON.parse(odgovor);
  
    }
    else{
       console.log("server vraca error: ",error);
    }

}

// Pozivi middleware-a     
document.getElementById('logout-button').addEventListener('click', function() {
    
    PoziviAjax.postLogout(postLogoutCallback);
});


document.getElementById('lista-button').addEventListener('click', function() {

    brojKlikovaMenija++;
    if(brojKlikovaMenija%2!=0){

        PoziviAjax.getPredmeti(getPredmetiCallback);
    
    }
    else{
        document.getElementById("lista-predmeta").innerHTML = "";
              
    }
});

function otvoriPrisustva(event){
  
        PoziviAjax.getPredmet(event.target.textContent, getPredmetCallback);
       
}


function handlePrisustvoKlikPredavanja(event){
    
    var td = event.target;
    var red = td.closest('tr').closest('table').closest('td').closest('tr');
    var index = red.querySelectorAll('td:nth-child(2)')[0].textContent;
    
    var boja = window.getComputedStyle(td).getPropertyValue("background-color");
    var trenutnaSedmica = td.closest('tr').closest('table').closest('td').cellIndex -1;
    sedmica=trenutnaSedmica;

    //dobavljanje podataka za izmjenu
      
      for (let prisustvo of odgovorServera.prisustva) {
          if (prisustvo.index == index && prisustvo.sedmica==trenutnaSedmica) {
            
            //promjena prisustva sa odsutan na prisutan
            if(boja=="rgb(255, 0, 0)" ){
                var predavanje = prisustvo.predavanja+1;
                PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: predavanje, vjezbe: prisustvo.vjezbe},postPrisustvoCallback);
            }
            //promjena prisustva sa prisutan na odsutan
            if(boja=="rgb(0, 128, 0)"){
                var predavanje = prisustvo.predavanja-1;
                PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: predavanje, vjezbe: prisustvo.vjezbe},postPrisustvoCallback);
            }
               
          }
      }

      if(boja=="rgba(0, 0, 0, 0)"){

        PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: 1, vjezbe: 0},postPrisustvoCallback);

      }
}


function handlePrisustvoKlikVjezbe(event){
    
    var td = event.target;
    var red = td.closest('tr').closest('table').closest('td').closest('tr');
    var index = red.querySelectorAll('td:nth-child(2)')[0].textContent;
    
    var boja = window.getComputedStyle(td).getPropertyValue("background-color");
    var trenutnaSedmica = td.closest('tr').closest('table').closest('td').cellIndex -1;
    sedmica=trenutnaSedmica;

    //dobavljanje podataka za izmjenu
      
      for (let prisustvo of odgovorServera.prisustva) {
          if (prisustvo.index == index && prisustvo.sedmica==trenutnaSedmica) {
           
            //promjena prisustva sa odsutan na prisutan
            if(boja=="rgb(255, 0, 0)"){
                var vjezbe = prisustvo.vjezbe+1;
                PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: prisustvo.predavanja, vjezbe: vjezbe},postPrisustvoCallback);
            }
            //promjena prisustva sa prisutan na odsutan
            if(boja=="rgb(0, 128, 0)"){
                var vjezbe = prisustvo.vjezbe-1;
                PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: prisustvo.predavanja, vjezbe: vjezbe},postPrisustvoCallback);
            }
               
          }
      }

      if(boja=="rgba(0, 0, 0, 0)"){

        PoziviAjax.postPrisustvo(odgovorServera.predmet,index,{sedmica:trenutnaSedmica, predavanja: 0, vjezbe: 1},postPrisustvoCallback);

      }
}


 