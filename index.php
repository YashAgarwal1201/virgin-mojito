<?php

//require "vendor/autoload.php";
require "config.php";
require "functions.php";

date_default_timezone_set("Asia/Kolkata");

$orderDate = date('Y-m-d');
$orderTime = date('H:i:s');

$shippinDate = getShippingDate($orderDate, $orderTime);
echo $shippinDate;

?>