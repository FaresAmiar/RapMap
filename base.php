<?php

if(isset($_POST['ajouter']) {
	json_encode()
	//var_dump($jsonArray[0]);
	
	
}

function ajouterChanteur() {
	
	$chanteur = array(...);
	$jsonArray = json_decode(file_get_contents("rapmap.json"),true);
	$jsonArray[] = $chanteur;
	file_put_contents('./rapmap.json',json_encode($jsonArray));
	
	 $to      = 'webmaster@rapmap.com';
     $subject = 'Nouveau chanteur ajouté';
     $message = json_encode($chanteur);
     $headers = 'From: webmaster@rapmap.com';

     mail($to, $subject, $message, $headers);
	
}

?>