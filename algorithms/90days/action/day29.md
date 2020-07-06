给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

[![img](https://camo.githubusercontent.com/f6eb01ec1b0576df85acdf7258ddefac415dc63b/68747470733a2f2f747661312e73696e61696d672e636e2f6c617267652f30303753385a496c6c7931676737777961796d70766a333062673034687438712e6a7067)](https://camo.githubusercontent.com/f6eb01ec1b0576df85acdf7258ddefac415dc63b/68747470733a2f2f747661312e73696e61696d672e636e2f6c617267652f30303753385a496c6c7931676737777961796d70766a333062673034687438712e6a7067)

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 感谢 Marcos 贡献此图。

示例:

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/trapping-rain-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number[]} height
 * @return {number}
 */
let trap = function (height) {
    let length = height.length;
    if (length < 3) {
        return 0;
    }
    
    let l = 0, r = length - 1, level = 0, area = 0;
    while (l < r) {
        let lower = height[(height[l] < height[r]) ? l++ : r--];
        level = Math.max(level, lower);
        area += level - lower;
    }

    return area;
};

```