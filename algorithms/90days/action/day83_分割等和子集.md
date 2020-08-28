# 416. 分割等和子集

给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
注意:

- 每个数组中的元素不会超过 100
- 数组的大小不会超过 200

示例 1:

```text
输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].
```

示例 2:

```text
输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/partition-equal-subset-sum>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func canPartition(nums []int) bool {
    sum := 0
    for _, num := range nums{
        sum += num
    }
    if sum % 2 != 0{
        return false
    }

    target := sum / 2
    dp := make([]bool, target + 1)
    dp[0] = true

    for index := 0; index < len(nums); index++{
        for j := target; j >= nums[index]; j--{
            if j - nums[index] >= 0{
                if !dp[j]{
                    dp[j] = dp[j - nums[index]]
                }
            }

        }
    }
    return dp[target]
}
```
