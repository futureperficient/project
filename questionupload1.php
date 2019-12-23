<?php
//values
$questionname = $_POST["qname"];
$questionname = strtolower($questionname);
$questionnospace=preg_replace('/\s+/', '', $questionname);
$op1 = $_POST["op1"];
$op2 = $_POST["op2"];
$op3 = $_POST["op3"]; 
$ans = $_POST["ans"];
$dl = $_POST["difflevel"];
$cat = $_POST["cat"];
$cat = strtolower($cat);
$status = "false";
$_id=rand();

//name

$check=0;

$idname =  "_id";
$questionfieldname = "questionname";
$option1 = "option1";
$option2 = "option2";
$option3 = "option3";
$answer = "answer";
$dlname = "difficultlevel";
$cate = "category";
$statusname = "status";

$value = "name.";
$value = $value . $cat;


$question=array();
$temp=0;
$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$query = new MongoDB\Driver\Query([]); 
$rows = $manager->executeQuery($value, $query);
foreach ($rows as $row) {
    $question[$temp] = $row->questionname;
	$temp++;
    }
	

for($temp1=0;$temp1<$temp;$temp1++)
{
	$questionnospace1=preg_replace('/\s+/', '', $question[$temp1]);
	if($questionnospace == $questionnospace1)
	{
		$check=1;
	}
}


if($check==0)
{
	
$bulk = new MongoDB\Driver\BulkWrite();

$bulk->insert([$idname => $_id, $questionfieldname => $questionname, $option1 => $op1, $option2 => $op2, $option3 => $op3, $answer => $ans, $dlname => $dl, $cate => $cat, $statusname => $status]);


$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
$result = $manager->executeBulkWrite($value, $bulk, $writeConcern);
}

if($check==1)
{
	echo "question is already exist";
}

?>