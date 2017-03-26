/* global monkey, jQuery */

var loadSecrets = function () {
  var textArea = jQuery('#secrets');
  var password = jQuery('#email').val();

  var cipher = monkey.load(password);
  var plainText = monkey.decrypt(password, cipher);

  textArea.val(plainText);

  // Update status here.
};

var saveSecrets = function () {
  var plainText = jQuery('#secrets').val();
  var password = jQuery('#email').val();

  var cipher = monkey.encrypt(password, plainText);
  // note: Saving the password as the key is ridiculous
  monkey.save(password, cipher);

  // Update status here.
};

window.behaviours = { loadSecrets: loadSecrets, saveSecrets: saveSecrets };
