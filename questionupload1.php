<?php
//values
$questionname = $_POST["qname"];
$op1 = $_POST["op1"];
$op2 = $_POST["op2"];
$op3 = $_POST["op3"]; 
$ans = $_POST["ans"];
$dl = $_POST["difflevel"];
$cat = $_POST["cat"];
$status = "false";
$_id=rand();

//name

$idname =  "_id";
$questionfieldname = "questionname";
$option1 = "option1";
$option2 = "option2";
$option3 = "option3";
$answer = "answer";
$dlname = "difficultlevel";
$cate = "category";
$statusname = "status";

$bulk = new MongoDB\Driver\BulkWrite();

$bulk->insert([$idname => $_id, $questionfieldname => $questionname, $option1 => $op1, $option2 => $op2, $option3 => $op3, $answer => $ans, $dlname => $dl, $cate => $cat, $statusname => $status]);

$value = "name.question";

$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
$result = $manager->executeBulkWrite($value, $bulk, $writeConcern);

?>