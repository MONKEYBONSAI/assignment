/* global jQuery */

describe('window dependencies', () => {
  describe('JQuery ($)', () => {
    it('should be attached to the window', () => {
        window.jQuery.should.exist;
        window.$.should.exist;
    });
  });
  describe('monkey', () => {
    it('should be attached to the window', () => {
        window.monkey.should.exist;
    });
  });
  describe('behaviours', () => {
    it('should be attached to the window', () => {
        window.behaviours.should.exist;
    });
  });
});

describe('behaviours', () => {
  const email = 'foo@bar.baz';
  const plainText = 'Lorem ipsum dolor sit amet, in eum simul nonumy';

  const textAreaId = 'secrets';
  const emailId = 'email';
  const statusId = 'status';

  afterEach(() => {
    // Cleanup by removing elements from the DOM.
    jQuery(`#${textAreaId}`).remove();
    jQuery(`#${emailId}`).remove();
    jQuery(`#${statusId}`).remove();
    localStorage.clear();
  });

  describe('behaviours - saveSecrets', () => {
    describe('when a valid email address is used', () => {
      beforeEach(() => {
        jQuery('body').append(`<textarea id="${textAreaId}">${plainText}</textarea>`);
        jQuery('body').append(`<input id="${emailId}" value="${email}">`);
        localStorage.clear();

        window.behaviours.saveSecrets();
      });

      it('should save a new localStorage blob using the email as a key', () => {
        localStorage.getItem(email).should.be.a('string');
      });

      it('should store something other than the plain text', () => {
        localStorage.getItem(email).should.not.equal(plainText);
      });
    });

    describe('when the email address field is empty', () => {
      beforeEach(() => {
        jQuery('body').append(`<textarea id="${textAreaId}">${plainText}</textarea>`);
        jQuery('body').append(`<input id="${emailId}" value="">`);
        jQuery('body').append(`<span id="${statusId}">FOO</span>`);
        localStorage.clear();

        window.behaviours.saveSecrets();
      });

      it('should update the status text to say "Invalid email address"', () => {
        let expectedMessage = 'Invalid email address';
        jQuery(`#${statusId}`).html().should.equal(expectedMessage);
      });

      it('should not store anything in localStorage', () => {
        localStorage.getItem('').should.be.null;
      });
    });
  });

  describe('behaviours - loadSecrets', () => {
    describe('when data has been encrypted using the email address', () => {
      beforeEach(() => {
        jQuery('body').append(`<textarea id="${textAreaId}"></textarea>`);
        jQuery('body').append(`<input id="${emailId}" value="${email}">`);
        jQuery('body').append(`<span id="${statusId}">FOO</span>`);

        let e = window.monkey.encrypt(email, plainText);
        window.monkey.save(email, e);
        window.behaviours.loadSecrets();
      });

      it('should populate the textarea with expected plain text', () => {
        jQuery(`#${textAreaId}`).val().should.equal(plainText);
      });
    });

    describe('when no data has been saved using the current email address', () => {
      let expectedMessage = 'Invalid email address';

      beforeEach(() => {
        jQuery('body').append(`<textarea id="${textAreaId}"></textarea>`);
        jQuery('body').append(`<input id="${emailId}" value="BLAH">`);
        jQuery('body').append(`<span id="${statusId}">FOO</span>`);

        window.behaviours.loadSecrets();
      });

      it('should update the status with expected message', () => {
        jQuery(`#${statusId}`).html().should.equal(expectedMessage);
      });
    });
  });
});
