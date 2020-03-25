<?php

require_once __DIR__ . DIRECTORY_SEPARATOR . 'ConnexionBD.php';

session_start();
if (isset($_POST['login'])) {
    $arr=ConnexionBD::query('SELECT * FROM users WHERE (username,password) IN ((:username,:password))',
    array(':username'=>$_POST['username'],':password'=>$_POST['password']));
    if (isset($arr[0])) {
        $_SESSION=$arr[0];
        header('Location: Index.html');
    }
    else header('Location: Index.php');
}
else if (isset($_POST['inscription'])) {
    $arr=ConnexionBD::query('INSERT INTO users(username,password) VALUES (:username,:password)',
    array(':username'=>$_POST['username'],':password'=>$_POST['password']));
    
    if (is_string ($arr )){
        $_SESSION['message'] = "Nom d'utilisateur incorrect";
        header('Location: Inscription.php');
      
    }
    else{
        $_SESSION['message'] = "";
        header('Location: Index.php');
    }

}

?>