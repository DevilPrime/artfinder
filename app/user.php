<?php
	try
	{
		//$bdd = new PDO('mysql:host=db405508102.db.1and1.com;dbname=db405508102', 'dbo405508102','Dbnight');
		$bdd = new PDO('mysql:host=localhost;dbname=artfinder', 'root', '');
	}
	catch (Exception $e)
	{
	        die('Erreur : ' . $e->getMessage());
	}

	if(!empty($_POST['mail']) && !empty($_POST['pwd'])){

		$mail = $_POST['mail'];

		$query = $bdd->query("SELECT * FROM users WHERE mail = '$mail'");

		if($query->rowCount() == 1){   //si la requete renvoi une ligne, l'utilisateur est dans la base

			$response = $query->fetch();

			if($_POST['pwd'] == $response['password']){

				echo "success";
			}
			

		}else{  //

			echo "cet utilisateur n'existe pas";
		}
	}else{

		echo "aucune donnée reçus";
	}