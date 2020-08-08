给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。

 

示例：
```
matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

返回 13。
```

提示：
你可以假设 k 的值永远是有效的，1 ≤ k ≤ n2 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func kthSmallest(matrix [][]int, k int) int {
    size := len(matrix)
    lo := &IntHeap{}
    heap.Init(lo)
    for i := 0; i < size; i++{
        for j := 0; j < size; j++{
            heap.Push(lo, matrix[i][j])
        }
    }

    for i := 1; i < k; i++{
        heap.Pop(lo)
    }
    x := heap.Pop(lo)
    return x.(int)
}

type IntHeap []int

func (h IntHeap) Len() int {
    return len(h)
}

func (h IntHeap) Less(i, j int) bool{
    return h[i] < h[j]
}

func (h IntHeap) Swap(i, j int){
    h[i], h[j] = h[j], h[i]
}

func (h *IntHeap) Push(i interface{}){
    *h = append(*h, i.(int))
}

func (h *IntHeap) Pop()interface{}{
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}
```






