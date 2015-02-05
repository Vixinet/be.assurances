<?php
  include_once('class.SQLi.php');
  include_once('class.emprunt.php');
  include_once('lib.config.php');
  
	
  $service = intval($_POST['s']);
  $duree = intval($_POST['d']);
  $amount = intval($_POST['a']);
  $emprunts = array();
  $sql = new SQLi(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  
  $servicename = $sql -> queryFetch("SELECT name FROM servicescst WHERE id=$service");
  
  $sql -> query("SELECT i.id, i.name, i.logo, c.name, s.rate, i.link, info
                   FROM services s
              LEFT JOIN institutions i ON i.id = institution
              LEFT JOIN servicescst c ON c.id = servicecst
                  WHERE servicecst=$service 
                    AND $duree BETWEEN min_duration AND max_duration 
                    AND $amount BETWEEN min_amount AND max_amount");

  while($res = $sql -> fetch_row()) {
    $emprunts[] = array(
      $res[0], // banque id
      $res[1], // banque name
      $res[2], // banque logo
      $res[3], // service name
      $res[5], // lien 1
      $res[6], // info 1
      new Emprunt($amount,  // montant user
                  $duree,   // durée user
                  $res[4],  // taux
                  MOD_A),   // mode par default
    );
  }
  
  foreach($emprunts as $k => $v) {
    $res = $sql -> queryFetch("select rate, min_amount, info, i.link
                                 from services s
                            left join institutions i
                                   on i.id = s.institution
                                where servicecst=$service
                                  and institution=".$v[0]."
                                  and $duree BETWEEN min_duration  and max_duration
                                  and min_amount > $amount
                             ORDER BY min_amount ASC LIMIT 0,1");
                             
    if(count($res) > 0) {
      $e = new Emprunt($res[1], $duree, $res[0], MOD_A);
      if($e -> getAmountTotal() < $v[6] -> getAmountTotal()) {
        $emprunts[$k][] = $res[2];
        $emprunts[$k][] = $res[3];
        $emprunts[$k][] = $e;
      }
    }
  }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>TinyTable</title>
    <link rel="stylesheet" href="TinyTableV3/style.css" />
  </head>
  <body>
    <div id="tablewrapper">
      <h1>Votre recherche est de <?php echo number_format($amount, 0, '.', '\''); ?> &#8364; pour un cr&#233;dit "<?php echo $servicename; ?>" set. </h1>
      <div id="tableheader">
        <div class="search">
          <select id="columns" onchange="sorter.search('query')"></select>
          <input type="text" id="query" onkeyup="sorter.search('query')" />
        </div>
        <span class="details">
          <div>Records <span id="startrecord"></span>-<span id="endrecord"></span> of <span id="totalrecords"></span></div>
          <div><a href="javascript:sorter.reset()">reset</a></div>
          <div><a href="goTO simulator">Faire une autre simulation</a></div>
        </span>
      </div>
      <div>
        <p>Emprunter quelques dizaines d'euro en plus ou en moins peut vous faire b&#233;n&#233;ficier d'un taux d'inter&#234;t plus avantageux. </p>
      </div>
      <div id="tablefooter">
        <table cellpadding="0" cellspacing="0" border="0" id="table" class="tinytable">
          <thead>
            <tr>
              <!--th class="nosort"><h3>Taux d'inter&#234;t</h3></th-->
              <th><h3>Taux d'inter&#234;t (TAEG)</h3></th>
              <th><h3>Montant emprunt&#233;</h3></th>
              <th><h3>Dur&#233;e</h3></th>
              <th><h3>Total int&#233;r&#234;t</h3></th>
              <th><h3>Total &#224; payer</h3></th>
              <th><h3>Organisme pr&#234;teur</h3></th>
              <th><h3> </h3></th>
              <th><h3>Demande en ligne</h3></th>
            </tr>
          </thead>
          <tbody>
            <?php 
              if(count($emprunts) == 0) {
                ?>
                  <tr> <td colspan="9">Aucun r&#233;sultat</td>
                <?php
              } else {
                foreach($emprunts as $k => $v) { 
              ?>
                <tr>
                  <td><?php echo $v[6] -> getRoundedFloat($v[6] -> getRatePeriodeYear()*100, 2); ?> %</td>
                  <td><?php echo $v[6] -> getRoundedFloat($v[6] -> getAmountBase(), 0); ?> &#8364;</td>
                  <td><?php echo $v[6] -> getRoundedFloat($v[6] -> getDurationMonth(), 0); ?> mois</td>
                  <td><?php echo $v[6] -> getRoundedFloat($v[6] -> getTotalBenefit(), 2); ?> &#8364;</td>
                  <td><?php echo $v[6] -> getRoundedFloat($v[6] -> getAmountTotal(), 2); ?> &#8364;</td>
                  <td><img src="<?php echo $v[2]; ?>" alt="<?php echo $v[1]; ?>" /></td>
                  <td><?php echo $v[5]; ?></td>
                  <td><?php echo $v[4]; ?></td>
                </tr>
                <?php if(isset($v[9])) { ?>
                  <tr>
                    <td><?php echo $v[9] -> getRoundedFloat($v[9] -> getRatePeriodeYear()*100, 2); ?> %</td>
                    <td><?php echo $v[9] -> getRoundedFloat($v[9] -> getAmountBase(), 0); ?> &#8364;</td>
                    <td><?php echo $v[9] -> getRoundedFloat($v[9] -> getDurationMonth(), 0); ?> mois</td>
                    <td><?php echo $v[9] -> getRoundedFloat($v[9] -> getTotalBenefit(), 2); ?> &#8364;</td>
                    <td><?php echo $v[9] -> getRoundedFloat($v[9] -> getAmountTotal(), 2); ?> &#8364;</td>
                    <td><img src="<?php echo $v[2]; ?>" alt="<?php echo $v[1]; ?>" /></td>
                    <td><strong>Empruntez plus et payez moins.</strong> <br/><?php echo $v[7]; ?></td>
                    <td><?php echo $v[8]; ?></td>
                  </tr>
              <?php 
                  }
                } 
              }
            ?>
          </tbody>
        </table>
        <div id="tablenav">
          <div>
            <img src="images/first.gif" width="16" height="16" alt="First Page" onclick="sorter.move(-1,true)" />
            <img src="images/previous.gif" width="16" height="16" alt="First Page" onclick="sorter.move(-1)" />
            <img src="images/next.gif" width="16" height="16" alt="First Page" onclick="sorter.move(1)" />
            <img src="images/last.gif" width="16" height="16" alt="Last Page" onclick="sorter.move(1,true)" />
          </div>
          <div><select id="pagedropdown"></select></div>
          <div><a href="javascript:sorter.showall()">Voir tout</a></div>
        </div>
        <div id="tablelocation">
          <div>
            <select onchange="sorter.size(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20" selected="selected">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Nombre de r&#233;sultats &#224; afficher</span>
          </div>
          <div class="page">Page <span id="currentpage"></span> of <span id="totalpages"></span></div>
        </div>
      </div>
      <div style="clear:left; float:left; margin:0 auto; padding-top:30px">Le comparatif de taux ci dessus est &#224; titre indicatifs et n'engage aucun organisme pr&#234;teur. V&#233;rifier le taux aupr&#232;s de l'organisme pr&#234;teur.<br />Emprunter de l'argent co&#251;te aussi de l'argent.</div>
    </div>
    <script type="text/javascript" src="TinyTableV3/script.js"></script>
    <script type="text/javascript">
      var sorter = new TINY.table.sorter('sorter','table',{
        headclass:'head',
        ascclass:'asc',
        descclass:'desc',
        evenclass:'evenrow',
        oddclass:'oddrow',
        evenselclass:'evenselected',
        oddselclass:'oddselected',
        paginate:true,
        size:20,
        colddid:'columns',
        currentid:'currentpage',
        totalid:'totalpages',
        startingrecid:'startrecord',
        endingrecid:'endrecord',
        totalrecid:'totalrecords',
        hoverid:'selectedrow',
        pageddid:'pagedropdown',
        navid:'tablenav',
        sortcolumn:4,
        sortdir:4,
        sum:[8],
        avg:[6,7,8,9],
        columns:[{index:7, format:'%', decimals:1},{index:8, format:'$', decimals:0}],
        init:true
      });
    </script>
  </body>
</html>

