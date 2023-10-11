var podaci = {
    username,
    password
  };

//Callback funkcije


function postLoginCallback(error,odgovor){
   
   if(error==null){ 
    
           if(odgovor.poruka.toString() == "Neuspješna prijava")
               document.getElementById('poruka').innerHTML = "Pogrešan username ili password!";
           else{
                 
                  window.location.href = "/predmeti.html";
           }
   }
   else{
          console.log("server vraca error: ",error);
   }

}          

// Pozivi middleware-a          
document.getElementById('forma').addEventListener('submit', function(event) {

    event.preventDefault();

    podaci.username = document.getElementById('username').value;
    podaci.password = document.getElementById('password').value;

    PoziviAjax.postLogin(podaci.username,podaci.password,postLoginCallback);
      
});

