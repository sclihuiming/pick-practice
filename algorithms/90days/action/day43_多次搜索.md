给定一个较长字符串big和一个包含较短字符串的数组smalls，设计一个方法，根据smalls中的每一个较短字符串，对big进行搜索。输出smalls中的字符串在big里出现的所有位置positions，其中positions[i]为smalls[i]出现的所有位置。

示例：

输入：
big = "mississippi"
smalls = ["is","ppi","hi","sis","i","ssippi"]
输出： [[1,4],[8],[],[3],[1,4,7,10],[5]]
提示：

0 <= len(big) <= 1000
0 <= len(smalls[i]) <= 1000
smalls的总字符数不会超过 100000。
你可以认为smalls中没有重复字符串。
所有出现的字符均为英文小写字母。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multi-search-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
type Trie struct {
    value int // 存取当前单词的数组下标
    nodeChar string
    childNodes []*Trie
}

func multiSearch(big string, smalls []string) [][]int {
    // 初始化前缀树
    root := &Trie{
        nodeChar: "root",
        value: -1,
        childNodes: make([]*Trie, 26),
    }
    // 构造前缀树
    for index, word := range smalls{
        next := root
        for _, charCode := range word{
            sequences := charCode - 97
            if next.childNodes[sequences] == nil{
                next.childNodes[sequences] = &Trie{
                    nodeChar: string(charCode),
                    value: -1,
                    childNodes: make([]*Trie, 26),
                }
            }
            next = next.childNodes[sequences]
        }
        next.value = index
    }

    strSize := len(big)
    res := make([][]int, len(smalls))
    // 遍历字符串 去 前缀树中 搜寻存在的路径
    for index := 0; index < strSize; index++{
        str := big[index:]
        next := root
        for _, charCode := range str{
            sequences := charCode - 97
            if next.childNodes[sequences] == nil{
                break
            } else {
                next = next.childNodes[sequences]
            }
            if next.value > -1{
                res[next.value] = append(res[next.value], index)
            }
        }
    }
    return res
}
```

