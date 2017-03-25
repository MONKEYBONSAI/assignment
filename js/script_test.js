/* global monkey */
chai.should(); // eslint-disable-line

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

  describe('fetch', () => {
    it('should get a string from localStorage', function () {
      localStorage.setItem('foo', 'bar');
      monkey.fetch('foo')
      .should
      .equal('bar');
    });
  });
});
