const assert = require('power-assert');

const {twoSum} = require('../../leetcode/0001_两数之和/two-sum');
const {addTwoNumbers} = require('../../leetcode/0002_两数相加/two-add');
const {lengthOfLongestSubstring} = require('../../leetcode/0003_无重复字符的最长子串/longest_length');
const {smile} = require('../../leetcode/0004_两个排序数组的中位数/action');
const {smile5} = require('../../leetcode/0005_最长回文子串/action');
const {convert, reverse, myAtoi, isPalindrome} = require('../../leetcode/0006-0099/action');


describe('letcode 0001_0050 test', function () {
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

    describe('leetcode 0003 无重复字符的最长子串', function () {
        it('should return 3', function () {
            assert.equal(3, lengthOfLongestSubstring('abcabcbb'));
        });

        it('should return 7', function () {
            assert.equal(7, lengthOfLongestSubstring('acsddeslldaewabcdef'));
        });
    });

    describe('leetcode 0004 数组中位数', function () {
        it('should return 3', function () {
            assert.equal(3, smile([1, 2, 3], [3, 4, 5]));
        });

        it('should return 2.5', function () {
            assert.equal(2.5, smile([1, 2], [3, 4]));
        });
    });

    describe('leetcode 0005 最长回文子串', function () {
        it('should return aba', function () {
            assert.equal('aba', smile5('abac'));
        });

        it('should return ranynar', function () {
            assert.equal('ranynar', smile5('civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth'));
        });
    });

    describe('leetcode 0006 z字形变换', function () {
        it('should return PAHNAPLSIIGYIR', function () {
            assert.equal('PAHNAPLSIIGYIR', convert('PAYPALISHIRING', 3));
        });

        it('should return PINALSIGYAHRPI', function () {
            assert.equal('PINALSIGYAHRPI', convert('PAYPALISHIRING', 4));
        });
    });

    describe('leetcode 0007 反转整数', function () {
        it('should return 123', function () {
            assert.equal(123, reverse(321));
        });

        it('should return -321', function () {
            assert.equal(-321, reverse(-123));
        });

        it('should return 0', function () {
            assert.equal(0, reverse(12132131231243423));
        });

        it('should return 123 by another method', function () {
            assert.equal(123, reverse(321, 1));
        });

        it('should return -321 by another method', function () {
            assert.equal(-321, reverse(-123, 1));
        });
    });

    describe('leetcode 0008 字符串转整数', function () {
        it('0008 should not throw err', function () {
            assert.equal(45, myAtoi(' 45'));
            assert.equal(-45, myAtoi('    -45'));
            assert.equal(4103, myAtoi('    4103 with you'));
            assert.equal(0, myAtoi('word with 4103'));
            assert.equal(-2147483648, myAtoi('-91283472332'));
            assert.equal(0, myAtoi('  -'));
            assert.equal(0, myAtoi(' '));
        });
        it('should not throw err by 00009', function () {
            assert.equal(true, isPalindrome(121));
            assert.equal(true, isPalindrome(1221));
            assert.equal(true, isPalindrome(12121));
            assert.equal(true, isPalindrome(1222222221));
            assert.equal(true, isPalindrome(0));
            assert.equal(false, isPalindrome(123));
            assert.equal(false, isPalindrome(-121));
        });
    });
});





