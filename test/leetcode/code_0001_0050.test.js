const assert = require('power-assert');

const {twoSum} = require('../../leetcode/0001_两数之和/two-sum');

describe('leetcode 0001', function () {
    it('should return [0, 1]', function () {
        assert.deepEqual([0, 1], twoSum([2, 7, 11, 15], 9));
    });

    it('should return [4, 7]', function () {
        assert.deepEqual([4, 7], twoSum([2, 7, 11, 15, 22, 10, 13, 42, 99], 64));
    });
});
