/** Class to interact with our storage */
class Secret_Store {
    constructor() {
        if (!localStorage) {
            throw "no-localstorage-support";
            // fall back to cookie storage??
        }
        
        if (!JSON) {
            throw "no-json-support";
            // require a polyfill maybe (https://bestiejs.github.io/json3/)
        }
    }
    
    /**
     * Fetches our question list.
     * @param {Secret_Store~onSuccess} onSuccess Handle response on success
     * @param {Secret_Store~onFail}    onFail    Handle error on fail
     */
    Load_Questions(onSuccess, onFail) {
        setTimeout(function() {
            // grabs our question list from storage
            var questions_json = localStorage.getItem("mb_questions");
            if (!questions_json) {
                onSuccess([]); // question list doesn't exist (first time user)
                return;
            }
            
            // attempts to decode our question list
            try {
                onSuccess(JSON.parse(questions_json));
            } catch(e) {
                onFail(e);
            }
        }, 0);
    }
    
    /**
     * Fetches encrypted secret blob and attempts to decrypt & decode it.
     * @param {object}   params    Options object
     * @param {Secret_Store~onSuccess} onSuccess Handle response on success
     * @param {Secret_Store~onFail}    onFail    Handle error on fail
     */
    Load_Secret(params, onSuccess, onFail) {
        /*
        params.assign({
            answers: [] 
        });
        // I'm dev'ing on chrome so I can't use ES6 without the Babel polyfill
        */
        
        setTimeout(function() {           
            // grabs our encrypted blob
            var secrets_json = localStorage.getItem("mb_secret");
            if (!secrets_json) {
                onFail("Couldn't load secrets.");
            }
            
            // attempt to decrypt our secrets
            var pass_phrase = params.answers.join("|");
            //  var decrypted_json = Decrypt(encrypted_json, pass_phrase);
            var decrypted_json = encrypted_json;
            
            if (!decrypted_json) {
                onFail("Could not decrypt JSON");
                return;
            }
            
            // attempt to decode the decrypted_json
            try {
                onSuccess(JSON.parse(decrypted_json));
            } catch (e) {
                onFail("Could not decode JSON");
            }
        }, 0);
    }
    
    /**
     * Stores our secret information and our question array.
     * @param {object}   params    Options object
     * @param {Secret_Store~onSuccess} onSuccess Handle response on success
     * @param {Secret_Store~onFail}    onFail    Handle error on fail
     */
    Save_Secret(params, onSuccess, onFail) {
        setTimeout(function() {
            // input validation
            if (!"questions" in params || !"data" in params) {
                onFail("Questions and Data required.");
                return;
            }

            if (!"answers" in params.data) {
                onFail("Answers must be present in secret data.");
                return;
            }

            if (params.questions.length !== params.data.answers.length) {
                onFail("Question and answer count missmatch.");
                return;
            }
            
            // encrypts our secret data
            var secret_json = JSON.stringify(params.data);
            // var secret_encrypted = Encrypt(secret_json);
            var secret_encrypted = secret_json;
            
            // attempts to store our question array and secret data.
            try {
                localStorage.setItem("mb_secret", secret_encrypted);
                localStorage.setItem("mb_questions", params.questions);
            } catch (e) {
                onFail(e);
                return;
            }
        }, 0);
    }
}

/**
 * This callback is passed the stored data on success.
 * @callback Secret_Store~onSuccess
 * @param {object} response The response data.
 */

/**
 * This callback is passed the error message on fail.
 * @callback Secret_Store~onFail
 * @param {string} response The error message.
 */
