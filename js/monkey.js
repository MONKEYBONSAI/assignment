/* global sjcl */

var save = function (key, data) {
  localStorage.setItem(key, data);
};

var load = function (key) {
  return localStorage.getItem(key);
};

var encrypt = function (password, plaintext) {
  return sjcl.encrypt(password, plaintext);
};

var decrypt = function (password, encrypted) {
  return sjcl.decrypt(password, encrypted);
};

var hash = function(value) {
  var b = sjcl.hash.sha256.hash(value);  
  return sjcl.codec.hex.fromBits(b);
};

// hack export via global monkey
window.monkey = { save: save, load: load, encrypt: encrypt, decrypt: decrypt, hash: hash };
