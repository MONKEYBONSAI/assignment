chai.should();

describe('add', function() {
  it('should return the sum of 1 + 2', function() {
    monkey.add(1, 2).should.equal(3);
  });
});

describe('subtract', function() {
  it('should return the difference of 5 - 1', function() {
    monkey.subtract(5, 1).should.equal(4);
  });
});