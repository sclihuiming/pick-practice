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

// console.log(searchInsert([1, 3, 5, 6], 8));

module.exports = {
    search: search,
    searchRange: searchRange
};
