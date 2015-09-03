var should = require('chai').should();
var BleachSolution = require('../index.js');
var MathJS = require('mathjs');


//var s = new BleachSolution({originalConcentration : 20, finalVolume: 10, finalConcentration: 13});
var s = new BleachSolution({originalConcentration: 0.087 , finalVolume: 10, finalConcentration: 1, manufacturingConcentration: 13});

console.log ("Test4 OC1:" + s.originalConcentration);
console.log("Test mC: " + s.originalDensity());


describe('manufacturing concentration', function(){
  it('manufacturing concentration should default to 24%', function(){
      solution = new BleachSolution({})
      solution.manufacturingConcentration.should.equal(24)
  });
});

describe('original density', function(){
  it('should throw exception if manufacturing concentration is not 24% or 13%', function(){
      solution = new BleachSolution({originalConcentration: 5.50, manufacturingConcentration: 19})
      (function (solution) {solution.originalDensity()}).should.thow(Error, "Data only available for manufacturing densities of 13% or 24%")
  });
  it('should return original density for 13% original manufacturing concentration', function(){
      solution = new BleachSolution({originalConcentration: 9.6, manufacturingConcentration: 13})
      solution.originalDensity().should.equal(1.152)
  });
    it('should return original density for 24% original manufacturing concentration', function(){
      solution = new BleachSolution({originalConcentration: 9.6, manufacturingConcentration: 24})
      solution.originalDensity().should.equal(1.112)
  });
});


describe('active chlorine calculation', function(){
  it('should calculate active chlorine for an original solution at 9.6% made from Sodium Hydrochloride with 13% acive chlorine', function(){
      solution = new BleachSolution({originalConcentration: 9.6, manufacturingConcentration: 13})
      solution.activeChlorine().should.equal(110.59)
  });
    it('should calculate active chlorine for an original solution at 5.5% made from Sodium Hydrochloride with 13% acive chlorine', function(){
      solution = new BleachSolution({originalConcentration: 5.50, manufacturingConcentration: 13})
      solution.activeChlorine().should.equal(59.51)
  });
    it('should calculate active chlorine for an original solution at 9.6% made from Sodium Hydrochloride with 24% acive chlorine', function(){
      solution = new BleachSolution({originalConcentration: 2.6})
      solution.activeChlorine().should.equal(26.73)
  });
    it('should calculate active chlorine for an original solution at 5.5% made from Sodium Hydrochloride with 24% acive chlorine', function(){
      solution = new BleachSolution({originalConcentration: 9.10})
      solution.activeChlorine().should.equal(100.65)
  });
});

describe('Calculate Bleach Solution', function() {
  it('should calculate original volume', function() {
    s = new BleachSolution({originalConcentration : 114.94, finalVolume: 10, finalConcentration: 1});
    s.originalVolume.should.equal(0.087);
  });

  it('should calculate original concentration', function() {
    s = new BleachSolution({originalVolume : 0.02191, finalVolume: 100, finalConcentration: 0.025 });
    s.originalConcentration.should.equal(114.1);
  });

  it('should calculate original concentration again', function() {
    s = new BleachSolution({originalVolume : 0.087, finalVolume: 10, finalConcentration: 1 });
    s.originalConcentration.should.equal(114.94);
  });

  it('should calculate final volume', function() {
    s = new BleachSolution({originalConcentration : 114.94, originalVolume: 0.04383, finalConcentration: 0.1});
    s.finalVolume.should.equal(50);
  });

  it('should calculate final concentration', function() {
    s = new BleachSolution({originalConcentration : 114.94, originalVolume: 0.10957, finalVolume: 250});
    s.finalConcentration.should.equal(0.05);
  });


});
