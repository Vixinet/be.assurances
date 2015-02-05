<?php
  include_once('lang.fr.php');
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title><?php echo $lang['a_t_administration'] ?></title>
    <link href="scripts/css/global.css" rel="stylesheet" />
    <link href="scripts/css/humanity/jquery-ui-1.10.2.custom.css" rel="stylesheet" />
    <script src="scripts/js/jquery-1.9.1.js"></script>
    <script src="scripts/js/jquery-ui-1.10.2.custom.js"></script>
    <script src="scripts/js/global.js"></script>
  </head>
  <body onload="request();">
    <div id="errors" class="msg"> </div>
    <div id="infos" class="msg"> </div>
    <div id="content"> </div>
  </body>
</html>