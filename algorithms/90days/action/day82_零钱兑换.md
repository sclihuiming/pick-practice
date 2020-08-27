# 322. 零钱兑换

给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示例 1:

```text
输入: coins = [1, 2, 5], amount = 11
输出: 3
解释: 11 = 5 + 5 + 1
```

示例 2:

```text
输入: coins = [2], amount = 3
输出: -1
```

说明:

- 你可以认为每种硬币的数量是无限的。

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/coin-change>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func coinChange(coins []int, amount int) int {
    dict := map[int]int{}
    var dp func(n int) int
    dp = func(n int) int {
        if _, ok := dict[n]; ok{
            return dict[n]
        }
        if n == 0 {
            return 0
        } else if n < 0{
            return -1
        }
        res := int(^uint(0) >> 1)
        for _, coin := range coins{
            subproblem := dp(n - coin)
            if subproblem == -1{
                continue
            }
            res = min(res, 1 + subproblem)
        }
        if res == int(^uint(0) >> 1){
            dict[n] = -1
        } else {
            dict[n] = res
        }
        return dict[n]
    }
    return dp(amount)
}

func min(a, b int) int{
    if a < b{
        return a
    }
    return b
}
```

```golang
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount + 1)
    for index, _ := range dp{
        dp[index] = int(^uint(0) >> 1) - 1
    }
    dp[0] = 0
    for _, coin := range coins{
        for index := coin; index <= amount; index++{
            dp[index] = min(dp[index], dp[index - coin] + 1)
        }
    }
    if dp[amount] == (int(^uint(0) >> 1) - 1){
        return -1
    } else {
        return dp[amount]
    }
}

func min(a, b int) int{
    if a < b{
        return a
    }
    return b
}
```
