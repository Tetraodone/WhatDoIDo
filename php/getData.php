<?php
  // Request the response in JSON format using the .json extension
  if($_GET['country'] == 'Australia'){
    $urlCountry = '.com.au';
    $username = 'whatdo';$password = 'rb356k7r4f4z';
  } else if ($_GET['country'] == 'New Zealand'){
    $urlCountry = '.co.nz';
    $username = 'notnamed';$password = '4skhsb56rsvd';
  }

  //$url = 'http://api.eventfinda' . $urlCountry . '/v2/events.json?rows=50&point=' . $_GET['lat'] . ',' . $_GET['long'] . '&order=distance_date&start_date=2018-11-19&fields=event:(id,name,location_summary,datetime_end,point)';
$url = 'http://api.eventfinda' . $urlCountry . '/v2/events.json?rows=5&point=-33.2509639,148.9216784&order=distance_date&start_date=2018-11-25&fields=event:(id,name,location_summary,datetime_end,point)';
  $process = curl_init($url);
  curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
  curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
  $return = curl_exec($process);
  header('Content-Type: application/json');
  if(is_null($return['name'])){
      echo 'error';
  } else {
      echo $return;
  }

  $collection = json_decode($return);
  ?>
