<?php
$question=array();
$temp=0;
$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$query = new MongoDB\Driver\Query([]); 
$rows = $manager->executeQuery("name.question", $query);
foreach ($rows as $row) {
    $question[$temp] = $row->questionname;
	$temp++;
    }
	
	print_r($question);
?>
