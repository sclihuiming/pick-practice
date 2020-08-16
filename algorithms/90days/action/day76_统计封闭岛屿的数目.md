# 1254 统计封闭岛屿的数目

有一个二维矩阵 grid ，每个位置要么是陆地（记号为 0 ）要么是水域（记号为 1 ）。

我们从一块陆地出发，每次可以往上下左右 4 个方向相邻区域走，能走到的所有陆地区域，我们将其称为一座「岛屿」。

如果一座岛屿 完全 由水域包围，即陆地边缘上下左右所有相邻区域都是水域，那么我们将其称为 「封闭岛屿」。

请返回封闭岛屿的数目。

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/07/sample_3_1610.png)

```text
输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
输出：2
解释：
灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
```

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/07/sample_4_1610.png)

```text
输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
输出：1
```

示例 3：

```text
输入：grid = [[1,1,1,1,1,1,1],
             [1,0,0,0,0,0,1],
             [1,0,1,1,1,0,1],
             [1,0,1,0,1,0,1],
             [1,0,1,1,1,0,1],
             [1,0,0,0,0,0,1],
             [1,1,1,1,1,1,1]]
输出：2
```

提示：

1. 1 <= grid.length, grid[0].length <= 100
2. 0 <= grid[i][j] <=1

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/number-of-closed-islands>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

> 先把跟边界连通的 0 变成 1 (或者其他占位符)，然后计算其他连通的 0 有多少组。

```golang
func closedIsland(grid [][]int) int {
    m := len(grid)
    n := len(grid[0])

    var outOfBoundary func(x, y int)bool
    outOfBoundary = func(x, y int)bool{
        if x < 0 || x >= m || y < 0 || y >= n{
            return true
        }
        return false
    }

    var mark func(x, y int)
    mark = func(x, y int){
        if outOfBoundary(x, y) || grid[x][y] == 1 {
            return
        }
        grid[x][y] = 1
        mark(x - 1, y)
        mark(x + 1, y)
        mark(x, y - 1)
        mark(x, y + 1)
    }

    var dfs func(x, y int) bool
    dfs = func(x, y int) bool{
        if outOfBoundary(x, y){
            return false
        }
        if grid[x][y] == 1{
            return true
        }
        grid[x][y] = 1

        if dfs(x - 1, y) && dfs(x + 1, y) && dfs(x, y - 1) && dfs(x, y + 1){
            return true
        }
        return false
    }

    for index := 0; index < m; index++{
        mark(index, 0)
        mark(index, n - 1)
    }

    for index := 0; index < n; index++{
        mark(0, index)
        mark(m - 1, index)
    }

    ans := 0
    for index := 0; index < m ;index++{
        for j := 0; j < n; j++{
            if grid[index][j] == 1{
                continue
            }
            if dfs(index, j){
                ans++
            }
        }
    }
    return ans
}
```
