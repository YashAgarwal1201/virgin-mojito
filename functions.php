<?php

//$date - Y-m-d format
function getShippingDate($orderDate, $orderTime) {
	
	$time = strtotime($orderTime);
	$datel = strtotime($orderDate);
	
	global $cutOffTime;
	global $holidays;

	$orderHour = date('H', $time); // order hour
	$orderDay = date('D', $datel); // order day
	$shippingDate = date('Y-m-d', $datel); // shipping date

	if ($orderHour <= $cutOffTime) {
		$i = 0;
		while($i < count($holidays)) {
			for ($j = 0; $j < count($holidays); $j++) { // to check if the $orderDay value is similar to any $holidays  value
				if (stristr($holidays[$j], $orderDay)) {
					$orderDay = $holidays[$j];
				}
			}
			if (in_array($orderDay,$holidays)) { // to check if the order day is a holiday or not
				$temp = date_create($orderDay);
				date_add($temp, date_interval_create_from_date_string('1 day'));
				$orderDay = $temp->format('D');
				$shippingDate = $temp->format('Y-m-d');
			}
			else {
				return "Shipping Date is " . $shippingDate;
			}
			$i++;
		}
		return "Shipping Date is " . $shippingDate;
	}
	else {
		$temp = date_create($orderDay);
		date_add($temp, date_interval_create_from_date_string('1 day'));
		$orderDay = $temp->format('D');
		$i = 0;
		while($i < count($holidays)) {
			for ($j = 0; $j < count($holidays); $j++) { // to check if the $orderDay value is similar to any $holidays  value
				if (stristr($holidays[$j], $orderDay)) {
					$orderDay = $holidays[$j];
				}
			}
			if (in_array($orderDay,$holidays)) { // to check if the order day is a holiday or not
				$temp = date_create($orderDay);
				date_add($temp, date_interval_create_from_date_string('1 day'));
				$orderDay = $temp->format('D');
				$shippingDate = $temp->format('Y-m-d');
			}
			else {
				return "Shipping Date is " . $shippingDate;
			}
			$i++;
		}
		return "Shipping Date is " . $shippingDate;
	}

}

?>