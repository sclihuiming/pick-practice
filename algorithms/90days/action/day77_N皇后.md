# 51.N皇后

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

```text

输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

提示：

* 皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一到七步，可进可退。（引用自 百度百科 - 皇后 ）

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/n-queens>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func solveNQueens(n int) [][]string {
    res := [][]string{}
    board := [][]string{}
    for index := 0; index < n; index++{
        tmp := []string{}
        for j := 0; j < n; j++{
            tmp = append(tmp, ".")
        }
        board = append(board, tmp)
    }

    var isValid func(row, col int) bool
    isValid = func(row, col int) bool{
        // 列是否冲突
        for index := 0; index < n; index++{
            if board[index][col] == "Q"{
                return false
            }
        }

        // 右上
        i, j := row - 1, col + 1;
        for  i >= 0 && j < n {
            if board[i][j] == "Q"{
                return false
            }
            i--
            j++
        }
        // 左上
        i, j = row - 1, col - 1;
        for  i >= 0 && j >=0{
            if board[i][j] == "Q"{
                return false
            }
            i--
            j--
        }
        return true
    }

    var backtrack func(row int)
    backtrack = func(row int){
        if row == n{
            tmp := []string{}
            for _, val := range board{
                tmp = append(tmp, strings.Join(val, ""))
            }
            res = append(res, tmp)
            return
        }
        for index := 0; index < n; index++{
            if !isValid(row, index){
                continue
            }
            board[row][index] = "Q"
            backtrack(row+1)
            board[row][index] = "."
        }
    }
    backtrack(0)
    return res
}
```
