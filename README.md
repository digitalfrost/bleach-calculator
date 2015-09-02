# Bleach Solution Calculator

A simple utility to work out how to make a bleach solution of a given volume and concentration.

Works out either:

  - original volume
  - original concentration
  - final volume
  - or final concentration

given the other three characteristics of the bleach solution.

Original concentration is in &degree Chloro
Final concentration is in mg/litres

### Install

Install via npm

```
npm install bleach-calculator
```

### Usage

```
var solution = new BleachSolution({originalConcentration : 20, finalVolume: 10, finalConcentration: 10});
console.log ("Original Volume: " + solution.originalVolume);

```
