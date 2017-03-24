
var add = function(a, b) {
  return a + b; 
};

var subtract = function(a, b) {
  return a - b;
};

// hack export via global monkey
monkey = { add, subtract };