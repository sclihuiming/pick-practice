给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

示例 1:

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```
示例 2:
```
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```
示例 3:
```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sort-characters-by-frequency
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
// 暴力解法
func frequencySort(s string) string {
    size := len(s)
    characterMap := map[string]int{}
    for _, char := range s{
        charStr := string(char)
        if _, ok := characterMap[charStr];ok{
            characterMap[charStr] += 1
        } else {
            characterMap[charStr] = 1
        }
    }
    res := make([]string, size)
    for index := 0; index < size; index++{
        repeatMax := string(s[0])
        for k, v := range characterMap{
            if v > characterMap[repeatMax]{
                repeatMax = k
            }
        }
        for j := 0; j < characterMap[repeatMax]; j++{
            res = append(res, repeatMax)
        }
        delete(characterMap, repeatMax)
    }
    return strings.Join(res, "")
}
```

```golang
// 效率太低了吧...
import (
    "strings"
    "container/heap"
)

func frequencySort(s string) string {
    characterMap := map[string]string{}
    for _, char := range s{
        charStr := string(char)
        if _, ok := characterMap[charStr];ok{
            characterMap[charStr] += charStr
        } else {
            characterMap[charStr] = charStr
        }
    }
    strHeap := make(StrHeap, 0)
    for _, val := range characterMap {
        heap.Push(&strHeap, val)
    }
    result := ""
    for end := len(strHeap) - 1; end >= 0; end-- {
        result = (heap.Pop(&strHeap)).(string) + result
    }

    return result
}

type StrHeap []string

func (h StrHeap) Len() int {
    return len(h)
}

func (h StrHeap) Less(i int, j int) bool {
    return len(h[i]) <= len(h[j])
}

func (h StrHeap) Swap(i int, j int) {
    h[i], h[j] = h[j], h[i]
}

func (h *StrHeap) Push(x interface{}) {
    *h = append(*h, x.(string))
}

func (h *StrHeap) Pop() interface{} {
    length := len(*h)
    val := (*h)[length - 1]
    *h = (*h)[: length - 1]

    return val
}

```

