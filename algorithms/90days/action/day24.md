给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。

示例 1:

输入: [[1,1],[2,2],[3,3]]
输出: 3
解释:
^
|
|        o
|     o
|  o  
+------------->
0  1  2  3 4
示例 2:

输入: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出: 4
解释:
^
|
| o
|     o   o
|      o
|  o   o
+------------------->
0  1  2  3  4  5  6

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-points-on-a-line
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
    if(points.length < 3){
        return points.length
    }
    let maxP = 0;
    let maxNum = 1;//K非0或者非无穷大的共线点个数
    let maxNumHrizt = 1;//横向共线，即纵坐标相同点的个数k = 0
    let maxNumVerti = 1;//纵向共线，即横坐标相同点的个数K = 无穷
    let maxNumSame = 1;//相同点的个数
    for(let i=0;i<points.length;i++){
        maxNum = 1;
        maxNumHrizt = 1;
        maxNumVerti = 1;
        maxNumSame = 1;
        let mapper = {}
        for(let j=i+1;j<points.length;j++){
            let dy = points[j][1] - points[i][1]
            let dx = points[j][0] - points[i][0]
            if(dy === 0 && dx === 0){
                maxNumSame++
            }else if(dy === 0 && dx !== 0){
                maxNumHrizt++
            }else if(dy !== 0 && dx === 0){
                maxNumVerti++
            }else{
                let flag = 1;//标记正负
                if(dy * dx < 0){
                    flag = 0
                }
                dy = Math.abs(dy);
                dx = Math.abs(dx);
                //最大公因数
                let gdcnum = gcd(dx, dy)
                dy /= gdcnum
                dx /= gdcnum
                if(flag === 0){
                    dy *= -1
                }

                if(!mapper[dx + '%' + dy]){
                    mapper[dx + '%' + dy] = 1
                }
                mapper[dx + '%' + dy] = mapper[dx + '%' + dy] + 1
                
                maxNum = Math.max(maxNum, mapper[dx + '%' + dy])
            }
        }
        maxP = Math.max(maxP, maxNum + maxNumSame - 1)
        maxP = Math.max(maxP, maxNumHrizt + maxNumSame - 1)
        maxP = Math.max(maxP, maxNumVerti + maxNumSame - 1)
    }
    return maxP;
};

function gcd( a,  b) {
        let r;
        while(b > 0) {
            r = a % b;
            a = b;
            b = r;
        }
        return a;
    }
```