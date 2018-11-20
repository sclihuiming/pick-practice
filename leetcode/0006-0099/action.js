/**
 * 链表定义
 * @param val
 * @constructor
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}


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
    // let front = 0;
    let len = s.length;
    for (let i = 0; i < len; i++) {
        let cur = mapper[s.charAt(i)];
        res += cur;
        if (i > 0 && mapper[s.charAt(i - 1)] < cur) {
            res = res - 2 * mapper[s.charAt(i - 1)];
        }
    }
    return res;
};

/**
 * 14题 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function (strs) {
    if (!strs || strs.length === 0) { //数组为undefined或者为空时
        return '';
    }
    let len = strs.length;
    if (len === 1) { //只有一个数字元素时
        return strs[0];
    }
    let res = '';
    while (true) {
        let tag = '';
        let index = res.length;
        for (let i = 0; i < len; i++) {
            if (i === 0) {
                tag = strs[i].charAt(index);
                if (!tag) { //第一个元素是""时
                    return res;
                }
            } else {
                if (strs[i].charAt(index) !== tag) {
                    return res;
                }
            }
        }
        res += tag;
    }
};

/**
 * 15题  三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function (nums) {
    let sortNumber = function (a, b) {
        return a - b
    };
    let len = nums.length;
    if (len < 3) {
        return [];
    }
    let res = [];
    nums = nums.sort(sortNumber);
    for (let i = 0; i < len; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] <= 0) {
            let target = 0 - nums[i];
            let ln = i + 1, rn = len - 1;
            while (ln < rn) {
                let tempNum = nums[ln] + nums[rn];
                if (tempNum === target) {
                    res.push([nums[i], nums[ln], nums[rn]]);
                    while (ln < rn && nums[ln] === nums[ln + 1]) {
                        ln++;
                    }
                    while (ln < rn && nums[rn] === nums[rn - 1]) {
                        rn--;
                    }
                    ln++;
                    rn--;
                } else if (tempNum < target) {
                    ln++;
                } else if (tempNum > target) {
                    rn--;
                }
            }
        } else {
            break;
        }
    }
    return res;
};

/**
 * 16题  最接近的三数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let threeSumClosest = function (nums, target) {
    let sortNumber = function (a, b) {
        return a - b
    };
    let len = nums.length;
    if (len < 3) {
        return 0;
    }
    let res = Infinity;
    nums = nums.sort(sortNumber);
    for (let i = 0; i < len; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let ln = i + 1, rn = len - 1;
        while (ln < rn) {
            let tempNum = nums[ln] + nums[rn] + nums[i];
            if (tempNum === target) {
                return target;
            } else if (tempNum < target) {
                ln++;
            } else if (tempNum > target) {
                rn--;
            }
            if (Math.abs(tempNum - target) < Math.abs(res - target)) {
                res = tempNum;
            }
        }

    }
    return res;
};


/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function (digits) {
    let digui = function (newDigits, res, s) {
        if (!newDigits) {
            if (s) {
                res.push(s);
            }
            return res;
        }
        mapper[+(newDigits.charAt(0))].forEach(function (word) {
            digui(newDigits.substring(1), res, s + word);
        });
    };
    let mapper = [[], [],
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z']
    ];
    let len = digits.length;
    let res = [];
    if (digits === '') {
        return res;
    }
    digui(digits, res, '');
    return res;
};


/**
 * 18题  四数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
let fourSum = function (nums, target) {
    let sortNumber = function (a, b) {
        return a - b
    };
    let len = nums.length;
    if (len < 4) {
        return [];
    }
    let res = [];
    nums = nums.sort(sortNumber);

    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        for (let j = i + 1; j < len - 2; j++) {
            if (j !== i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            let tar = target - nums[i];
            let ln = j + 1, rn = len - 1;
            while (ln < rn) {
                let tempNum = nums[ln] + nums[rn] + nums[j];
                if (tempNum === tar) {
                    res.push([nums[i], nums[j], nums[ln], nums[rn]]);
                    while (ln < rn && nums[ln] === nums[ln + 1]) {
                        ln++;
                    }
                    while (ln < rn && nums[rn] === nums[rn - 1]) {
                        rn--;
                    }
                    ln++;
                    rn--;
                } else if (tempNum < tar) {
                    ln++;
                } else if (tempNum > tar) {
                    rn--;
                }
            }
        }
    }
    return res;
};

/**
 *  第19题  删除链表的倒数第N个节点
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function (head, n) {

    let temp = new ListNode(0);
    temp.next = head;
    let len = 0;
    let first = head;
    while (first) {
        len++;
        first = first.next;
    }
    len -= n;
    first = temp;
    while (len > 0) {
        len--;
        first = first.next;
    }
    first.next = first.next.next;
    return temp.next;
};

/**
 * 20题 有效的括号 --解法 数组模仿栈
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
    if (s === '') {
        return true;
    }
    let len = s.length;
    if (len % 2 === 1) {
        return false;
    }
    let mapper = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    let stack = [];

    for (let i = 0; i < len; i++) {
        let word = s.charAt(i);
        if (mapper[word]) {
            let popEle = stack.length > 0 ? stack.pop() : '*';
            if (popEle !== mapper[word]) {
                return false
            }
        } else {
            stack.push(word)
        }
    }
    return stack.length === 0;
};

/**
 * 21. 合并两个有序链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
let mergeTwoLists = function (l1, l2) {

    let newList = new ListNode(0);
    let temp = newList;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            temp.next = l1;
            l1 = l1.next;
        } else {
            temp.next = l2;
            l2 = l2.next;
        }
        temp = temp.next;
    }
    if (l1 !== null) {
        temp.next = l1;
    }
    if (l2 !== null) {
        temp.next = l2;
    }
    return newList.next;
};

/**
 * 22 括号生成
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function (n) {
    let generate = function (l, r, bracket, res, len) {
        if (l === len && r === len) {
            res.push(bracket);
        } else {
            if (l < len) {
                generate(l + 1, r, bracket + '(', res, len);
            }
            if (l > r && r < len) {//如果不加上l>r这个条件,会把所有的情况列举出来(包括不能构成完成括号的情况)
                generate(l, r + 1, bracket + ')', res, len);
            }
        }
    };

    let left = 0, right = 0;
    let res = [];
    generate(left, right, '', res, n);
    return res;
};

/**
 * 23题 合并n个链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeKLists = function (lists) {
    let head = new ListNode(0);
    let current = head;
    while (lists.length > 0) {
        if (lists.length === 1) {//如果只有一个
            current.next = lists[0];
            break;
        }
        let smallNumber;//存储最小的数
        let index = 0; //最小的数是属于元素的下标
        for (let i = 0; i < lists.length; i++) {
            if (lists[i]) {
                if (smallNumber === undefined) {//如果第一次,就赋值
                    smallNumber = lists[i]['val'];
                    index = i;
                } else if (smallNumber > lists[i]['val']) {
                    smallNumber = lists[i]['val'];
                    index = i;
                }
            }
        }
        if (lists[index]) {
            current.next = lists[index];
            lists[index] = lists[index]['next'];
            if (!lists[index]) {
                lists.splice(index, 1);//将null值去掉
            }
            current = current.next;
        } else {
            lists.splice(index, 1)
        }
    }
    return head.next ? head.next : [];//实在不知道如果不匹配返回什么了,就返回[]了
};


/**
 * 24 题两两交换链表中的节点
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let swapPairs = function (head) {
    if (!head) {
        return [];
    }
    if (!head.next) {
        return head;
    }
    let res = new ListNode(0);
    let temp = res;
    let first = head;
    let second = first.next;

    while (first && second) {
        first.next = second.next;
        second.next = first;
        temp.next = second;

        temp = temp.next.next;
        first = first.next;
        if (first) {
            second = first.next;
        }
    }
    if (first) {
        temp.next = first;
    }
    return res.next;
};


/**
 * 25题 k个一组翻转链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let reverseKGroup = function (head, k) {
    if (!head) {
        return [];
    }
    if (k === 1) {
        return head;
    }

    if (head.next) {
        return head;
    }
    // if (!head.next) {
    //     return head;
    // }

    let index = 0;
    let res = new ListNode(0);//新的list
    let current = res;
    let pointList = head; //指针
    let tempListDesc = new ListNode(0);//以k分段的list变量

    while (pointList) {
        index++;//个数
        let desc = tempListDesc.next;
        tempListDesc.next = pointList; //每次新来的都放在tempListDesc的第1个位置处
        pointList = pointList.next; //先移动指针,才能避免bug
        tempListDesc.next.next = desc;

        if (current.next) {
            current = current.next;
        }

        if (index % k === 0) {
            current.next = tempListDesc.next;
            current = current.next;
            tempListDesc = new ListNode(0);
        }
        if (!pointList && (index % k !== 0)) {
            while (current.next) {
                current = current.next;
            }
            let rest = tempListDesc.next;
            while (rest) { //将剩余的不够k个的逆序的反转成原序列
                let asc = current.next;
                current.next = rest;
                rest = rest.next;
                current.next.next = asc;
            }
        }
    }
    return res.next;
};

/**
 * 26. 删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function (nums) {
    let len = nums.length;
    let index = 0;

    for (let i = 0; i < len; i++) {
        if (nums[i] !== nums[i + 1]) {
            nums[index + 1] = nums[i + 1];
            index++;
        }
    }
    return index;
};

/**
 * 27. 移除元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
let removeElement = function (nums, val) {
    let len = nums.length;
    let index = 0;

    while (index < len) {
        if (nums[index] === val) {
            nums[index] = nums[len - 1];
            len--;
        } else {
            index++;
        }
    }
    return index;
};

/**
 * 28 实现strStr()
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
let strStr = function (haystack, needle) {
    let length = haystack.length;
    let needleLength = needle.length;
    if (needleLength === 0) {
        return 0
    } else if (length < needleLength) {
        return -1;
    }

    for (let i = 0; i <= length - needleLength; i++) {
        let flag = true;
        for (let j = 0; j < needleLength; j++) {
            if (haystack.charAt(i + j) !== needle.charAt(j)) {
                flag = false;
                break;
            }
        }
        if (flag) {
            return i;
        }
    }

    return -1;
};


// console.log(strStr("a", "a"))


module.exports = {
    convert: convert,
    reverse: reverse,
    myAtoi: myAtoi,
    isPalindrome: isPalindrome,
    isMatch: isMatch,
    maxArea: maxArea,
    romanToInt: romanToInt,
    longestCommonPrefix: longestCommonPrefix,
    threeSum: threeSum,
    threeSumClosest: threeSumClosest,
    letterCombinations: letterCombinations,
    fourSum: fourSum,
    removeNthFromEnd: removeNthFromEnd,
    isValid: isValid,
    mergeTwoLists: mergeTwoLists,
    generateParenthesis: generateParenthesis,
    mergeKLists: mergeKLists,
    swapPairs: swapPairs,
    reverseKGroup: reverseKGroup,
    removeDuplicates: removeDuplicates,
    removeElement: removeElement
};
