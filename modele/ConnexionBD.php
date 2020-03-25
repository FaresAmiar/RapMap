<?php

class ConnexionBD {

    public static function query($query,$params=array()){
        try {
            $pdo = new PDO("mysql:host=localhost;dbname=pweb", "root", "");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt= $pdo->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll();
        }
        catch(PDOException $e) {
            return $e->getMessage();
        }
    }

}
  $pdo = new PDO("mysql:host=localhost;dbname=pweb", "root", "");

?>