给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5   
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func sortedListToBST(head *ListNode) *TreeNode {
    // if head == nil {
    //     return nil
    // }
    return treeCreate(head, nil)
}

func treeCreate(head *ListNode, tail *ListNode) *TreeNode{
    if(head == tail){
        return nil
    }
    fast, slow := head, head
    for fast != tail && fast.Next != tail {
		slow = slow.Next
		fast = fast.Next.Next
	}
    left := treeCreate(head, slow)
    right := treeCreate(slow.Next, tail)
    root := &TreeNode{
        Val: slow.Val,
        Left: left,
        Right: right,
    }
    return root
}
```