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

  afterEach(() => {
    // Cleanup by removing elements from the DOM.
    jQuery(`#${textAreaId}`).remove();
    jQuery(`#${emailId}`).remove();
    localStorage.clear();
  });

  describe('behaviours - saveSecrets', () => {
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

  describe('behaviours - loadSecrets', () => {
    beforeEach(() => {
      jQuery('body').append(`<textarea id="${textAreaId}"></textarea>`);
      jQuery('body').append(`<input id="${emailId}" value="${email}">`);

      let e = window.monkey.encrypt(email, plainText);
      window.monkey.save(email, e);
      window.behaviours.loadSecrets();
    });

    it('should populate the textarea with expected plain text', () => {
      jQuery(`#${textAreaId}`).val().should.equal(plainText);
    });
  });
});