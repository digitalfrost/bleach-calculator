var MathJS = require('mathjs');

//expects a hash with 3 of the 4 following keys :originalVolume, :originalConcentration, :finalVolume, :finalConcentration
var BleachSolution = function (options) {
    this.originalVolume = options.originalVolume ;
    this.originalConcentration = options.originalConcentration;
    this.finalVolume = options.finalVolume;
    this.finalConcentration = options.finalConcentration;

    //la densité moyenne pour un produit obtenu à partir d’un hypochlorite de sodium à 13 %
    //Average density of the original solution for a product originaly made from Sodium Hypochlorite at 13 %
    //This is an average density because in practice it can varry in function of the quality of the Sodium Hypochlorite
    //the keys corresponds  to percentage original concentration percentageOriginalConcentraction
    //data comes from the French "Chambre Syndicale des fabricants d'Eau de Javel"
    //original data series is incomplete e.g. 2.8, 2.9, 3.0, 3.5, 4.0
    //
    var averageDensityForSolutionsFrom13HercentSodiumHypochlorite ={
      0.1:1.001,
      0.2:1.003,
      0.3:1.004,
      0.4:1.006,
      0.5:1.007,
      0.6:1.008,
      0.7:1.01,
      0.8:1.011,
      0.9:1.012,
      1.0:1.014,
      1.1:1.015,
      1.2:1.017,
      1.3:1.018,
      1.4:1.02,
      1.5:1.021,
      1.6:1.022,
      1.7:1.024,
      1.8:1.025,
      1.9:1.027,
      2.0:1.028,
      2.1:1.03,
      2.2:1.031,
      2.3:1.033,
      2.4:1.034,
      2.5:1.036,
      2.6:1.037,
      2.7:1.038,
      2.8:1.04,
      2.9:1.041,
      3.0:1.043,
      3.5:1.05,
      4.5:1.066,
      5.0:1.074,
      5.5:1.082,
      6.0:1.09,
      6.5:1.098,
      7.0:1.106,
      7.5:1.115,
      8.0:1.123,
      8.5:1.132,
      8.6:1.134,
      8.7:1.135,
      8.9:1.139,
      9.0:1.141,
      9.1:1.143,
      9.2:1.144,
      9.3:1.146,
      9.4:1.148,
      9.5:1.15,
      9.6:1.152,
      9.7:1.153,
      9.8:1.155,
      9.9:1.157,
      10.0:1.159
    }

    this.originalDensity = averageDensityForSolutionsFrom13HercentSodiumHypochlorite[this.originalConcentration.toFixed(1)]

    that = this;
    this.init();
}

BleachSolution.prototype.init = function() {
  params = ["originalVolume" , "finalVolume", "originalConcentration", "finalConcentration"];
  params.map(function(param) {
    if (typeof that[param] === 'undefined' ) {
      that.calculate(param)
    }
  })

}

BleachSolution.prototype.calculate = function(toCalc) {
  switch(toCalc){
    case "originalVolume":
        this.originalVolume = (this.finalConcentration * this.finalVolume) / this.originalConcentration
        return this.originalVolume
      break
      case "originalConcentration":
        this.originalConcentration = (this.finalConcentration * this.finalVolume) / this.originalVolume
        return this.originalConcentration
      break
      case "finalVolume":
        this.finalVolume = (this.originalConcentration * this.originalVolume) / this.finalConcentration
        return this.finalVolume
      break
      case "finalConcentraction":
        this.finalConcentration = (this.originalConcentration * this.originalVolume) / this.finalVolume
        return this.finalConcentration
      break
      default:
        return "Unknown parameter to calculate"
      break
  }
}


//la concentration en grammes de chlore actif présent dans 1 litre de solution. Elle
//s’obtient en multipliant le pourcentage de chlore actif par la densité et par 10 [pour passer des % (poids/poids) aux grammes par litre].
//Exemple : 1 litre de Concentré de Javel à 9,6 % de chlore actif contient :
//9,6 x 1,152 x 10 = 110,59 grammes de chlore actif
//
BleachSolution.prototype.activeChlorine = function(){
  activeChlorine = this.originalConcentration * this.originalDensity  * 10
  return MathJS.round(activeChlorine, 2)
}

module.exports = BleachSolution;
