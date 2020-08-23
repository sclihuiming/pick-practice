# 827. 最大人工岛

在二维地图上， 0代表海洋， 1代表陆地，我们最多只能将一格 0 海洋变成 1变成陆地。

进行填海之后，地图上最大的岛屿面积是多少？（上、下、左、右四个方向相连的 1 可形成岛屿）

示例 1:

```text
输入: [[1, 0], [0, 1]]
输出: 3
解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。
示例 2:

输入: [[1, 1], [1, 0]]
输出: 4
解释: 将一格0变成1，岛屿的面积扩大为 4。
示例 3:

输入: [[1, 1], [1, 1]]
输出: 4
解释: 没有0可以让我们变成1，面积依然为 4。
说明:

1 <= grid.length = grid[0].length <= 50
0 <= grid[i][j] <= 1
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/making-a-large-island>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
//暴力法 1.每次将0变成1的时候都计算面积
func largestIsland(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0{
        return 0
    }
    m, n := len(grid), len(grid[0])
    res := calArea(grid, m, n)
    for i := 0; i < m; i++{
        for j := 0; j < n; j++{
            if grid[i][j] == 0{
                grid[i][j] = 1
                tmp := calArea(grid, m, n)
                grid[i][j] = 0
                if tmp > res{
                    res = tmp
                }
            }
        }
    }
    return res
}

func calArea(grid [][]int, m, n int)int{
    res := 0
    tmp := 0
    var dfs func(x, y int)bool
    dfs = func(x, y int)bool{
        if x < 0 || x >= m || y <0 || y >= n || grid[x][y] != 1{
            return false
        }
        if grid[x][y] == 1{
            tmp += 1
            grid[x][y] = 2
            dfs(x - 1, y)
            dfs(x + 1, y)
            dfs(x, y - 1)
            dfs(x, y + 1)
        }
        return true
    }

    for i := 0; i < m; i++{
        for j := 0; j < n; j++{
            if grid[i][j] == 1{
                tmp = 0
                dfs(i, j)
                if tmp > res{
                    res = tmp
                }
            }
        }
    }
    for i := 0; i < m; i++{
        for j := 0; j < n; j++{
            if grid[i][j] == 2{
                grid[i][j] = 1
            }
        }
    }
    return res
}
```
