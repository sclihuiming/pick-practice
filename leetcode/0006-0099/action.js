/**
 * 0006题-z字形变换
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function (s, numRows) {
    if (numRows === 0) {
        return '';
    } else if (numRows === 1) {
        return s;
    }

    //init arrary
    let arr = [];
    for (let i = 0; i < numRows; i++) {
        arr.push([]);
    }
    let length = s.length;//字符串长度
    let loop = 2 * numRows - 2;//一个回合需要多少个字符
    for (let i = 0; i < length; i++) {
        let remainder = i % loop;

        if (remainder < numRows) {
            arr[remainder].push(s.charAt(i));
        } else {
            arr[loop - remainder].push(s.charAt(i));
        }
    }
    return arr.map(function (item) {
        return item.join('')
    }).join('');
};

/**
 * 0007题-反转整数
 * @param {number} x
 * @return {number} way 另一种实现方式
 */
let reverse = function (x, way) {
    const MAX_NUM = Math.pow(2, 31) - 1;
    const MIN_NUM = -Math.pow(2, 31);
    if (!way) {
        // if (x >= MAX_NUM || x <= MIN_NUM) {
        //     return 0;
        // }
        let positive = true; //默认为正数
        if (x < 0) {
            positive = false;
            // x = Math.abs(x);
        }
        // let reverse = [];
        let num = 0;
        while (x !== 0) {
            let rest = x % 10;
            if (positive) {
                x = Math.floor(x / 10);//正 向下取整
            } else {
                x = Math.ceil(x / 10); //负 向上取整
            }
            if ((num > Math.floor(MAX_NUM / 10) || (num === Math.floor(MAX_NUM / 10) && rest > 7)) || (num < Math.ceil(MIN_NUM / 10) || (num === Math.ceil(MIN_NUM / 10)) && rest < -8)) {
                return 0
            }
            num = num * 10 + rest;
        }
        return num;
    } else {
        //另一种方式
        let positive = true; //默认为正数
        if (x < 0) {
            positive = false;
            x = Math.abs(x);
        }
        let reverse = [];
        while (x > 0) {
            reverse.push(x % 10);
            x = Math.floor(x / 10);
        }
        let num = +reverse.join('');
        if (!positive) {
            num = 0 - num;
        }

        if (num > MAX_NUM || num < MIN_NUM) {
            return 0;
        }
        return num;
    }

};

/**
 * 0008 -字符串转整数(atoi)
 * @param {string} str
 * @return {number}
 */
let myAtoi = function (str) {
    let _num = parseInt(str) || 0; //parseInt就有这个功能
    if (_num < Math.pow(-2, 31)) {
        return Math.pow(-2, 31);
    } else if (_num > (Math.pow(2, 31) - 1)) {
        return Math.pow(2, 31) - 1;
    } else {
        return _num;
    }
};


/**
 * 第9题  回文数
 * @param {number} x
 * @return {boolean}
 */
let isPalindrome = function (x) {

    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    let num = 0;
    while (x > num) {
        num = num * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    return x === num || x === Math.floor(num / 10);
};

/**
 * 第10题 正则表达式匹配   - 递归
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch = function (s, p) {
    let sLen = s.length;
    // console.log(s, p)
    let pLen = p.length;

    //special case
    if (pLen === 0 && sLen === 0) {
        return true;
    }
    if (pLen === 1) {
        return (p === s || p === '.') && sLen === 1;
    }
    if (p.charAt(pLen - 1) !== '*' && p.charAt(pLen - 1) !== '.' && p.charAt(pLen - 1) !== s.charAt(sLen - 1)) {
        return false;
    }

    if (p.charAt(1) === '*') {//当第二个字符是*是时候
        while (s.length > 0 && (p.charAt(0) === s.charAt(0) || p.charAt(0) === '.')) {//当第一个字符匹配成功
            if (isMatch(s, p.substring(2))) {//递归后面的能不能成功,能成功的话,就不用再考虑第一次匹配的了
                return true;
            }
            s = s.substring(1);
        }
        return isMatch(s, p.substring(2));
    } else {
        if (sLen > 0 && (p.charAt(0) === s.charAt(0) || p.charAt(0) === '.')) {
            return isMatch(s.substring(1), p.substring(1));
        }
        return false;
    }
};

/**
 * 第11题  盛最多水的容器
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function (height) {
    let length = height.length;
    let area = 0;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {
            let hh = Math.min(height[i], height[j]);
            area = Math.max(area, hh * (j - i));
        }
    }
    return area;
};
//method two
let maxArea2 = function (height) {
    let area = 0, l = 0, r = height.length - 1;
    while (l < r) {
        area = Math.max(area, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }
    return area;
};

/**
 * 12题,整数转罗马数字
 * @param {number} num
 * @return {string}
 */
let intToRoman = function (num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]; //枚举出可以表示的特殊情况
    let romanWords = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let len = values.length;
    let res = [];
    for (let i = 0; i < len && num > 0; i++) {
        if (num < values[i]) {
            continue;
        }
        while (num >= values[i]) {
            num -= values[i];
            res.push(romanWords[i]);
        }
    }
    return res.join('');
};

/**
 * 13题 罗马字符转数字
 * @param {string} s
 * @return {number}
 */
let romanToInt = function (s) {
    let mapper = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    let res = 0;
    let front = 0;
    let len = s.length;
    for (let i = 0; i < len; i++) {
        let cur = mapper[s.charAt(i)];
        if (front > 0 && front < cur) {
            cur = cur - 2 * front;
            front = 0;
        }
        res += cur;
        front = cur;
    }
    return res;
};


module.exports = {
    convert: convert,
    reverse: reverse,
    myAtoi: myAtoi,
    isPalindrome: isPalindrome,
    isMatch: isMatch,
    maxArea: maxArea
};
