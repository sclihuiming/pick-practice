一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？
![!img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

例如，上图是一个7 x 3 的网格。有多少可能的路径？

 

示例 1:

输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。

向右 -> 向右 -> 向下
向右 -> 向下 -> 向右
向下 -> 向右 -> 向右
示例 2:
输入: m = 7, n = 3
输出: 28
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 10 ^ 9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func uniquePaths(m int, n int) int {
    // result := 0
    if m == 1 && n == 1{
        return 1
    }
    dp := make(map[string]int)
	var generate2 func(x int, y int) int
	generate2 = func(x int, y int) int {
        if value, ok:=dp[fmt.Sprintf("%v+%v", x, y)];ok{
            return value
        }
        r, b := 0, 0
		if x == m && y == n {
			return 1
		}
        if x <= m{
            r += generate2(x+1, y)
        }
        if y <= n{
            b += generate2(x, y+1)
        }
        dp[fmt.Sprintf("%v+%v", x, y)] = r + b
        return r + b
	}
	generate2(1, 1)
	return dp[fmt.Sprintf("%v+%v", 1, 1)]
}
```