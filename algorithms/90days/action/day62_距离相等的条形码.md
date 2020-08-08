
在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]

请你重新排列这些条形码，使其中两个相邻的条形码 不能 相等。 你可以返回任何满足该要求的答案，此题保证存在答案。

示例 1：

```text
输入：[1,1,1,2,2,2]
输出：[2,1,2,1,2,1]
```

示例 2：

```text
输入：[1,1,1,1,2,2,3,3]
输出：[1,3,1,3,2,1,2,1]
```

提示：

1. 1 <= barcodes.length <= 10000
2. 1 <= barcodes[i] <= 10000

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/distant-barcodes>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
func rearrangeBarcodes(barcodes []int) []int {
    counterMap := make(map[int]int)
    for _, num := range barcodes{
        counterMap[num]++
    }
    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    for key, elem := range counterMap{
        n := NumUse{key, elem}
        heap.Push(maxHeap, n)
    }
    size := len(barcodes)
    res := make([]int, size)
    index := 0
    for len(*maxHeap) > 0{
        numUse := heap.Pop(maxHeap).(NumUse)
        value, count := numUse.Value, numUse.Count
        for count > 0{
            res[index] = value
            index += 2
            count--
            if index >= size{
                index = 1
            }
        }
    }
    return res
}

type NumUse struct{
    Value int
    Count int
}

type MaxHeap []NumUse

func (this MaxHeap) Len() int{
    return len(this)
}

func(this MaxHeap)Less(i, j int) bool {
    return this[i].Count > this[j].Count
}

func (this MaxHeap) Swap(i, j int){
    this[i], this[j] = this[j], this[i]
}

func (this *MaxHeap) Push(i interface{}){
    *this = append(*this, i.(NumUse))
}

func (this *MaxHeap) Pop() interface{}{
    old := *this
    n := len(old)
    x := old[n-1]
    *this = old[:n-1]
    return x
}
```
