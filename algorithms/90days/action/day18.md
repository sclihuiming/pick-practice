给定一个非空二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

示例 1:

输入: [1,2,3]

       1
      / \
     2   3

输出: 6
示例 2:

输入: [-10,9,20,null,null,15,7]

   -10
   / \
  9  20
    /  \
   15   7

输出: 42
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/binary-tree-maximum-path-sum
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

var maxNum int = 0

func maxPathSum(root *TreeNode) int {
    maxNum = root.Val
    pathSum(root)
    return maxNum
}

func pathSum(root *TreeNode) int {
    if root == nil{
        return 0
    }
    leftValue := pathSum(root.Left)
    rightValue := pathSum(root.Right)

    num1 := root.Val
    num2 := root.Val + leftValue 
    num3 := root.Val + rightValue
    num4 := root.Val + leftValue + rightValue

    // 当前节点为根节点来计算
    if num1 > maxNum{
        maxNum = num1
    }
    if num2 > maxNum {
        maxNum = num2
    }
    if num3 > maxNum{
        maxNum = num3
    }
    if num4 > maxNum{
        maxNum = num4
    }
    // 当前节点为子节点，不可能同时加上 它的2个子节点
    maxValue := num1
    if num2 > maxValue {
        maxValue = num2
    }
    if num3 > maxValue{
        maxValue = num3
    }
    return maxValue
}
```