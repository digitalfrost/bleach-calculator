var should = require('chai').should();
var BleachSolution = require('../index.js');

//var s = new BleachSolution({initialAvailableChlorine : 20, initialVolume: 10, finalVolume: 10});
//console.log ("Test5 FC2:" + s.finalAvailableChlorine);

describe('manufacturing concentration', function(){
  it('manufacturing concentration should default to 24%', function(){
      solution = new BleachSolution({})
      solution.manufacturingConcentration.should.equal(24)
  });
});

describe('initial density calculation', function(){
  //TODO Fix Async problem witht this test
  it('should throw exception if manufacturing concentration is not 24% or 13%', function(){
      solution = new BleachSolution({initialAvailableChlorine: 5.50, manufacturingConcentration: 19})
      //solution.initialDensity().should.thow(Error, "Data only available for manufacturing densities of 13% or 24%")
      true
  });
  it('should return initial density for 13% initial manufacturing concentration', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 9.6, manufacturingConcentration: 13})
      solution.calculate("initialDensity").should.equal(1.152)
  });
    it('should return initial density for 24% initial manufacturing concentration', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 9.6, manufacturingConcentration: 24})
      solution.calculate("initialDensity").should.equal(1.112)
  });
});

describe('active chlorine calculation', function(){
  it('should calculate active chlorine for an initial solution at 9.6% made from Sodium Hydrochloride with 13% acive chlorine', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 9.6, manufacturingConcentration: 13})
      solution.activeChlorine().should.equal(110.59)
  });
    it('should calculate active chlorine for an initial solution at 5.5% made from Sodium Hydrochloride with 13% acive chlorine', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 5.50, manufacturingConcentration: 13})
      solution.activeChlorine().should.equal(59.51)
  });
    it('should calculate active chlorine for an initial solution at 9.6% made from Sodium Hydrochloride with 24% acive chlorine', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 2.6})
      solution.activeChlorine().should.equal(26.73)
  });
    it('should calculate active chlorine for an initial solution at 5.5% made from Sodium Hydrochloride with 24% acive chlorine', function(){
      solution = new BleachSolution({initialPercentageAvailableChlorine: 9.10})
      solution.activeChlorine().should.equal(100.65)
  });
});

describe('Calculate Bleach Solution', function() {
  it('should calculate initial volume', function() {
    s = new BleachSolution({initialAvailableChlorine : 114.94, finalVolume: 10, finalAvailableChlorine: 1});
    s.initialVolume.should.equal(0.087);
  });

  it('should calculate initial concentration', function() {
    s = new BleachSolution({initialVolume : 0.02191, finalVolume: 100, finalAvailableChlorine: 0.025 });
    s.initialAvailableChlorine.should.equal(114.1);
  });

  it('should calculate initial concentration again', function() {
    s = new BleachSolution({initialVolume : 0.087, finalVolume: 10, finalAvailableChlorine: 1 });
    s.initialAvailableChlorine.should.equal(114.94);
  });

  it('should calculate final volume', function() {
    s = new BleachSolution({initialAvailableChlorine : 114.94, initialVolume: 0.04383, finalAvailableChlorine: 0.1});
    s.finalVolume.should.equal(50);
  });

  it('should calculate final concentration', function() {
    s = new BleachSolution({initialAvailableChlorine : 114.94, initialVolume: 0.10957, finalVolume: 250});
    s.finalAvailableChlorine.should.equal(0.05);
  });

  it('should calculate initial percentage Sodium Hypochlorite', function() {
    s = new BleachSolution({initialPercentageAvailableChlorine: 9.6})
    s.calculate("sodiumHypochlorite").should.equal(10.07)
  });

  it('should calculate initial percentage available chlorine given percentage Sodium Hypochlorite ', function() {
    s = new BleachSolution({initialPercentageSodiumHypochlorite: 10.08})
    s.calculate("percentageAvailableChlorine").should.equal(9.6)
  });

});
