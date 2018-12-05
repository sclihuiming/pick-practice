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


// console.log(multiply("123", "456"));
