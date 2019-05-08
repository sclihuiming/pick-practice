/**
 * 38. 报数
 * @param {number} n
 * @return {string}
 */
let countAndSay = function (n) {
    let res = '1';
    for (let i = 1; i < n; i++) {
        let temp = res.charAt(0);
        let num = 0;
        let s = '';
        for (let j = 0; j < res.length; j++) {
            if (temp === res.charAt(j)) {
                num++;
            } else {
                s += ('' + num + temp);
                temp = res.charAt(j);
                num = 1;
            }
        }
        s += ('' + num + temp);
        res = s;
        s = '';
    }
    return res;
};

/**
 *43. 字符串相乘
 * @param {string} num1
 * @param {string[]} num2
 * @return {string}
 */
let multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') {
        return "0";
    }
    let stash = new Array(num1.length + num2.length);
    for (let i = 0; i < stash.length; i++) {
        stash[i] = 0;
    }
    num1 = num1.split("").reverse();
    num2 = num2.split("").reverse();
    for (let i = 0; i < num1.length; i++) {
        for (let j = 0; j < num2.length; j++) {
            stash[i + j] += num1[i] * num2[j];
        }
    }
    let carry = 0;
    let res = '';
    for (let i = 0; i < stash.length; i++) {
        stash[i] += carry;
        carry = Math.floor(stash[i] / 10);
        stash[i] = stash[i] % 10;
    }
    res = stash.reverse().join('');
    //清除头部的多余的0
    let index = -1;
    for (let i = 0; i < res.length; i++) {
        if (res.charAt(i) === '0') {
            index = i;
        } else {
            break;
        }
    }
    if (index >= 0) {
        res = res.substr(index + 1);
    }
    return res;
};


/**
 * 44. 通配符匹配 ->去学习动态规划和贪婪算法
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
let isMatch = function (s, p) {
    //starj记录上一个"*"的位置
    //match记录与"*"匹配的i的位置(与starj不同的是，每次回溯，match自增)
    let i = 0, j = 0, starj = -1, match = 0;

    while (i < s.length) {
        //字符相等或者p.charAt(j) == '?'
        if (j < p.length && (s.charAt(i) === p.charAt(j) || p.charAt(j) === '?')) {
            i++;
            j++;
        } else if (j < p.length && p.charAt(j) === '*') { //遇到'*', 记录'*'的位置，并记录starj和match
            starj = j;
            j++;
            match = i;
        } else if (starj !== -1) {
            //不是上述两种情况，无法匹配，因此回溯
            //注意，若出现第二个'*'， 会对之前的覆盖，因为已经不需要用之前的"*"进行回溯了
            j = starj + 1;
            match++;
            i = match;
        } else {//其他情况， 直接返回false
            return false;
        }
    }
    //清除'*'
    while (j < p.length && p.charAt(j) === '*') j++;
    //若p清空，说明匹配
    return j === p.length;
};
//
// console.log(isMatch("bbbaaabaababbabbbaabababbbabababaabbaababbbabbbabb", "*b**b***baba***aaa*b***"));
// console.log(isMatch("abceb", "*a*b"));
// console.log(isMatch("aa", "a*"));
