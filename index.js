//expects a hash with 3 of the 4 following keys :originalVolume, :originalConcentration, :finalVolume, :finalConcentration
var BleachSolution = function (options) {
    this.originalVolume = options.originalVolume ;
    this.originalConcentration = options.originalConcentration;
    this.finalVolume = options.finalVolume;
    this.finalConcentration = options.finalConcentration;
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

module.exports = BleachSolution;
