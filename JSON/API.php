<?php

$data = readPostData();
$json_respond = array();


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
} 
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

$json_respond = Prenotazione();
}
header('Content-Type: application/json');

echo json_encode($json_respond, JSON_UNESCAPED_SLASHES);


function readPostData()
{
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    return $data;
}


function Prenotazione()
{
   $json = array('data' => $data->date);
   $json = array('task' => $data->task);
   $json = array('selezionato' => $data->fatto);

    return $json;
}