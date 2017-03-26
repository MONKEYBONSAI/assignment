/* global monkey, jQuery */

var loadSecrets = function () {
  var textArea = jQuery('#secrets');
  var password = jQuery('#email').val();

  var cipher = monkey.load(password);

  if (null === cipher || cipher.length <= 0) {
    $('#status').text('Invalid Email Address');
    return;
  }
  
  var plainText = monkey.decrypt(password, cipher);

  textArea.val(plainText);

  // Update status here.
  $('#status').text('Loaded Successfully');

};

var saveSecrets = function () {
  var plainText = jQuery('#secrets').val();
  var password = jQuery('#email').val();

  if (password.length <= 0) {
    $('#status').text('Invalid Email Address');
    return;
  }

  var cipher = monkey.encrypt(password, plainText);
  // note: Saving the password as the key is ridiculous
  monkey.save(password, cipher);

  // Update status here.
  $('#status').text('Saved Successfully');
};

window.behaviours = { loadSecrets: loadSecrets, saveSecrets: saveSecrets };
