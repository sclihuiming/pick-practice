实现一个 MapSum 类里的两个方法，insert 和 sum。

对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。

对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。

示例 1:

输入: insert("apple", 3), 输出: Null
输入: sum("ap"), 输出: 3
输入: insert("app", 2), 输出: Null
输入: sum("ap"), 输出: 5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/map-sum-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```golang
// 前缀树(字典树)
type MapSum struct {
    value int
    nodeChar string
    childNodes []*MapSum
}


/** Initialize your data structure here. */
func Constructor() MapSum {
    return MapSum{
        nodeChar: "root",
        childNodes: make([]*MapSum, 26),
    }
}


func (this *MapSum) Insert(key string, val int)  {
    root := this
    for _, charCode := range key{
        sequences := charCode - 97
        if root.childNodes[sequences] == nil{
            root.childNodes[sequences] = &MapSum{
                nodeChar: string(charCode),
                childNodes: make([]*MapSum, 26),
            }
        }
        root = root.childNodes[sequences]
    }
    root.value = val
}


func (this *MapSum) Sum(prefix string) int {
    root := this
    for _, charCode := range prefix{
        sequences := charCode - 97
        if root.childNodes[sequences] != nil{
            root = root.childNodes[sequences]
        } else {
            return 0
        }
    }
    return root.dfs()
}

func (this *MapSum) dfs() int{
    if this == nil{
        return 0
    }
    result := this.value
    for _, node := range this.childNodes{
        if node != nil{
            result += node.dfs()
        }
    }
    return result
}

/**
 * Your MapSum object will be instantiated and called as such:
 * obj := Constructor();
 * obj.Insert(key,val);
 * param_2 := obj.Sum(prefix);
 */
```

```golang

```
