<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos1  con usuario, contraseña y nombre de la BD
$servidor = "sql306.epizy.com"; $usuario = "epiz_29744482"; $contrasenia = "RDWAJlDAJAcD8S"; $nombreBasedatos1 = "epiz_29744482_agenda";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBasedatos1);


// Consulta datos1 y recepciona una clave para consultar dichos datos1 con dicha clave
if (isset($_GET["consultar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM datos1 WHERE id=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM datos1 WHERE id=".$_GET["borrar"]);
    if($sqlEmpleaados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos1 de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $temperatura=$data->temperatura;
    $voltaje=$data->voltaje;
    $humedad=$data->humedad;

        if(($voltaje!="")&&($temperatura!="")&& ($humedad!="")){
            
    $sqlEmpleaados = mysqli_query($conexionBD,"INSERT INTO datos1(temperatura,voltaje,humedad) VALUES('$temperatura','$voltaje','$humedad') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}
// Actualiza datos1 pero recepciona datos1 de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $temperatura=$data->temperatura;
    $voltaje=$data->voltaje;
    $humedad=$data->humedad;

    
    $sqlEmpleaados = mysqli_query($conexionBD,"UPDATE datos1 SET temperatura='$temperatura',voltaje='$voltaje',humedad='$humedad' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
$sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM datos1 ");
if(mysqli_num_rows($sqlEmpleaados) > 0){
    $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
    echo json_encode($empleaados);
}
else{ echo json_encode([["success"=>0]]); }


?>