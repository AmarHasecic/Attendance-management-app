
let TabelaPrisustvo = function (divRef, podaci, trenutnaSedmica=1) {

    
    let toRoman = function(num){
         if(num==1) return 'I'
         if(num==2) return 'II'
         if(num==3) return 'III'
         if(num==4) return 'IV'
         if(num==5) return 'V'
         if(num==6) return 'VI'
         if(num==7) return 'VII'
         if(num==8) return 'VIII'
         if(num==9) return 'IX'
         if(num==10) return 'X'
         if(num==11) return 'XI'
         if(num==12) return 'XII'
         if(num==13) return 'XIII'
         if(num==14) return 'XIV'
         if(num==15) return 'XV'
    }
     
    let dajBrojSedmica = function(){
        const sedmice = [];
        for(let i=0; i<podaci.prisustva.length; i++){
          sedmice.push(podaci.prisustva[i].sedmica);
        }
        
        let sedmiceUnique =  new Set(sedmice);
        return sedmiceUnique.size;
    }

    
    //funkcija koja vraca listu sedmica sa prisustvo studenta
    let dajPrisustvaStudenta = function(index){
         let izlaz = [];

         let brojac=1;
         for(let i=0; i<podaci.prisustva.length; i++){

            if(podaci.prisustva[i].index==index){
              if(podaci.prisustva[i].sedmica!=brojac){
                izlaz.push({});
                brojac++;
              }
              izlaz.push(podaci.prisustva[i]);
              brojac++;
              
         }
        }
           while(brojac!=dajBrojSedmica()+1){ 
             brojac++;
             izlaz.push({});
           }

         return izlaz;
    }

    //validacija podataka
    let brojPredavanjaSedmicno = podaci.brojPredavanjaSedmicno;
    let brojVjezbiSedmicno = podaci.brojVjezbiSedmicno;
    let flag = true;

    if(brojPredavanjaSedmicno<0){
        flag = false;
    }
    else if(brojVjezbiSedmicno<0){
        flag=false;
    }
    else{
    
    for(let i=0; i<podaci.prisustva.length; i++){
       
        if(podaci.prisustva[i].vjezbe>brojVjezbiSedmicno || podaci.prisustva[i].vjezbe<0){
            
            flag = false;
            break;
        }
        if(podaci.prisustva[i].predavanja>brojPredavanjaSedmicno || podaci.prisustva[i].predavanja<0){

            flag = false;
            break;
        }

        let postoji = false;
        for(let j=0; j<podaci.studenti.length; j++){
               if(podaci.studenti[j].index == podaci.prisustva[i].index){
                 postoji = true;
               }
        }
        if(postoji == false){
            flag==false;
            break;
        }


    }
  }

  const indeksi = [];
  for(let i=0; i<podaci.studenti.length; i++){
         indeksi.push(podaci.studenti[i].index);
  }
  if (indeksi.length !== new Set(indeksi).size) {
    flag = false;
  } 

  for(let i=0; i<podaci.prisustva.length; i++){
     for(let j=0; j<podaci.prisustva.length; j++){
        if(i!=j && podaci.prisustva[i].sedmica == podaci.prisustva[j].sedmica && podaci.prisustva[i].index == podaci.prisustva[j].index){
            flag=false;
            break;
        }
     }  
  }
  
  
  const sedmice = [];
  for(let i=0; i<podaci.prisustva.length; i++){
    sedmice.push(podaci.prisustva[i].sedmica);
  }
  
  let sedmiceUnique =  new Set(sedmice);
  let brojac = 1;
  sedmiceUnique.forEach(a => {

        if(brojac != a){
            flag=false;
        }
        brojac++;
    

  })
  
    if(flag==false){
          divRef.innerHTML = "Podaci o prisustvu nisu validni!";
          throw new Error("Podaci o prisustvu nisu validni!");
    }
    

    //iscrtavanje tabele
    let brojSedmica = sedmiceUnique.size;
    //trenutnaSedmica = brojSedmica;
    
let iscrtavanjeTabele = function(){
    var tabela = "<div class=\"informacije\"> Naziv predmeta: "+ podaci.predmet +"<br>"+"Broj predavanja sedmično: "+ podaci.brojPredavanjaSedmicno+"<br>"+"Broj vježbi sedmično: "+ podaci.brojVjezbiSedmicno+"</div><table id ='tabelaprisustva'>";

    //zaglavlje tabele
     tabela+="<thead><tr><th>Ime i prezime</th><th>Index</th>";
     
     for(let i=0; i<brojSedmica; i++){
                  tabela+="<th>"+toRoman(i+1)+"</th>";
     }
     
     tabela+="<th>"+toRoman(brojSedmica+1)+" - XV"+"</th>";
     tabela+="</tr></thead>";

     //instance
     tabela+="<tbody>"

     for(let i=0; i<podaci.studenti.length; i++){
            tabela+="<tr>";
            tabela+="<td>"+podaci.studenti[i].ime+"</td>";
            tabela+="<td>"+podaci.studenti[i].index+"</td>";
            
            let sedmice  = dajPrisustvaStudenta(podaci.studenti[i].index);
            for(let j=0; j<sedmice.length; j++){      
              if(j==trenutnaSedmica-1){
                tabela+="<td style=\"all: revert;\">"; 

                //trenutna sedmica (detaljno)

                //zaglavlje 
                tabela+="<table><tr>";
                for(let k=0; k<podaci.brojPredavanjaSedmicno; k++){
                    tabela+="<td>P<br>"+(k+1)+"</td>";
                }
                for(let k=0; k<podaci.brojVjezbiSedmicno; k++){
                    tabela+="<td>V<br>"+(k+1)+"</td>";
                }
                tabela+="</tr><tr>";

            //informacije o prisustvu
            if(JSON.stringify(sedmice[j])== '{}'){
                for(let k=0; k<podaci.brojPredavanjaSedmicno; k++){
                    tabela+="<td onclick='handlePrisustvoKlikPredavanja(event)' class='prazno'></td>";
                }
                for(let k=0; k<podaci.brojVjezbiSedmicno; k++){
                    tabela+="<td onclick='handlePrisustvoKlikVjezbe(event)' class='prazno'></td>";
                }
            }
            else{
                
                for(let k=0; k<sedmice[j].predavanja; k++){
                    tabela+="<td onclick='handlePrisustvoKlikPredavanja(event)' class='predavanja' style=\"background-color: green;\"></td>";
                }
                for(let k=0; k<podaci.brojPredavanjaSedmicno-sedmice[j].predavanja; k++){
                    tabela+="<td onclick='handlePrisustvoKlikPredavanja(event)' class='predavanja' style=\"background-color: red;\"></td>";
                }
                for(let k=0; k<sedmice[j].vjezbe; k++){
                    tabela+="<td onclick='handlePrisustvoKlikVjezbe(event)' class='vjezbe' style=\"background-color: green;\"></td>";
                }
                for(let k=0; k<podaci.brojVjezbiSedmicno-sedmice[j].vjezbe; k++){
                    tabela+="<td onclick='handlePrisustvoKlikVjezbe(event)' class='vjezbe' style=\"background-color: red;\"></td>";
                }
             }

                tabela+="</tr></table>";
                tabela+= "</td>";   
              }
              else{ 
                if(JSON.stringify(sedmice[j]) != '{}'){
                    tabela+="<td>"+ ((sedmice[j].predavanja + sedmice[j].vjezbe)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno)*100) +"%"+ "</td>";
                }
                else  tabela+="<td></td>";
              } 
            }
            
            tabela+="<td></td></tr>";
     }

     tabela+="</tbody>";
     tabela+="</table>";

        tabela+="<div class=\"dugmici\">";
        tabela+="<button style='font-size:50px' onclick=\"prisustvo.prethodnaSedmica()\"><i class='fa fa-solid fa-arrow-left'></i></button>";
        tabela+="<button style='font-size:50px' onclick=\"prisustvo.sljedecaSedmica()\"><i class='fa fa-solid fa-arrow-right'></i></button>";
        tabela+="</div>";

        divRef.innerHTML = tabela;
}

iscrtavanjeTabele();

let sljedecaSedmica = function () {
    if(trenutnaSedmica!=brojSedmica){
    trenutnaSedmica++;
    iscrtavanjeTabele();
    }
}
let prethodnaSedmica = function () {
    if(trenutnaSedmica-1!=0){
    trenutnaSedmica--;
    iscrtavanjeTabele();
    }
}
    return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica
    }
    
};