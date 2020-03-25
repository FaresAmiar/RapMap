<?php
//echo file_get_contents('php://input');
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

var_dump($_POST);
echo json_encode(array('success' => 'yes'));

$chanteur = json_decode(file_get_contents('php://input'));
var_dump($chanteur);
 ajouterChanteur($chanteur);

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