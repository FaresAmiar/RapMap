<?php
header("Access-Control-Allow-Origin: *");

$chanteurJSON = file_get_contents('php://input');
$chanteurArray = json_decode($chanteurJSON,true);

ajouterChanteur($chanteurArray);

function ajouterChanteur($chanteur) {


    //$chanteur = array('name' => $name,'location' => array('city' => $city));
    $jsonArray = json_decode(file_get_contents("rapmap.json"),true);
    array_push($jsonArray,$chanteur);
    $jsonArray = json_encode($jsonArray);
    file_put_contents('./rapmap.json',$jsonArray);

    $to      = 'webmaster@rapmap.com';
    $subject = 'Nouveau chanteur ajouté';
    $message = json_encode($chanteur);
    $headers = 'From: webmaster@rapmap.com';

    mail($to, $subject, $message, $headers);
    echo "Success";

}


?>