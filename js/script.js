/* global sjcl */
// Usage (hint: try this in the console windows of your browser):
// window.monkey.save('foo', 'somestringoftexthere'); 
// window.monkey.fetch('foo') /* "somestringoftexthere" */
// var e = window.monkey.encrypt('supersecret', 'some plain text'); 
// window.monkey.decrypt('supersecret', e) /* "some plain text" */

// Simple LocalStorage Methods
var save = function (key, data) {
  localStorage.setItem(key, data);
};

var fetch = function (key) {
  return localStorage.getItem(key);
};

var encrypt = function (password, plaintext) {
  return sjcl.encrypt(password, plaintext);
};

var decrypt = function (password, encrypted) {
  return sjcl.decrypt(password, encrypted);
};

// hack export via global monkey
window.monkey = { save: save, fetch: fetch, encrypt: encrypt, decrypt: decrypt };
