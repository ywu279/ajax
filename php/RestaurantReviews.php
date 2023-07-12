<?php
error_reporting(E_ALL ^ E_NOTICE); //specify All errors and warnings are displayed

$ini = parse_ini_file('Lab5.ini');
$restaurants = simplexml_load_file($ini['path']);

$jsonResponse = '';

extract($_GET);

if (isset($action) && $action == 'loadRestaurants') {
    $names = [];
    foreach ($restaurants as $restaurant) {
        $names[] = (string) $restaurant->name;
    }
    $jsonResponse = json_encode($names);
}
elseif (isset($action) && $action == 'getDetails') {
    $details = [];
    if ($restaurantId >= 0) {
        $restaurantId = (int) $restaurantId;
        $details['street'] = (string) $restaurants->restaurant[$restaurantId]->address->street;
        $details['city'] = (string) $restaurants->restaurant[$restaurantId]->address->city;
        $details['province'] = (string) $restaurants->restaurant[$restaurantId]->address->province;
        $details['postalcode'] = (string) $restaurants->restaurant[$restaurantId]->address->postalcode;
        $details['summary'] = (string) $restaurants->restaurant[$restaurantId]->review->summary;
        $details['rating'] = $restaurants->restaurant[$restaurantId]->rating;
    }
    $jsonResponse = json_encode($details);
}
elseif (isset($_POST['restaurant'])) {
    $data = json_decode($_POST['restaurant']); //convert JSON string to PHP object
    $restaurantId = (int) $data->restaurantId;
    $restaurants->restaurant[$restaurantId]->address->street = $data->street;
    $restaurants->restaurant[$restaurantId]->address->city = $data->city;
    $restaurants->restaurant[$restaurantId]->address->province = $data->province;
    $restaurants->restaurant[$restaurantId]->address->postalcode = $data->postalcode;
    $restaurants->restaurant[$restaurantId]->review->summary = $data->summary;
    $restaurants->restaurant[$restaurantId]->rating = $data->rating;
    $result = $restaurants->asXML($ini['path']);
    if ($result) {
        $msg = [
            'message' => 'Revised Restaurant Data has been saved to: Data/restaurant_review.xml',
            'status' => 'success'
        ];
    } else {
        $msg = [
            'message' => 'Failed to save changes to restaurant_review.xml',
            'status' => 'danger'
        ];
    }
    $jsonResponse = json_encode($msg);
}

//return a json string in response to the ajax request
echo $jsonResponse;
//echo '<pre>'; print_r($details); echo '</pre>';
?>