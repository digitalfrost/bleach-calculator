var should = require('chai').should();
var BleachSolution = require('../index.js');


//var s = new BleachSolution({originalConcentration : 20, finalVolume: 10, finalConcentration: 10});
var s = new BleachSolution({originalVolume: 0.087 , finalVolume: 10, finalConcentration: 1});

console.log ("Test4 OC1:" + s.originalConcentration);

describe('Calculate Bleach Solution', function() {
  it('should calculate original volume', function() {
    s = new BleachSolution({originalConcentration : 114.94, finalVolume: 10, finalConcentration: 1000});
    s.originalVolume.should.equal(0.087);
  });

  it('should calculate original concentration', function() {
    s = new BleachSolution({originalVolume : 20, finalVolume: 10, finalConcentration: 10});
    s.originalConcentration.should.equal(5);
  });

  it('should calculate final volume', function() {
    s = new BleachSolution({originalConcentration : 20, originalVolume: 10, finalConcentration: 10});
    s.finalVolume.should.equal(5);
  });

  it('should calculate final concentration', function() {
    s = new BleachSolution({originalConcentration : 20, originalVolume: 10, finalVolume: 10});
    s.finalConcentration.should.equal(5);
  });


});
