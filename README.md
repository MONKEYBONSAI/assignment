### The SaiPass Local HTML implementation

**The js folder --**

```
.
├── behaviours.js
├── monkey.js
├── store.js
└── vendor
    ├── jquery.min.js
    └── sjcl.js
```

* **store.js** : A class which wraps the localStorage
* **monkey.js** : A collection of functions which handles encryption/decryption and saving data to the browsers localStorage
* **behaviours.js** : A collection of functions which does HTML document manipulation. This is where we wire up click events, animations or other behaviours that our front-end executes.



**The test folder --**

```
.
├── behaviours_test.js
├── monkey_test.js
├── store_test.js
└── vendor
    ├── chai.js
    ├── mocha.css
    └── mocha.js
```

The tests folder contains unit tests for our javascript files in `/js/*.js`. 

Mocha and Chai have been included to easily get up and running with javascript tests in the browser. Run `./run.js` to run the simple web server in docker and navigate to http://localhost:9000/tests.html

- Unit test script files are included in `test.html` 
- Examples of current unit tests are viewable in `/test/**_test.js` 
- At the time of writing, a basic way to export functions and objects is to attach them to a global window variable called `monkey` or `behaviours` as seen in `/js/monkey.js



**Installing Docker**

* The happy path: https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac
* The unhappy path: https://docs.docker.com/docker-for-windows/



**Running the app (static html development)**

```
chmod a+x ./run.sh
./run.sh
```

There is also a demo of the current master at https://monkeybonsai.github.io/assignment



**ESLint for style compliant javascript**

* change into the root directory of the project
* Run `npm install`

This will install some cli tools that are useful for keeping things tidy, namely eslint. Most editors will have an eslint plugin, install the appropriate plugin or extension for your editor and fix any inconsistencies.



**In browser encryption**

For a quick in-browser encryption implementation the Stanford Javascript Crypto Library [https://github.com/bitwiseshiftleft/sjcl/] was used.



**Javascript Overview 'monkey'**

Functions are attached to a window property called `monkey`

Basic usage examples to try in the console window of your browser:

```
// Save a string.
window.monkey.save('foo', 'somestringoftexthere');

// Fetch a string.
window.monkey.load('foo') 
/* "somestringoftexthere" */

// Encrypt a string and store the cyphertext into a variable.
var e = window.monkey.encrypt('supersecret', 'some plain text'); 

// Decrypt the ciphertext
window.monkey.decrypt('supersecret', e) 
/* "some plain text" */
```

