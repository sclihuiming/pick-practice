# 130. 被围绕的区域

给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

示例:

```text
X X X X
X O O X
X X O X
X O X X
```

运行你的函数后，矩阵变为：

```text
X X X X
X X X X
X X X X
X O X X
```

解释:

- 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/surrounded-regions>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func solve(board [][]byte)  {
    m := len(board)
    if m == 0{
        return
    }
    n := len(board[0])
    if n == 0{
        return
    }

    var dfs func(x, y int)
    dfs = func(x, y int) {
        if x < 0 || x >= m || y < 0 || y >= n || string(board[x][y]) != "O"{
            return
        }
        board[x][y] = []byte("A")[0]
        dfs(x + 1, y)
        dfs(x - 1, y)
        dfs(x, y + 1)
        dfs(x, y - 1)
    }

    for index := 0; index < m; index++{
        dfs(index, 0)
        dfs(index, n - 1)
    }
    for index := 0; index < n; index++{
        dfs(0, index)
        dfs(m - 1, index)
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++{
            if string(board[i][j]) == "A"{
                board[i][j] = []byte("O")[0]
            } else if string(board[i][j]) == "O"{
                board[i][j] = []byte("X")[0]
            }
        }
    }
}
```
