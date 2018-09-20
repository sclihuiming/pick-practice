/**
 * @param {string} s 自己写的
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
    //从头开始验证是否有重复字符串
    function checkRepeat(str) {
        return /^.*(.).*\1/.test(str);
    }

    let length = s.length;
    let longest = 0;
    let finish = false;
    for (let i = length; i > 0; i--) {
        let j = 0;
        while (j + i <= length) {
            let str = s.substr(j, i);
            if (!checkRepeat(str)) {
                longest = str.length;
                finish = true;
                break;
            }
            j++;
        }
        if (finish) {
            break;
        }
    }
    return longest;
};

/**
 * 参考解答思路写的
 * @param s
 */
let lengthLongestOne = function (s) {
    let set = new Set();
    let length = s.length;
    let longest = 0, i = 0, j = 0;
    while (i < length && j < length) {
        if (!set.has(s.charAt(j))) {
            set.add(s.charAt(j++));
            longest = Math.max(longest, j - i);
        } else {
            set.delete(s.charAt(i++));
        }
    }
    return longest;
};


//use map
let lengthLongestTwo = function (s) {
    let map = new Map();
    let length = s.length, longest = 0;

    for (let i = 0, j = 0; j < length; j++) {
        if (map.has(s.charAt(j))) {
            i = Math.max(map.get(s.charAt(j)), i);
        }
        longest = Math.max(longest, j-i+1);
        map.set(s.charAt(j), j+1);
    }
    return longest;
};


module.exports = {
    lengthOfLongestSubstring: lengthOfLongestSubstring
};




