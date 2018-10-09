/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
let findMedianSortedArrays = function (nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    //保证m<n
    if (m > n) {
        [nums1, nums2] = [nums2, nums1];
        [m, n] = [n, m];
    }

    let min = 0, max = m, halfNum = Math.floor((m + n + 1) / 2);
    while (min <= max) {
        let i = Math.floor((min + max) / 2);//向下取整

        let j = halfNum - i;
        if (i > min && nums1[i - 1] > nums2[j]) {
            max = max - 1;
        } else if (i < max && nums1[i] < nums2[j - 1]) {
            min = min + 1;
        } else {
            let maxLeft = 0;
            // console.log(i, j)
            if (i === 0) {
                maxLeft = nums2[j - 1];
            } else if (j === 0) {
                maxLeft = nums1[i - 1];
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
            }
            if ((m + n) % 2 === 1) {
                return maxLeft;
            }

            let minRight = 0;
            if (i === m) {
                minRight = nums2[j];
            } else if (j === n) {
                minRight = nums1[i];
            } else {
                minRight = Math.min(nums1[i], nums2[j]);
            }
            return (maxLeft + minRight) / 2;
        }
    }
    return 0.0;
};


module.exports = {
    smile: findMedianSortedArrays
};
