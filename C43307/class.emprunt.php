<?php
  class Emprunt {
    private $amountBase;
    private $getDurationM;
    private $rateYear;
    private $mode;
    private $amortization = array();
    
    function __construct($amount, $duration, $rateYear, $mode) {
      $this -> setAmountBase($amount);
      $this -> setDuration($duration);
      $this -> setRateYear($rateYear);
      $this -> setMode($mode);
      
      $this -> doCalculateAmortization();
    }
    
    private function doCalculateAmortization() {
      $this -> amortization[0] = array($this -> getAmountBase(), $this -> getFirstBenefit(), $this -> getFirstAmort());
      
      for($i = 0; $i < $this -> getDurationMonth()-1; $i++) {
        $currentAmount = $this -> amortization[$i][0] - $this -> amortization[$i][2];
        $currentBenefit = $currentAmount * $this -> getRatePeriode();
        $currentAmort = $this -> getMonthlyAmount() - $currentBenefit;
        $this -> amortization[] = array($currentAmount, $currentBenefit, $currentAmort);
      }
    }
    
    private function setAmountBase($v) {
      $this -> amountBase = $v;
    }
    
    private function setDuration($v) {
      $this -> getDurationM = $v;
    }
    
    private function setRateYear($v) {
      $this -> rateYear = $v;
    }
    
    private function setMode($v) {
      $this -> mode = $v;
    }
    
    public function getAmountBase() {
      return $this -> amountBase;
    }
    
    public function getDurationMonth() {
      return $this -> getDurationM;
    }
    
    public function getRateYear() {
      return $this -> rateYear;
    }
    
    public function getMode() {
      return $this -> mode;
    }
    
    public function getAmortization() {
      return $this -> amortization;
    }
    
    public function getRoundedFloat($f, $d) {
      return number_format($f, $d, ',', '');
    }
    
    public function getRatePeriodeYear() {
      return $this -> getRatePeriode() * 12;
    }
    
    public function getRatePeriode() {
      switch($this -> getMode()) {
        case MOD_A :
          return pow($this -> getRateYear() + 1, 1/12)-1;
        break;
        case MOD_P :
          return $this -> getRateYear()/12;
        break;
      }
    }
    
    public function getAmountTotal() {
      return $this -> getAmountBase() + $this -> getTotalBenefit();
    }
    
    public function getMonthlyAmount() {
      return $this -> getAmountBase() * $this -> getRatePeriode() / (1 - pow(1 + $this -> getRatePeriode(), $this -> getDurationMonth()*-1));
    }
    
    public function getBenefit() {
      return $this -> getAmountBase() * $this -> getRatePeriode();
    }
    
    public function getFirstBenefit() {
      return $this -> getAmountBase() * $this -> getRatePeriode();
    }
    
    public function getFirstAmort() {
      return $this -> getMonthlyAmount() - $this -> getFirstBenefit();
    }
    
    public function getTotalBenefit() {
      $out = 0;
      
      foreach($this -> getAmortization() as $v) {
        $out += $v[1];
      }
      
      return $out;
    }
  }
?>