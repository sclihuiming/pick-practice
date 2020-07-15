- [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
- [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
- [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
- 25 题 中“如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序“ 改为：”如果节点总数不是 k 的整数倍，那么请将最前面剩余的节点保持原有顺序“


## 206
```typescript

function reverseList(head: ListNode | null): ListNode | null {
    let preNode: ListNode|null = null;
    let curNode: ListNode|null = head;
    while (curNode){
        let nextNode: ListNode|null = curNode.next;
        curNode.next = preNode;
        preNode = curNode;
        curNode = nextNode;
    }
    return preNode
};
```

## 92

```golang
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, m int, n int) *ListNode {
    dummy := &ListNode{}
    dummy.Next = head
    preNode := dummy
    for i := 1; i < m; i++{
        preNode = preNode.Next
    }

    head = preNode.Next
    for i := m; i < n; i++{
        /* 
              1        2      3     4  5
            preNode  head   curNode
        ->    1  3  2 4  5
        */
        curNode := head.Next
        head.Next = curNode.Next
        curNode.Next = preNode.Next
        preNode.Next = curNode
    }

    return dummy.Next
}
```

## 25
先按照k分组反转，剩下的不够k大小的，再次翻转回来
```golang
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseKGroup(head *ListNode, k int) *ListNode {
    index := 1
    dummy := &ListNode{}
    dummy.Next = head
    preNode := dummy

    for head != nil && head.Next != nil{
        if index % k == 0{
            index = 0
            preNode = head
        }
        curNode := head.Next
        head.Next = curNode.Next
        curNode.Next = preNode.Next
        preNode.Next = curNode
        if index % k == 0 {
            head = head.Next
        }
        index++
    }
    if index > 0 && index != k  {
        head = preNode.Next
        for head != nil && head.Next != nil{
            curNode := head.Next
            head.Next = curNode.Next
            curNode.Next = preNode.Next
            preNode.Next = curNode
        }
    }
    // fmt.Println(preNode.Val, index)
    return dummy.Next
}

```