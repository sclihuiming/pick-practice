节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。

示例1:

输入：n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
输出：true
示例2:

输入：n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3], [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
输出 true
提示：

节点数量n在[0, 1e5]范围内。
节点编号大于等于 0 小于 n。
图中可能存在自环和平行边。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/route-between-nodes-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```go
func findWhetherExistsPath(n int, graph [][]int, start int, target int) bool {
    edges := make([][]int,n)
    Flag := make([]int,n)
    for i:=0;i<len(graph);i++{
        edges[graph[i][0]] = append(edges[graph[i][0]],graph[i][1])
    }
    queue := make([]int,0)
    queue = append(queue,start)
    for len(queue) > 0{
        tmp := queue[0]
        queue = queue[1:]
        Flag[tmp] = 1
        if tmp == target{
            return true
        }
        for i:=0;i<len(edges[tmp]);i++{
            if Flag[edges[tmp][i]] == 0{
                queue = append(queue,edges[tmp][i])
            }
        }
    }
    return false
}
```

```js
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
var findWhetherExistsPath = function(n, graph, start, target) {
    // let vertexes = new Set();
    let edges = new Array();

    for(let i = 0; i<graph.length;i++){
        if(!edges[graph[i][0]]){
            edges[graph[i][0]] = []
        }
        edges[graph[i][0]].push(graph[i][1])
    }
    // console.log(edges)

    // for(let node of graph){
    //     if(!vertexes.has(node[0])){
    //         vertexes.add(node[0])
    //         edges.set(node[0], []) 
    //     }
    //     edges.get(node[0]).push(node[1])
    //     if(!vertexes.has(node[1])){
    //         vertexes.add(node[1])
    //         edges.set(node[1], [])
    //     }
    // }

    let flag = [];
    // for(let vertexe of vertexes){
    //     traverse[vertexe] = false
    // }

    let queue = [];
    queue.push(start);
    while (queue.length > 0){
        let qv = queue.shift()
        if(flag[qv] !== 1){
            flag[qv] = 1;
            // console.log(qv, flag[qv], target, queue)
            if(qv === target){
                return true
            }
            if(edges[qv]){
                for(let i = 0; i< edges[qv].length; i++){
                    if(!flag[edges[qv][i]]){
                        // console.log(flag[graph[qv][i]])
                        queue.push(edges[qv][i])
                    }
                }
            }
        }
          
    }

    // if(vertexes.has(start) && vertexes.has(target)){
    //     let queue = []
    //     queue.push(start)
    //     while(queue.length > 0){
    //         let qv = queue.shift()
    //         // 然后获取队头节点相关的节点
    //         let list = edges.get(qv)
    //         for(let node of list){
    //             if(target === node){
    //                 return true
    //             }
    //             if(traverse[node] === false){
    //                 traverse[node] = true
    //                 queue.push(node)
    //             }
    //         }
    //         traverse[qv] = true
    //     }
    // }
    return false
};
```