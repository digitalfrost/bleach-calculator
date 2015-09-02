//expects a hash with 3 of the 4 following keys :originalVolume, :originalConcentration, :finalVolume, :finalConcentration
var BleachSolution = function (options) {
    this.originalVolume = options.originalVolume ;
    this.originalConcentration = options.originalConcentration;
    this.finalVolume = options.finalVolume;
    this.finalConcentration = options.finalConcentration;

    //la densité moyenne pour un produit obtenu à partir d’un hypochlorite de sodium à 13 %
    //de chlore actif. Il s’agit d’une densité moyenne car, en pratique, celle-ci peut varier en fonction de la qualité de l’hypochlorite de sodium.
    this.originalDensity = 1.152

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
  activeChlorine = this.originalConcentration * this.originalDensity * 10
  return Math.round(activeChlorine * 100) / 100
}

module.exports = BleachSolution;
