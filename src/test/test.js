
const sum = require('./sum');

test("adds a + b and sums",()=>{
    expect(sum(1,2)).toBe(3)
    expect(sum(3,2)).toBe(6)

})
