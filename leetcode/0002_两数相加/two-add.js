/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param  l1
 * @param  l2
 * @return {Array}
 */
let addTwoNumbers = function (l1, l2) {
    let l1Temp = [];
    let l2Temp = [];
    let current = l1;
    while (current) {
        l1Temp.push(current.val);
        current = current.next;
    }
    current = l2;
    while (current) {
        l2Temp.push(current.val);
        current = current.next;
    }
    let l1tempLength = l1Temp.length;
    let l2tempLength = l2Temp.length;
    let baseLength = l1tempLength > l2tempLength ? l2tempLength : l1tempLength;
    let result = l1tempLength > l2tempLength ? l1Temp : l2Temp;

    for (let i = 0; i < baseLength; i++) {
        result[i] = (+l1Temp[i] + (+l2Temp[i]));
    }
    let resLength = result.length;
    for (let i = 0; i < resLength; i++) {
        if (result[i] > 9) {
            result[i] = result[i] - 10;
            result[i + 1] = (result[i + 1] || 0) + 1;
        }
    }
    return result;
};

/**
 * 看了官方示例写出来的,但是通不过验证,好像是需要数组的返回
 * @param l1
 * @param l2
 * @returns {null}
 */
let addTwoNumbersSuper = function (l1, l2) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    let listHead = new ListNode('head');
    let m = l1;
    let n = l2;
    let current = listHead;
    let weight = 0;

    while (m || n) {
        let i = m ? +m.val : 0;
        let j = n ? +n.val : 0;
        let sum = i + j + weight;
        weight = weight / 10;
        current.next = new ListNode(sum % 10);
        current = current.next;
        if (m) {
            m = m.next;
        }
        if (n) {
            n = n.next;
        }
    }
    if (weight) {
        current.next = new ListNode(weight);
    }
    return listHead.next;
};


module.exports = {
    addTwoNumbers: addTwoNumbers
};
