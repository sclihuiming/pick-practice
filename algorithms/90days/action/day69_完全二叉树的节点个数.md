# 222. 完全二叉树的节点个数

给出一个完全二叉树，求出该树的节点个数。

说明：

完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

示例:

```text
输入:
    1
   / \
  2   3
 / \  /
4  5 6

输出: 6
```

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/count-complete-tree-nodes>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
 // 递归
func countNodes(root *TreeNode) int {
    count := 0
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode){
        if node == nil{
            return
        }
        count++
        dfs(node.Left)
        dfs(node.Right)
    }
    dfs(root)
    return count
}
```

```golang

func countNodes(root *TreeNode) int {
    if root == nil{
        return 0
    }
    depth := countDepth(root)
    l, r := 0, powerf2(2, depth) - 1
    for l <= r{
        mid := l + (r - l) >> 1
        if exists(mid, depth, root){
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    // fmt.Println(depth, l)
    return powerf2(2, depth) - 1 + l
}

func countDepth(node *TreeNode)int{
    count := 0
    for node.Left != nil{
        count++
        node = node.Left
    }
    return count
}

func exists(target int, depth int, node *TreeNode) bool{
    l, r := 0, powerf2(2, depth) - 1
    for index := 0; index < depth; index++{
        mid := l + (r - l) >> 1
        if target <= mid{
            node = node.Left
            r = mid
        } else {
            node = node.Right
            l = mid + 1
        }
    }
    if node != nil{
        return true
    }
    return false
}

func powerf2(x int, n int) int {  
    if n == 0 {  
        return 1  
    } else {  
        return x * powerf2(x, n-1)  
    }  
}
```
