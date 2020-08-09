# 34. 在排序数组中查找元素的第一个和最后一个位置

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:

```text
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

示例 2:

```text
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func searchRange(nums []int, target int) []int {
    size := len(nums)
    left, right := 0, size - 1
    res := []int{-1, -1}
    for left <= right{
        mid := left + (right - left) >> 1

        if target == nums[mid]{
            rightScore := mid
            for (mid - 1) >= left && target == nums[mid - 1]{
                mid--
            }
            for (rightScore+1) <= right && target == nums[rightScore + 1]{
                rightScore++
            }
            res[0] = mid
            res[1] = rightScore
            return res
        }else if nums[mid] < target{
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return res
}
```
