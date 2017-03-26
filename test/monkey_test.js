/* global monkey, window, chai */
chai.should();

describe('the current namespace', () => {
  it('should have monkey defined', () => {
    window.monkey.should.exist;
  });

  it('should have sjcl defined', () => {
    window.sjcl.should.exist;
  });
});

describe('the monkey', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  after(() => {
    localStorage.clear();
  });

  describe('save', () => {
    it('should put a string into localStorage', function () {
      monkey.save('foo', 'bar');
      localStorage.getItem('foo')
      .should
      .equal('bar');
    });
  });

  describe('load', () => {
    it('should get a string from localStorage', function () {
      localStorage.setItem('foo', 'bar');
      monkey.load('foo')
      .should
      .equal('bar');
    });
  });

  describe('encrypt', () => {
    it('should do some wierd stuff to the input string', () => {
      let password = 'slkdjfjcokjlckd';
      let input = 'foo bar baz';
      let encrypted = monkey.encrypt(password, input);
      encrypted.should.not.equal(input);
      encrypted.should.be.a('string');
      encrypted.should.not.be.empty;
    });
  });

  describe('encrypt/decrypt', () => {
    it('should return the original encrypted string', () => {
      let input = 'foo bar baz';
      let password = 'slkdjfjcokjlckd';

      let encrypted = monkey.encrypt(password, input);
      encrypted.should.not.equal(input);

      let decrypted = monkey.decrypt(password, encrypted);
      decrypted.should.equal(input);
    });
  });
});
