/**
 * 36. 有效的数独
 * @param {character[][]} board
 * @return {boolean}
 */
let isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            //检测行
            for (let k = 8; k > j; k--) {
                if (board[i][j] !== "." && board[i][j] === board[i][k]) {
                    return false;
                }
            }
            //检测列
            for (let k = 8; k > i; k--) {
                //检测列
                if (board[i][j] !== "." && board[i][j] === board[k][j]) {
                    return false;
                }
            }
            //3*3检测 检测当前点后面的元素
            for (let k = i + 1; k % 3 !== 0; k++) {//i+1是因为同行/同列已经被上面检测了
                let increment = Math.floor(j / 3);
                for (let h = increment * 3; h < increment * 3 + 3; h++) {
                    if (board[i][j] !== "." && board[i][j] === board[k][h]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
};


// console.log(isValidSudoku([
//     ["8", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]));
