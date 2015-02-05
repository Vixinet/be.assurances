<?php
  include_once('class.SQLi.php');
  include_once('lang.fr.php');
  include_once('class.manager.php');
  include_once('lib.config.php');
	
	session_start();
  
  if(!isset($_SESSION['manager'])) {
    $_SESSION['manager'] = new Manager();
  }
  
  $_SESSION['manager'] -> doWork();
  
?>