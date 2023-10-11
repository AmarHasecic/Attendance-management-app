const PoziviAjax = (()=>{
    
      function impl_getPredmet(naziv,fnCallback){
        
        var ajax = new XMLHttpRequest();
        ajax.open('GET', `/predmet/${naziv}`, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function() {
               
          var odgovor = JSON.parse(ajax.responseText);
   
          if (ajax.status == 200) {
                fnCallback(null, odgovor);       
          }
          else{
                //odgovor ce biti error vracen sa servera
                fnCallback(odgovor, null);
          }
        };
      
        ajax.send();
  
      }
  
      // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
      function impl_getPredmeti(fnCallback){
       
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/predmeti', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function() {
               
          var odgovor = JSON.parse(ajax.responseText);
   
          if (ajax.status == 200) {
                
                fnCallback(null, odgovor);       
          }
          else{
                //odgovor ce biti error vracen sa servera
                fnCallback(odgovor, null);
          }
        };
      
        ajax.send();
      }
      
  
      function impl_postLogin(username,password,fnCallback){
  
       var ajax = new XMLHttpRequest();
       ajax.open('POST', '/login', true);
       ajax.setRequestHeader('Content-Type', 'application/json');
       ajax.onreadystatechange = function() {
              
         var odgovor = JSON.parse(ajax.responseText);
  
         if (ajax.status == 200) {
               
               fnCallback(null, odgovor);       
         }
         else{
               //odgovor ce biti error vracen sa servera
               fnCallback(odgovor, null);
         }
       };
  
  
       var podaci = {
        username: username,
        password: password
      };
     
       ajax.send(JSON.stringify(podaci));
  
      }
  
      function impl_postLogout(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '/logout', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function() {
               
          var odgovor = JSON.parse(ajax.responseText);
   
          if (ajax.status == 200) {
                
                fnCallback(null, odgovor);       
          }
          else{
                //odgovor ce biti error vracen sa servera
                fnCallback(odgovor, null);
          }
        };    
        ajax.send(JSON.stringify({}));
      }
  
      //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
      function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open('POST', `/prisustvo/predmet/${naziv}/student/${index}`, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.onreadystatechange = function() {
               
          var odgovor = JSON.parse(ajax.responseText);
          if (ajax.status == 200) {
                
                fnCallback(null, odgovor);       
          }
          else{
                //odgovor ce biti error vracen sa servera
                fnCallback(odgovor, null);
          }
        };    
        
        ajax.send(JSON.stringify(prisustvo));
      }
  
      return{
      postLogin: impl_postLogin,
      postLogout: impl_postLogout,
      getPredmet: impl_getPredmet,
      getPredmeti: impl_getPredmeti,
      postPrisustvo: impl_postPrisustvo
      };
      })();
  