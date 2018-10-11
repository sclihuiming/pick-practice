/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function (s) {
    const judge = (str, left, right) => {
        let length = str.length;
        while (left >= 0 && right < length && str.charAt(left) === str.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    };


    let length = s.length;
    if (length === 0) {
        return '';
    }
    let start = 0, end = 0;
    for (let i = 0; i < length; i++) {
        let len1 = judge(s, i, i);//奇
        let len2 = judge(s, i, i + 1);//偶
        let max = Math.max(len1, len2);
        if (max > (end - start)) {
            start = i - Math.floor((max - 1) / 2);
            end = i + Math.floor(max / 2);
        }
    }
    return s.substring(start, end + 1);
};

//这个能够找到回文,但是效率太慢了
let miny = function (s) {
    let length = s.length;
    if (length === 0) {
        return '';
    }
    let str = '';
    for (let i = length; i > 0; i--) {
        let j = 0;
        while (j + i <= length) {
            let str = s.substr(j, i);

            let reverseStr = str.split('').reverse().join('');
            //检测是不是回文
            if (str === reverseStr) {
                return str
            }
            j++;
        }
    }
    return str;
};


module.exports = {
    smile5: longestPalindrome
};
