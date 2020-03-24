<?php

 ajouterChanteur($_POST['name'],$_POST['location']['city']);

function ajouterChanteur($name,$city) {
	
	$chanteur = ['name' => $name,'location' => ['city' => $city]];
	$jsonArray = json_decode(file_get_contents("rapmap.json"),true);
	$jsonArray[] = $chanteur;
	file_put_contents('./rapmap.json',json_encode($jsonArray));
	
	$to      = 'webmaster@rapmap.com';
    $subject = 'Nouveau chanteur ajouté';
    $message = json_encode($chanteur);
    $headers = 'From: webmaster@rapmap.com';

    mail($to, $subject, $message, $headers);
    echo "Success";

}

?>