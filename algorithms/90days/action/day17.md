根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
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

//用来存放中序数组中的映射管理 val->index
var treeMap map[int]int
func buildTree(preorder []int, inorder []int) *TreeNode {
    treeMap = make(map[int]int)

    for index, val := range inorder{
        treeMap[val] = index
    }

    return customBuildTree(preorder, inorder, 0, len(preorder) - 1, 0, len(inorder) - 1)
}

func customBuildTree(preorder []int, inorder []int, preorderStart, preorderEnd, inorderStart, inorderEnd int) *TreeNode {
    if preorderStart > preorderEnd{
        return nil
    }
    //根节点为前序数组中的第一个
    preorderRoot := preorderStart
    node := &TreeNode{preorder[preorderRoot], nil, nil}
    //找到root在中序数组中的序列
    index := treeMap[preorder[preorderRoot]]
    //中序数组中计算左子树的大小
    sizeInorderLeft := index - inorderStart

    node.Left = customBuildTree(preorder, inorder, preorderStart + 1, preorderStart + sizeInorderLeft, inorderStart, index - 1)
    node.Right = customBuildTree(preorder, inorder, preorderStart + sizeInorderLeft + 1, preorderEnd, index + 1, inorderEnd)
    
    return node
}


```