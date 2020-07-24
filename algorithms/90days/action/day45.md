
在节点网络中，只有当 graph[i][j] = 1 时，每个节点 i 能够直接连接到另一个节点 j。

一些节点 initial 最初被恶意软件感染。只要两个节点直接连接，且其中至少一个节点受到恶意软件的感染，那么两个节点都将被恶意软件感染。这种恶意软件的传播将继续，直到没有更多的节点可以被这种方式感染。

假设 M(initial) 是在恶意软件停止传播之后，整个网络中感染恶意软件的最终节点数。

我们可以从初始列表中删除一个节点。如果移除这一节点将最小化 M(initial)， 则返回该节点。如果有多个节点满足条件，就返回索引最小的节点。

请注意，如果某个节点已从受感染节点的列表 initial 中删除，它以后可能仍然因恶意软件传播而受到感染。

 

示例 1：

```
输入：graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]
输出：0
```

示例 2：

```
输入：graph = [[1,0,0],[0,1,0],[0,0,1]], initial = [0,2]
输出：0
```

示例 3：

```
输入：graph = [[1,1,1],[1,1,1],[1,1,1]], initial = [1,2]
输出：1
```

提示：

```
1 < graph.length = graph[0].length <= 300
0 <= graph[i][j] == graph[j][i] <= 1
graph[i][i] == 1
1 <= initial.length < graph.length
0 <= initial[i] < graph.length
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimize-malware-spread
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```golang
func minMalwareSpread(graph [][]int, initial []int) int {
    n := len(graph)
    parents := make([]int, n)
    size := make([]int, n)
    for index := 0; index < n; index++{
        parents[index] = index
        size[index] = 1
    }

    var find func(x int) int
    find = func(x int) int{
        for x != parents[x]{
            parents[x] = parents[parents[x]]
            x = parents[x]
        }
        return x
    }

    var union func(p, q int)
    union = func(p, q int){
        rootP := find(p)
        rootQ := find(q)
        if rootQ == rootP {
            return
        }
        if size[rootP] > size[rootQ]{
            parents[rootQ] = rootP
            size[rootP] += size[rootQ]
        } else {
            parents[rootP] = rootQ
            size[rootQ] += size[rootP]
        }
    }

    var getSizeOfSet func(x int)int
    getSizeOfSet = func(x int)int {
        root := find(x)
        // fmt.Println(x, root, parents, size, size[root])
        return size[root]
    }

    var countInfected func(filter []int, rejectIndex int)int
    countInfected = func(filter []int, rejectIndex int) int {
        filterParent := map[int]int{}
        filterLen := len(filter)
        for index := 0; index < filterLen; index++{
            if index != rejectIndex{
                root := find(filter[index])
                filterParent[root] = root
            }
        }
        result := 0
        for _, v := range filterParent{
            result += getSizeOfSet(v)
        }
        return result
    }

    // 构造并查集
    for i := 0; i < n; i++{
        for j := 0; j < n; j++{
            if i != j && graph[i][j] == 1{
                union(i, j)
            }
        }
    }

    ans := 0
    leastInfected := 1<<32 - 1
    initialLen := len(initial)
    
    for index := 0; index < initialLen; index++{
        // fmt.Println(initial)
        // filterInitial := append(index)
        count := countInfected(initial, index)
        // fmt.Println(index, count)
        if count < leastInfected{
            leastInfected = count
            ans = initial[index]
        } else if count == leastInfected && initial[index] < ans{
            ans = initial[index]
        }
    }
    return ans

}

```