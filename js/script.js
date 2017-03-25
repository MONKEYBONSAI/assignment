// Usage (hint: try this in the console windows of your browser):
// window.monkey.save('foo', 'somestringoftexthere'); 
// window.monkey.fetch('foo') /* "somestringoftexthere" */

// Simple LocalStorage Methods
var save = function (key, data) {
  localStorage.setItem(key, data);
};

var fetch = function (key) {
  return localStorage.getItem(key);
};

// hack export via global monkey
window.monkey = { save: save, fetch: fetch };
