二叉树的遍历绝对是一个非常热门的题目。 有的直接让你进行遍历，有的则是你必须对其进行遍历才能继续下去。 因此掌握各种遍历方式以及花式技巧是很有必要的。

比如我们说的 DFS， BFS， 回溯等都是非常直接的遍历。如果你充分掌握了二叉树的遍历，再去看图的遍历就会很容易。大家加油，一起攻破基础吧！

- [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/) (迭代和递归)
- [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/?utm_source=LCUS&utm_medium=ip_redirect_q_uns&utm_campaign=transfer2china)(迭代和递归)
- [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/)(迭代和递归)
- [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/)(迭代和递归)

扩展：

- 如果是 N 叉树呢？
- 你能使用 $O(1)$ 空间完成吗？


144. 二叉树的前序遍历 (迭代和递归)
```golang
//迭代
func preorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    if root == nil{
        return result
    }
    stack := make([]*TreeNode, 0)
    stack = append(stack, root)
    for len(stack) > 0{
        count := len(stack)
        curNode := stack[count - 1]
        stack = stack[:count - 1]
        result  = append(result, curNode.Val)
        if curNode.Right != nil {
            stack = append(stack, curNode.Right)
        }
        if curNode.Left != nil {
            stack = append(stack, curNode.Left)
        }
    }
    return result
}

// 递归
func preorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    if root == nil{
        return result
    }
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode){
        if node == nil{
            return 
        }
        result = append(result, node.Val)
        if node.Left != nil{
            dfs(node.Left)
        }
        if node.Right != nil{
            dfs(node.Right)
        }
    }
    dfs(root)
    return result
}
```

94. 二叉树的中序遍历(迭代和递归)

```golang
//递归
func inorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    var dfs func(root *TreeNode);
    dfs = func(root *TreeNode){
        if root == nil{
            return
        }
        dfs(root.Left)
        result = append(result, root.Val)
        dfs(root.Right)
    }
    dfs(root)
    return result
}

//迭代

func inorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    stack := make([]*TreeNode, 0)
    if root != nil{
        stack = append(stack, root)
    }

    for len(stack) > 0{
        count := len(stack)
        curNode := stack[count - 1]
        stack = stack[:count - 1]
        if curNode != nil{
            if curNode.Right != nil{
                stack = append(stack, curNode.Right)
            }
            stack = append(stack, curNode, nil) // nil是标志位
            if curNode.Left != nil{
                stack = append(stack, curNode.Left)
            }
        } else {
            num := len(stack)
            realNode := stack[num - 1]
            stack = stack[:num - 1]
            result = append(result, realNode.Val)
        }
    }
    return result
}

```
145. 二叉树的后序遍历(迭代和递归)
```golang
//递归
func postorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    var dfs func(root *TreeNode)
    dfs = func(root *TreeNode){
        if root == nil{
            return
        }
        dfs(root.Left)
        dfs(root.Right)
        result = append(result, root.Val)
    }
    dfs(root)
    return result
}

//迭代

func postorderTraversal(root *TreeNode) []int {
    result := make([]int, 0)
    stack := make([]*TreeNode, 0)
    if root != nil{
        stack = append(stack, root)
    }
    for len(stack) > 0 {
        size := len(stack)
        curNode := stack[size - 1]
        stack = stack[:size - 1]
        if curNode != nil{
            stack = append(stack, curNode, nil)
            if curNode.Right != nil{
                stack = append(stack, curNode.Right)
            }
            if curNode.Left != nil{
                stack = append(stack, curNode.Left)
            }
        } else {
            sizeNum := len(stack)
            realNode := stack[sizeNum - 1]
            stack = stack[:sizeNum - 1]
            result = append(result, realNode.Val)
        }
    }
    return result
}

```

102. 二叉树的层序遍历(迭代和递归)
```golang
// 迭代
func levelOrder(root *TreeNode) [][]int {
    result := [][]int{}
    if root == nil{
        return result
    }
    queue := []*TreeNode{root}
    for len(queue) > 0{
        size := len(queue)
        lineRes := []int{}
        for index := 0; index < size; index++{
            curNode := queue[0]
            queue = queue[1:]
            lineRes = append(lineRes, curNode.Val)
            if curNode.Left != nil{
                queue = append(queue, curNode.Left)
            }
            if curNode.Right != nil{
                queue = append(queue, curNode.Right)
            }
        }
        result = append(result, lineRes)
    }
    return result
}

// 递归

func levelOrder(root *TreeNode) [][]int {
    result := [][]int{}
    if root == nil{
        return result
    }

    var dfs func(node *TreeNode, level int)
    dfs = func(node *TreeNode, level int){
        if node == nil{
            return
        }
        if len(result) == level{
            result = append(result, []int{})
        }
        result[level] = append(result[level], node.Val)
        dfs(node.Left, level + 1)
        dfs(node.Right, level + 1)
    }
    dfs(root, 0)
    return result
}

```
