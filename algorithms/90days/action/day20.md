给定平面上 n 对不同的点，“回旋镖” 是由点表示的元组 (i, j, k) ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设 n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

示例:

输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-boomerangs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```go
func numberOfBoomerangs(points [][]int) int {
    res := 0
    for _, firstElem := range points{
        hashMap := make(map[int]int)
        for _, sencondElem := range points{
            x, y := firstElem[0] - sencondElem[0], firstElem[1] - sencondElem[1]
            dis := x * x + y * y
            if _, ok := hashMap[dis]; ok{
                hashMap[dis] = hashMap[dis] + 1
            } else {
                hashMap[dis] = 1
            }
        }
        for _, value := range hashMap {
            res = res + value * (value - 1)
        }
    }
    return res
}
```