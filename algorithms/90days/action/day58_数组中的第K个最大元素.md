在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
// 排序
func findKthLargest(nums []int, k int) int {
    size := len(nums)
    sort.Ints(nums)
    return nums[size - k]
}
```

```golang
func findKthLargest(nums []int, k int) int {
    size := len(nums)
    // 构造 大顶堆

    var modifyHeap func(i int)
    modifyHeap = func(i int){
        if i < size{
            left, right := 2 * i + 1, 2 * i + 2
            maxIndex := i
            if left < size && nums[left] > nums[maxIndex]{
                maxIndex = left
            }
            if right < size && nums[right] > nums[maxIndex]{
                maxIndex = right
            }
            if maxIndex != i{
                nums[i], nums[maxIndex] = nums[maxIndex], nums[i]
                modifyHeap(maxIndex)
            }
        }
    }

    var buildMaxHeap func()
    buildMaxHeap = func(){
        for index := size / 2; index >= 0; index--{
            modifyHeap(index)
        }
    }
    buildMaxHeap()
    for i := len(nums) - 1; i >= len(nums) - k + 1; i-- {
        nums[0], nums[i] = nums[i], nums[0]
        size--
        modifyHeap(0)
    }
    return nums[0]
}
```

```golang
func findKthLargest(nums []int, k int) int {
    // 快速排序
    size := len(nums)
    selectSize := size - k

    var partition func(left, right, randomIndex int) int 
    partition = func(left, right, randomIndex int) int {
        pivot := nums[randomIndex]
        nums[right], nums[randomIndex] = nums[randomIndex], nums[right]
        pos := left
        for index := left; index <= right; index++{
            if nums[index] < pivot{
                nums[index], nums[pos] = nums[pos], nums[index]
                pos++
            }
        }
        nums[right], nums[pos] = nums[pos], nums[right]
        return pos
    }

    var selectElem func(left, right int) int
    selectElem = func(left, right int) int {
        if left == right{
            return nums[left]
        }
        rand.Seed(time.Now().UnixNano())
        randomIndex := left + (right - left) / 2
        pos := partition(left, right, randomIndex)
        if pos == selectSize{
            return nums[pos]
        } else if pos > selectSize{
            return selectElem(left, pos - 1)
        } else {
            return selectElem(pos + 1, right)
        }
    }

    return selectElem(0, size - 1)
}
```
