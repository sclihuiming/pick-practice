const assert = require('power-assert');

const {twoSum} = require('../../leetcode/0001_两数之和/two-sum');
const {addTwoNumbers} = require('../../leetcode/0002_两数相加/two-add');

describe('leetcode 0001 two-sum', function () {
    it('should return [0, 1]', function () {
        assert.deepEqual([0, 1], twoSum([2, 7, 11, 15], 9));
    });

    it('should return [4, 7]', function () {
        assert.deepEqual([4, 7], twoSum([2, 7, 11, 15, 22, 10, 13, 42, 99], 64));
    });
});

describe('leetcode 0002 two-number-add', function () {
    it('should return [7, 0, 8]', function () {
        let l1 = {
            val: 2,
            next: {val: 4, next: {val: 3, next: null}}
        };
        let l2 = {
            val: 5,
            next: {val: 6, next: {val: 4, next: null}}
        };


        assert.deepEqual([7, 0, 8], addTwoNumbers(l1, l2));
    });

    it('should return [6,6,4,1]', function () {
        let l1 = {"val": 1, "next": {"val": 0, "next": {"val": 0, "next": {"val": 1, "next": null}}}};
        let l2 = {"val": 5, "next": {"val": 6, "next": {"val": 4, "next": null}}};


        assert.deepEqual([6, 6, 4, 1], addTwoNumbers(l1, l2));
    });
});
