给定一个二叉树，在树的最后一行找到最左边的值。

示例 1:

输入:

    2
   / \
  1   3

输出:
1
示例 2:

输入:

        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7

输出:
7 

注意: 您可以假设树（即给定的根节点）不为 NULL。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-bottom-left-tree-value
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
func findBottomLeftValue(root *TreeNode) int {
    treeArr := make([]*TreeNode, 0)
    treeArr = append(treeArr, root)

    for len(treeArr) > 0 {
        root = treeArr[0]
        treeArr = treeArr[1:len(treeArr)]
        if root.Right != nil {
            treeArr = append(treeArr, root.Right)
        }
        if root.Left != nil {
            treeArr = append(treeArr, root.Left)
        }
    }
    return root.Val
}
```


