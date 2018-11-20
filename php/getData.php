<?php

  // Request the response in JSON format using the .json extension
  $url = 'http://api.eventfinda.co.nz/v2/events.json?rows=20&location_slug=auckland&start_date=2018-11-19&fields=event:(id,name,location_summary,datetime_start)';
  $username = 'notnamed';$password = '4skhsb56rsvd';
  $process = curl_init($url);
  curl_setopt($process, CURLOPT_USERPWD, $username . ":" . $password);
  curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
  $return = curl_exec($process);
  header('Content-Type: application/json');
  echo $return;
  $collection = json_decode($return);
  ?>
