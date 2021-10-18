var url = "http://tabladinamicas.rf.gd/sensores/";
const form = document.getElementById('cargar');
const actualizar = document.getElementById('actualizar');








var aplicacion = new (function(){



    form.addEventListener('submit', logSubmit);
    


    this.temperatura = document.getElementById("temperatura");
    this.voltaje = document.getElementById("voltaje");
    this.humedad = document.getElementById("humedad");
    this.tablasensores = document.getElementById("sensores");
    this.enviar = document.getElementById("enviar");
    this.numero=document.getElementById("numero");
    
    


    this.Leer = function(){
        var datos = "";
        fetch(url)
        .then((r) => r.json())
        .then((respuesta)=>{
            console.log(respuesta);
            respuesta.map(function(sensor,index,value){
                datos += "<br>";
                datos +="<td>"+sensor.id+"</td>";
                datos +="<td>"+sensor.temperatura+"</td>";
                datos +="<td>"+sensor.voltaje+"</td>";
                datos +="<td>"+sensor.humedad+"</td>";
                datos +='<td>  <div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('+sensor.id+')">Editar</button><button type="button" class="btn btn-danger"onclick="aplicacion.Borrar('+sensor.id+')" >Eliminar</button></div>'+'</td>';
                datos += "</tr>"
            });



            return this.tablasensores.innerHTML=datos;
           


        })
        .catch(console.log)
    };

    function logSubmit(event) {     

        
        console.log(temperatura.value);
        console.log(voltaje.value);
        console.log(humedad.value);
        var datosEnviar={temperatura:this.temperatura.value,voltaje:this.voltaje.value,humedad:this.humedad.value};

        fetch(url+"?insertar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
        .then(respuesta=>respuesta.json)
        .then((datosRespuestas)=>{
            console.log("Insertados");
            this.temperatura.value="";
            this.voltaje.value="";
            this.humedad.value="";    
            aplicacion.Leer();      
           
        })
        .catch(console.log)

       
      }

      this.Borrar = function(id){
        console.log(id);

        fetch(url+"?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuestas)=>{
            console.log("Eliminados");
            this.Leer();

        })
        .catch(console.log);



    };


    this.Editar = function(id){
        console.log(id);

        this.id="";



        fetch(url+"?consultar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuestas)=>{

            console.log(datosRespuestas);
            
            this.numero=id;       
            this.temperatura.value=datosRespuestas[0]['temperatura'];
            this.voltaje.value=datosRespuestas[0]['voltaje'];
            this.humedad.value=datosRespuestas[0]['humedad'];
            console.log(this.numero);
            
            



        })
        .catch(console.log);
    }



    this.Actualizar=function(){       


        var datosEnviar={id:this.numero,codigo:this.id,temperatura:this.temperatura.value,voltaje:this.voltaje.value,humedad:this.humedad.value};
        console.log(datosEnviar);

        fetch(url+"?actualizar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
        .then(respuesta=>respuesta.json)
        .then((datosRespuestas)=>{
            console.log("Actualizados");
            this.temperatura.value="";
            this.voltaje.value="";
            this.humedad.value="";
            this.Leer();
                

            })
        .catch(console.log);


        console.log("actualizar");
    };     

       


});


aplicacion.Leer();