给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

示例 1:

输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
示例 2:

输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 * 先序遍历。每一次将左节点或者有节点放入栈的时候，将其的值和父节点的值*10相加。然后当左右节点为空的时候，进行累加
 * 学习golang中
 */
func sumNumbers(root *TreeNode) int {
    var res int = 0
    if(root == nil){
        return res
    }
    var treeArr []*TreeNode = make([]*TreeNode, 0)

    treeArr = append(treeArr, root)
    for len(treeArr) > 0 {
        curNode := treeArr[len(treeArr) - 1]

        treeArr = treeArr[:len(treeArr) - 1]
        curValue := curNode.Val
        if curNode.Left != nil || curNode.Right != nil{
            if curNode.Left != nil {
                curNode.Left.Val += curValue * 10
                treeArr = append(treeArr, curNode.Left )
            }
            if curNode.Right != nil {
                curNode.Right.Val += curValue * 10
                treeArr = append(treeArr, curNode.Right )
            }
        }else {
            res += curValue
        }
    }
    return res
}
```