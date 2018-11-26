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
                continue;
            } else {//就是另一半不正常的
                high = middle - 1;
                continue;
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

// console.log(search([1], 1));

module.exports = {
    search: search
};
