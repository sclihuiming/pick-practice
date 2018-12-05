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


// console.log(countAndSay(6));
