/**
 * 33. 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let search = function (nums, target) {
    let low = 0;
    let high = nums.length - 1;
    if (nums.length === 0) {
        return -1
    }

    while (low <= high) {
        let middle = Math.floor((low + high) / 2);
        if (target === nums[middle]) {
            return middle;
        }
        if (nums[low] <= nums[middle]) {//正常的
            if (target >= nums[low] && target <= nums[middle]) {
                high = middle - 1;
                continue;
            } else {//就是另一半不正常的
                low = middle + 1;
                continue;
            }
        }

        if (nums[middle] <= nums[high]) {//正常的
            if (target >= nums[middle] && target <= nums[high]) {
                low = middle + 1;
            } else {//就是另一半不正常的
                high = middle - 1;
            }
        }

        // if (nums[low] > nums[middle]) {//非正常的
        //     high = middle - 1;
        //     continue;
        // }
        //
        // if (nums[middle] > nums[high]) {//非正常的
        //     low = middle + 1;
        //     continue;
        // }
    }
    return -1;
};

/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let searchRange = function (nums, target) {
    let low = 0;
    let high = nums.length - 1;
    if (high === -1) {
        return [-1, -1];
    }

    while (low <= high) {
        let middle = Math.floor((low + high) / 2);
        if (target === nums[middle]) {
            let tmpMid = middle;

            while ((middle - 1) >= low && target === nums[middle - 1]) {
                middle--;
            }
            while ((tmpMid + 1) <= high && target === nums[tmpMid + 1]) {
                tmpMid++;
            }
            return [middle, tmpMid];
        } else if (target < nums[middle]) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
    return [-1, -1];
};

/**
 * 35. 搜索插入位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let searchInsert = function (nums, target) {
    let low = 0;
    let high = nums.length - 1;
    if (high === -1) {
        return 0;
    }
    while (low <= high) {
        let middle = Math.floor((low + high) / 2);
        if (target === nums[middle]) {
            return middle;
        } else if (target < nums[middle]) {
            high = middle - 1;
        } else {
            low = middle + 1;
        }
    }
    let middle = Math.floor((low + high) / 2);
    if (target < nums[middle]) {
        return middle;
    } else if (target > nums[middle]) {
        return ++middle;
    }
    return 0;
};

/**
 * 39. 组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let combinationSum = function (candidates, target) {
    function backtrade(candidates, start, target, item, res) {
        if (target < 0) {
            return;
        }
        if (target === 0) {
            res.push(Object.assign([], item));
            return
        }
        for (let i = start; i < candidates.length; i++) {
            item.push(candidates[i]);
            backtrade(candidates, i, target - candidates[i], item, res);
            item.pop();
        }
    }

    let item = [];
    let res = [];
    backtrade(candidates, 0, target, item, res);
    return res;
};

/**
 *40. 组合总和 II
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let combinationSum2 = function (candidates, target) {
    function backtrade(candidates, start, target, item, res) {
        if (target < 0) {
            return;
        }
        if (target === 0) {
            res.push(Object.assign([], item));
            return
        }
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }
            if (target > 0) {
                item.push(candidates[i]);
                backtrade(candidates, i + 1, target - candidates[i], item, res);
                item.pop();
            } else {
                return
            }

        }
    }

    function sortNumber(a, b) {
        return a - b;
    }

    let item = [];
    let res = [];
    candidates.sort(sortNumber);
    // console.log(candidates)
    backtrade(candidates, 0, target, item, res);
    return res;
};

/**
 *41. 缺失的第一个正数
 * @param {number[]} nums
 * @return {number}
 */
let firstMissingPositive = function (nums) {
    let length = nums.length;
    if (length === 0) {
        return 1;
    }
    let min = 1;
    let lastEqualPos = -1;
    //每次min增长后i都从0重新开始循环
    for (let i = 0; i < length; i++) {
        if (nums[i] === min) {
            min++;
            if (lastEqualPos === -1 && i === 0) {
                lastEqualPos = i;
            } else {
                i = lastEqualPos;
            }
        }
    }
    return min;
};

/**
 * 42. 接雨水
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

/**
 * 45. 跳跃游戏 II
 * @param {number[]} nums
 * @return {number}
 */
let jump = function (nums) {
    if (nums.length <= 1) {
        return 0
    }
    let index = 0, count = 0;
    while (index < nums.length) {
        if ((index + nums[index]) >= (nums.length - 1)) {
            count++;
            break;
        }
        let max = index;
        for (let j = index + 1; j <= index + nums[index]; j++) {
            if ((nums[max] + max) < (nums[j] + j)) {
                max = j;
            }
        }
        index = max;
        count++;
    }
    return count;
};

/**
 * 48. 旋转图像
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let rotate = function (matrix) {
    let len = matrix.length;
    for (let i = 0; i < len / 2; i++) {//控制交换次数
        let start = i;
        let end = len - i - 1;
        for (let j = 0; j < end - start; j++) { // 交换
            // console.log(start, start + j, end - j,)
            let temp = matrix[start][start + j];
            //[0][0] => [2][0]
            matrix[start][start + j] = matrix[end - j][start];
            //[2][0] => [2][2]
            matrix[end - j][start] = matrix[end][end - j];
            //[2][2] => [0][2]
            matrix[end][end - j] = matrix[start + j][end];
            // [0][2] = [0][0]
            matrix[start + j][end] = temp;
        }
    }
};

/**
 * 53. 最大子序和
 * @param {number[]} nums
 * @return {number}
 */
let maxSubArray = function (nums) {
    if (nums.length === 0) {
        return 0;
    }
    let res = nums[0];
    let sum = 0;
    for (let num of nums) {
        if (sum > 0)
            sum += num;
        else
            sum = num;
        res = Math.max(res, sum);
    }
    return res;
};


// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

module.exports = {
    search: search,
    searchRange: searchRange,
    searchInsert: searchInsert,
    combinationSum: combinationSum,
    combinationSum2: combinationSum2,
    firstMissingPositive: firstMissingPositive,
    trap: trap,
    jump: jump,
    rotate: rotate

};
