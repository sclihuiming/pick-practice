中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

void addNum(int num) - 从数据流中添加一个整数到数据结构中。
double findMedian() - 返回目前所有元素的中位数。
示例：
```text
addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2
```
进阶:

1. 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
2. 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-median-from-data-stream
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
type MedianFinder struct {
    minHeap *IntHeap
    maxHeap *MaxIntHeap
}


/** initialize your data structure here. */
func Constructor() MedianFinder {
    return MedianFinder{
        minHeap: &IntHeap{}, 
        maxHeap: &MaxIntHeap{},
    }
}


func (this *MedianFinder) AddNum(num int)  {
    heap.Push(this.minHeap, num)
    heap.Push(this.maxHeap, heap.Pop(this.minHeap))
    if len(*this.minHeap) < len(*this.maxHeap) {
		heap.Push(this.minHeap, heap.Pop(this.maxHeap))
	}
}


func (this *MedianFinder) FindMedian() float64 {
    if len(*this.minHeap) > len(*this.maxHeap) {
		return float64((*this.minHeap)[0])
	} else {
		return float64((*this.minHeap)[0]+(*this.maxHeap)[0]) / 2
	}
}

type IntHeap []int

func(h IntHeap)Len() int{
    return len(h)
}

func (h IntHeap) Less(i, j int) bool{
    return h[i] < h[j]
}

func (h IntHeap) Swap(i , j int){
    h[i], h[j] = h[j], h[i]
}

func (h *IntHeap)Push(x interface{}){
    *h = append(*h, x.(int))
} 

func (h *IntHeap)Pop()interface{}{
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

type MaxIntHeap []int

func(h MaxIntHeap)Len() int{
    return len(h)
}

func (h MaxIntHeap) Less(i, j int) bool{
    return h[i] > h[j]
}

func (h MaxIntHeap) Swap(i, j int){
    h[i], h[j] = h[j], h[i]
}

func (h *MaxIntHeap)Push(x interface{}){
    *h = append(*h, x.(int))
} 

func (h *MaxIntHeap)Pop()interface{}{
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}
/**
 * Your MedianFinder object will be instantiated and called as such:
 * obj := Constructor();
 * obj.AddNum(num);
 * param_2 := obj.FindMedian();
 */


```


