# 4. 寻找两个正序数组的中位数

给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:

```text
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

示例 2:

```text
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/median-of-two-sorted-arrays>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处

```golang
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    m, n := len(nums1), len(nums2)
    if m > n{
        m, n = n, m
        nums1, nums2 = nums2, nums1
    }

    lo, hi, halfNum := 0, m, (m + n + 1) >> 1
    for lo <= hi{
        i := lo + (hi - lo) >> 1
        j := halfNum - i
        if i > lo && nums1[i - 1] > nums2[j]{
            hi = i - 1
        } else if i < hi && nums1[i] < nums2[j - 1]{
            lo = i + 1
        } else {
            maxLeft := 0
            if i == 0{
                maxLeft = nums2[j - 1]
            } else if j == 0{
                maxLeft = nums1[i - 1]
            } else {
                maxLeft = max(nums1[i - 1], nums2[j - 1])
            }
            if (m + n) % 2 == 1{
                return float64(maxLeft)
            }
            
            minRight := 0
            if i == m{
                minRight = nums2[j]
            } else if j == n{
                minRight = nums1[i]
            } else {
                minRight = min(nums1[i], nums2[j])
            }
            // fmt.Println(nums1[i], nums2[j],minRight, maxLeft)
            return float64(maxLeft + minRight) / 2
        }
    }
    return 0.0
}
func max (i, j int) int{
    if i > j{
        return i
    }
    return j
}

func min(i, j int) int {
    if i > j{
        return j
    }
    return i
}
```
