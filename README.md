# Bleach Solution Calculator

A simple utility to work out how to make a bleach solution of a given volume and concentration and perform various calculations relating to bleach.

### Install

Install via npm

```
npm install bleach-calculator
```


### Description / Usage

Works out either:

  - initial volume
  - initial concentration (this is the available chlorine normally in mg / l ) ? / or g / l ?
  - final volume
  - or final concentration expressed as final available chlorine in mg / l/ or g / l ?

given the other three characteristics of the bleach solution.


```
var solution = new BleachSolution({initialAvailableChlorine : 20, finalVolume: 10, finalAvailableChlorine: 10});
console.log ("Initial Volume: " + solution.originalVolume);

```

Calculate initial concentration of Sodium Hypochlorite (percentage Sodium Hypochlorite)

```
var solution = new BleachSolution({initialPercentageAvailableChlorine : 9.6});
solution.calculate("sodiumHypoclorite")
```

Calculate initial percentage available chlorine given initial concentration of sodium hypochlorite

```
var solution = new BleachSolution({initialPercentageSodiumHypochlorite: 10.08})
solution.calculate("percentageAvailableChlorine")
```

Calculate Initial Density of Solution

```
var solution = new BleachSolution({initialPercentageAvailableChlorine : 9.6});
solution.calculate("initialDensity")
```

### Calcualte chlorometric degree
need to specify available chlorine

```
solution.calculate("chlorometriDegree")
```


## DISCLAIMER

The calculator is provided/being made available  without any warranties, express or implied, including fitness for a particular purpose. We shall not be liable or responsible to any person for any harm, loss or damage that may arise in any connection with the use of the bleach  calculator, including without limitation any direct, indirect, special, third party, or consequential damages.

## WARNING

It is estimated that there are about 3300 accidents needing hospital treatment caused by sodium hypochlorite solutions each year in British homes

Mixing bleach with some household cleaners can be hazardous.  Mixtures of other cleaning agents and or organic matter can result in a gaseous reaction that can cause acute lung injury.


Always wear appropriate safety equipment when handling bleach

