/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
    let temp = {};
    const length = nums.length;
    for (let i = 0; i < length; i++) {
        if (temp.hasOwnProperty(target - nums[i])) {
            return [temp[target - nums[i]], i];
        }
        temp[nums[i]] = i;
    }
    return null;
};

module.exports = {
    twoSum: twoSum
};


