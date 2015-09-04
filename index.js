//expects a hash with 3 of the 4 following keys initialVolume, initialConcentration, finalVolume, finalConcentration
//an optional option specifyinf the sodiun hypochlorite concentration used to make the initial bleach can be passed in.
var BleachSolution = function (options) {
    this.initialVolume = options.initialVolume ;
    this.initialAvailableChlorine = options.initialAvailableChlorine // this is the available chlorine normally in mg/l
    this.initialPercentageAvailableChlorine = options.initialPercentageAvailableChlorine // percentage available chlorine
    this.initialPercentageSodiumHypochlorite = options.initialPercentageSodiumHypochlorite
    this.finalVolume = options.finalVolume;
    this.finalAvailableChlorine = options.finalAvailableChlorine //normally in mg/l
    this.manufacturingConcentration = options.manufacturingConcentration || 24 ; // default to 24% as per recommendation of C.S.F.E.J.
    //la densité moyenne pour un produit obtenu à partir d’un hypochlorite de sodium à 13 %
    //Average density of the initial solution for a product initialy made from Sodium Hypochlorite at 13 %
    //This is an average density because in practice it can varry in function of the quality of the Sodium Hypochlorite
    //the keys corresponds  to percentage initial concentration percentageinitialConcentraction
    //data comes from the French "Chambre Syndicale des fabricants d'Eau de Javel"
    //initial data series is incomplete e.g. 2.8, 2.9, 3.0, 3.5, 4.0
    //
    var averageDensityForSolutionsFrom13PercentSodiumHypochlorite ={
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

    var averageDensityForSolutionsFrom24PercentSodiumHypochlorite ={
      0.1:1.001,
      0.2:1.002,
      0.3:1.003,
      0.4:1.004,
      0.5:1.005,
      0.6:1.006,
      0.7:1.007,
      0.8:1.008,
      0.9:1.01,
      1.0:1.011,
      1.1:1.012,
      1.2:1.013,
      1.3:1.014,
      1.4:1.015,
      1.5:1.016,
      1.6:1.017,
      1.7:1.018,
      1.8:1.019,
      1.9:1.02,
      2.0:1.021,
      2.1:1.023,
      2.2:1.024,
      2.3:1.025,
      2.4:1.026,
      2.5:1.027,
      2.6:1.028,
      2.7:1.029,
      2.8:1.03,
      2.9:1.031,
      3.0:1.033,
      3.5:1.038,
      4.5:1.05,
      5.0:1.055,
      5.5:1.061,
      6.0:1.067,
      6.5:1.073,
      7.0:1.079,
      7.5:1.086,
      8.0:1.092,
      8.5:1.098,
      8.6:1.099,
      8.7:1.101,
      8.9:1.103,
      9.0:1.105,
      9.1:1.106,
      9.2:1.107,
      9.3:1.108,
      9.4:1.11,
      9.5:1.111,
      9.6:1.112,
      9.7:1.114,
      9.8:1.115,
      9.9:1.116,
      10.0:1.118
    }

    this.initialDensity = function(){
      if (this.manufacturingConcentration == 13){
        return averageDensityForSolutionsFrom13PercentSodiumHypochlorite[this.initialPercentageAvailableChlorine.toFixed(1)]
      }else if (this.manufacturingConcentration == 24) {
        return averageDensityForSolutionsFrom24PercentSodiumHypochlorite[this.initialPercentageAvailableChlorine.toFixed(1)]
      }else {
         throw new Error("Data only available for manufacturing densities of 13% or 24%")
      }
    }

    that = this;
    this.init();
}

BleachSolution.prototype.init = function() {
  params = ["initialVolume" , "finalVolume", "initialAvailableChlorine", "finalAvailableChlorine"];
  params.map(function(param) {
    if (typeof that[param] === 'undefined' ) {
      that.calculate(param)
    }
  })

}

BleachSolution.prototype.calculate = function(toCalc) {
  switch(toCalc){
    case "initialVolume":
        this.initialVolume = (this.finalAvailableChlorine * this.finalVolume) / this.initialAvailableChlorine
        this.initialVolume = this.initialVolume.toFixed(3) * 1
        return this.initialVolume
      break
      case "initialAvailableChlorine":
        this.initialAvailableChlorine = (this.finalAvailableChlorine * this.finalVolume) / this.initialVolume
        this.initialAvailableChlorine = this.initialAvailableChlorine.toFixed(2) * 1
        return this.initialConcentration
      break
      case "initialDensity":
        return this.initialDensity()
      break
      case "finalVolume":
        this.finalVolume = (this.initialAvailableChlorine * this.initialVolume) / this.finalAvailableChlorine
        this.finalVolume = Math.round(this.finalVolume)
        return this.finalVolume
      break
      case "finalAvailableChlorine":
        this.finalAvailableChlorine = (this.initialAvailableChlorine * this.initialVolume) / this.finalVolume
        this.finalAvailableChlorine = this.finalAvailableChlorine.toFixed(2) * 1
        return this.finalAvailableChlorine
      break
      case "percentageAvailableChlorine":
        if (typeof this.initialPercentageSodiumHypochlorite !== 'undefined' ) {
          return this.percentageAvailableChlorineFromSodiumHypochlorite()
        } else {
          return "TODO"
        }
      break
      case "sodiumHypochlorite":  //Calculates initial % NaClO ( Percentage Sodium Hypochlorite)
        return this.sodiumHypochlorite()
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
  this.activeChlorine = this.initialPercentageAvailableChlorine * this.initialDensity()  * 10
  this.activeChlorine = this.activeChlorine.toFixed(2) * 1
  return this.activeChlorine
}

//Calculates initial % NaClO ( Percentage Sodium Hypochlorite)
//Poids moléculaire chlore actif (exprimé en Cl2) = 71
//Poids moléculaire NaClO = 74,5
//
BleachSolution.prototype.sodiumHypochlorite = function() {
  this.initialPercentageSodiumHypochlorite = (this.initialPercentageAvailableChlorine * 74.5) / 71
  this.initialPercentageSodiumHypochlorite = this.initialPercentageSodiumHypochlorite.toFixed(2) * 1
  return this.initialPercentageSodiumHypochlorite
}

BleachSolution.prototype.percentageAvailableChlorineFromSodiumHypochlorite = function () {
  this.initialPercentageAvailableChlorine = ( this.initialPercentageSodiumHypochlorite * 71 ) / 74.5
  this.initialPercentageAvailableChlorine  = this.initialPercentageAvailableChlorine.toFixed(1) * 1
  return this.initialPercentageAvailableChlorine
}

//TODO simplify maybe using a dilute() and undilute() function

module.exports = BleachSolution;
