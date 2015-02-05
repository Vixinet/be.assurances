<?php
  class Manager {
    private $currentPage;
    private $currentUser;
    private $sql;
    private $log = array();
    private $log_dbg = array();
    private $xml;
    
    private $debugState = true;
    
    function __construct() { }
    
    // Do it
    public  function doWork() {
      global $lang;
      
      $this -> doInitSqlLink();
      $this -> doFilterParams();
      $this -> doInitXml();
      
      if($this -> hasPostRequest()) {
    
        $root = $this -> xml -> createElement('data');
        $this -> xml -> appendChild($root);
        
        $langx = $this -> xml -> createElement('lang');
        $root -> appendChild($langx);
        foreach($lang as $k => $v) {
          $langx -> appendChild($this -> xml -> createElement($k, $v));
        }
            
        switch($_POST['a']) {
        
          case 'a.home' :
            if($this -> doRequireLogin()) break;
            $this -> setCurrentPage('page.a.home.xsl');
          break;
          
          case 'a.institutions' :
            if($this -> doRequireLogin()) break;
            
            
            // R&#233;cupère les banques
            $this -> getSqlLink() -> query("SELECT id, name, logo, link FROM institutions ORDER BY name");
            while($res = $this -> getSqlLink() -> fetch_row()) {
              $item = $this -> xml -> createElement('item');
              $item -> appendChild($this -> xml -> createElement('id', $res[0]));
              $item -> appendChild($this -> xml -> createElement('name', $res[1]));
              $item -> appendChild($this -> xml -> createElement('logo', $res[2]));
              $item -> appendChild($this -> xml -> createElement('link', $res[3]));
              $root -> appendChild($item);
            }
            
            $img = $this -> xml -> createElement('images');
            $root -> appendChild($img);
            foreach (glob("images/data/*.gif") as $filename) {
              $img -> appendChild($this -> xml -> createElement('item', $filename));
            }
            
            $this -> setCurrentPage('page.a.institutions.xsl');
          break;
          
          case 'a.institutions.add' :
            if($this -> doRequireLogin()) break;
            if(empty($_POST['n'])) {
              $this -> setLogEvent('Le nom est vide', ERROR);
            } else {
              $this -> getSqlLink() -> query("INSERT INTO institutions (name, link, logo) VALUES ('".$_POST['n']."','".$_POST['link']."','".$_POST['logoa_c_logo']."')");
            }
            return $this -> doGoTo('a.institutions');
          break;
          
          case 'a.institutions.edit' :
            if($this -> doRequireLogin()) break;
            $id = $_POST['id'];
            if(isset($_POST['n'])) {
              $v = $_POST['n'];
              $f = 'name';
            } elseif(isset($_POST['logo'])) {
              $v = $_POST['logo'];
              $f = 'logo';
            } elseif(isset($_POST['link'])) {
              $v = $_POST['link'];
              $f = 'link';
            }
            
            if(empty($v)) {
              $this -> setLogEvent('Le champs est vide', ERROR);
            } else {
              $this -> getSqlLink() -> query("UPDATE institutions SET $f='$v' where id=$id");
            }
            
            return $this -> doGoTo('a.institutions');
          break;
          
          case 'a.institutions.delete' :
            if($this -> doRequireLogin()) break;
            $this -> getSqlLink() -> query("DELETE FROM institutions WHERE id=".$_POST['id']);
            return $this -> doGoTo('a.institutions');
          break;
          
          case 'a.servicescst' :
            if($this -> doRequireLogin()) break;
            
            
            // R&#233;cupère les banques
            $this -> getSqlLink() -> query("SELECT id, name FROM servicescst ORDER BY name");
            while($res = $this -> getSqlLink() -> fetch_row()) {
              $item = $this -> xml -> createElement('item');
              $item -> appendChild($this -> xml -> createElement('id', $res[0]));
              $item -> appendChild($this -> xml -> createElement('name', $res[1]));
              $root -> appendChild($item);
            }
            
            $this -> setCurrentPage('page.a.servicescst.xsl');
          break;
          
          case 'a.servicescst.add' :
            if($this -> doRequireLogin()) break;
            if(empty($_POST['n'])) {
              $this -> setLogEvent('Le nom est vide', ERROR);
            } else {
              $this -> getSqlLink() -> query("INSERT INTO servicescst (name) VALUES ('".$_POST['n']."')");
            }
            return $this -> doGoTo('a.servicescst');
          break;
          
          case 'a.servicescst.edit' :
            if($this -> doRequireLogin()) break;
            if(empty($_POST['n'])) {
              $this -> setLogEvent('Le nom est vide', ERROR);
            } else {
              $this -> getSqlLink() -> query("UPDATE servicescst set name= '".$_POST['n']."' where id=".$_POST['id']);
            }
            return $this -> doGoTo('a.servicescst');
          break;
          
          case 'a.servicescst.delete' :
            if($this -> doRequireLogin()) break;
            $this -> getSqlLink() -> query("DELETE FROM servicescst WHERE id=".$_POST['id']);
            return $this -> doGoTo('a.servicescst');
          break;
          
          case 'a.services' :
            if($this -> doRequireLogin()) break;
            
            
            // R&#233;cupère les services
            $this -> getSqlLink() -> query("SELECT s.id, institution, servicecst, min_duration, max_duration, min_amount, max_amount, rate, info FROM services s");
            
            $services = $this -> xml -> createElement('services');
            $root -> appendChild($services);
            while($res = $this -> getSqlLink() -> fetch_row()) {
              $item = $this -> xml -> createElement('item');
              $item -> appendChild($this -> xml -> createElement('id', $res[0]));
              $item -> appendChild($this -> xml -> createElement('institution', $res[1]));
              $item -> appendChild($this -> xml -> createElement('service', $res[2]));
              $item -> appendChild($this -> xml -> createElement('min_duration', $res[3]));
              $item -> appendChild($this -> xml -> createElement('max_duration', $res[4]));
              $item -> appendChild($this -> xml -> createElement('min_amount', $res[5]));
              $item -> appendChild($this -> xml -> createElement('max_amount', $res[6]));
              $item -> appendChild($this -> xml -> createElement('rate', $res[7]));
              $item -> appendChild($this -> xml -> createElement('info', $res[8]));
              $services -> appendChild($item);
            }
            
            // R&#233;cupère les banques
            $this -> getSqlLink() -> query("SELECT id, name FROM institutions");
            $institutions = $this -> xml -> createElement('institutions');
            $root -> appendChild($institutions);
            while($res = $this -> getSqlLink() -> fetch_row()) {
              $item = $this -> xml -> createElement('item');
              $item -> appendChild($this -> xml -> createElement('id', $res[0]));
              $item -> appendChild($this -> xml -> createElement('name', $res[1]));
              $institutions -> appendChild($item);
            }
            
            // R&#233;cupère les labels des services
            $this -> getSqlLink() -> query("SELECT id, name FROM servicescst");
            $servicescst = $this -> xml -> createElement('servicescst');
            $root -> appendChild($servicescst);
            while($res = $this -> getSqlLink() -> fetch_row()) {
              $item = $this -> xml -> createElement('item');
              $item -> appendChild($this -> xml -> createElement('id', $res[0]));
              $item -> appendChild($this -> xml -> createElement('name', $res[1]));
              $servicescst -> appendChild($item);
            }
            
            $this -> setCurrentPage('page.a.services.xsl');
          break;
          
          case 'a.services.add' :
            if($this -> doRequireLogin()) break;
            if(empty($_POST['s']) or empty($_POST['i']) or empty($_POST['dmax']) or empty($_POST['dmin']) or empty($_POST['mmin']) or empty($_POST['mmax']) or empty($_POST['r'])) {
              $this -> setLogEvent('Des champs sont vides', ERROR);
            } else {
              $this -> getSqlLink() -> query("INSERT INTO services (servicecst, institution, min_duration, max_duration, min_amount, max_amount, rate) VALUES (".$_POST['s'].",".$_POST['i'].",".$_POST['dmin'].",".$_POST['dmax'].",".$_POST['mmin'].",".$_POST['mmax'].",".$_POST['r'].")");
            }
            return $this -> doGoTo('a.services');
          break;
          
          case 'a.services.edit' :
            if($this -> doRequireLogin()) break;
            
            $id = $_POST['id'];
             
            if(isset($_POST['dmin'])) {
              $v = $_POST['dmin'];
              $f = 'min_duration';
            } elseif(isset($_POST['dmax'])) {
              $v = $_POST['dmax'];
              $f = 'max_duration';
            } elseif(isset($_POST['mmin'])) {
              $v = $_POST['mmin'];
              $f = 'min_amount';
            } elseif(isset($_POST['mmax'])) {
              $v = $_POST['mmax'];
              $f = 'max_amount';
            } elseif(isset($_POST['r'])) {
              $v = $_POST['r'];
              $f = 'rate';
            } elseif(isset($_POST['info'])) {
              $v = $_POST['info'];
              $f = 'info';
            }
            
            if(empty($v)) {
              $this -> setLogEvent('Le champs est vide', ERROR);
            } else {
              $this -> getSqlLink() -> query("UPDATE services set $f='$v' where id=$id");
            }
            
            return $this -> doGoTo('a.services');
          break;
          
          case 'a.services.delete' :
            if($this -> doRequireLogin()) break;
            $this -> getSqlLink() -> query("DELETE FROM services WHERE id=".$_POST['id']);
            return $this -> doGoTo('a.services');
          break;
          
          case 'u.logout' :
            session_unset();
            session_destroy();
            session_write_close();
            $this -> setCurrentPage('page.u.home.xsl');
          break;
          
          case 'u.login' :
            $res = $this -> getSqlLink() -> queryFetch("SELECT id FROM users where user='".$_POST['u']."' and pass='".$_POST['p']."'");
            if($this -> getSqlLink() -> num_rows() == 1) {
              $_SESSION['user']['id'] = $res[0];
              $_SESSION['user']['name'] = $_POST['u'];
              $this -> setCurrentUser($_SESSION['user']['id']);
              return $this -> doGoTo('a.institutions');
            } else {
              $this -> setLogEvent('Aucun utilisateur trouv&#233;', ERROR);
            }
          break;
          default : 
            if($this -> doRequireLogin()) break;
            return $this -> doGoTo('a.institutions');
          break;
        }
      }
      
      $this -> doXmlResponse();
      $this -> doDestroySqlLink();
    }
    
    private function doGoTo($v) {
      $_POST['a'] = $v;
      $this -> doWork();
      return false;
    }
    
    private function doRequireLogin() {
      if(!$this -> getCurrentUser()) {
        $this -> setCurrentPage('page.u.home.xsl');
        return true;
      }
      return false;
    }
    
    private function doInitSqlLink() {
      $this -> sql =  new SQLi(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    }
    
    private function doDestroySqlLink() {
      $this -> sql -> close();
    }
    
    private function doFilterParams() {
      foreach($_POST as $k => $v) {
        $_POST[$k] = $this -> getSqlLink() -> escape($v);
      }
	
      foreach($_GET as $k => $v) {
        $_GET[$k] = $this -> getSqlLink() -> escape($v);
      }
    }
    
    private function doFlushLog() {
      unset($this -> log );
    }
    
    private function doFlushLogDebug() {
      unset($this -> log_dbg );
    }
    
    private function doTransform($xml, $xslfile) {
      $xslt = new XSLTProcessor(); 
      $xsl  = new DOMDocument('1.0', 'UTF-8'); 
      $xsl -> load($xslfile);
      $xslt -> importStylesheet($xsl);
      return $xslt -> transformToXML($xml); 
    }
    
    private function doInitXml() {
      $this -> xml = new DOMDocument('1.0', 'UTF-8');
    }
    
    private function doXmlResponse() {
      $dom = new DOMDocument('1.0', 'UTF-8');
      $rsp = $dom -> createElement('data');
      $dom -> appendChild($rsp);
      $params = $dom -> createElement('params');
      $rsp -> appendChild($params);
      
      // Gestion des ERREURS / INFOS / DEBUG
      $msg = $dom -> createElement('msg');
      $rsp -> appendChild($msg);
      $errors = $dom -> createElement('errors');
      $msg -> appendChild($errors);
      $infos = $dom -> createElement('infos');
      $msg -> appendChild($infos);
      
      foreach($this -> getLogEvents() as $v) {
        if($v[1] == ERROR)
          $errors -> appendChild($dom -> createElement('item', $v[0]));
        else
          $infos -> appendChild($dom -> createElement('item', $v[0]));
      }
      $this -> doFlushLog();

      if($this -> getDebugState()) {
        $debug = $dom -> createElement('debug');
        $msg -> appendChild($debug);
        foreach($this -> getDebugEvents() as $v) {
          $debug -> appendChild($dom -> createElement('item', $v));
        }
        $this -> doFlushLogDebug();
      }
      
      // GESTION des PARAMS
      $params -> appendChild($dom -> createElement('action', $_POST['a']));
      
      if($this -> getCurrentUser()) {
        $params -> appendChild($dom -> createElement('uid', $_SESSION['user']['id']));
        $params -> appendChild($dom -> createElement('uname', $_SESSION['user']['name']));
      }
      
      // GESTION OUT
      $fragment = $dom -> createDocumentFragment();
      $fragment -> appendXML($this -> doTransform($this -> xml, $this -> getCurrentPage()));
      $rsp -> appendChild($fragment);
      
      echo $dom -> saveXML();
    }
    
    public  function hasPostRequest() {
      return $_SERVER['REQUEST_METHOD'] == 'POST';
    }
    
    // Getters
    private function getSqlLink() { 
      return $this -> sql;
    }
    
    public  function getCurrentPage() {
      return $this -> currentPage;
    }
    
    public  function getCurrentUser() {
      return $this -> currentUser;
    }
    
    private function getLogEvents() {
      return $this -> log;
    }
    
    public  function getDebugEvents() {
      return $this -> log_dbg;
    }
    
    public  function getDebugState() {
      return $this -> debugState;
    }
  
    private function get_include_contents($filename) {
      if (is_file($filename)) {
          ob_start();
          include $filename;
          $contents = ob_get_contents();
          ob_end_clean();
          return $contents;
      }
      return false;
    }
    
    // Setters
    private function setCurrentPage($v) {
      $this -> currentPage = $v;
    }
    
    private function setCurrentUser($v) {
      $this -> currentUser = $v;
    }
    
    public  function setLogEvent($type, $text) {
      $this -> log[] = array($type, $text);
    }
  
    private function setDebugEvent($v) {
      if($this -> getDebugState()) {
        $this -> log_dbg[] = $v;
      } 
    }
  }
?>