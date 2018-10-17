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


module.exports = {
    convert: convert,
    reverse: reverse
};
