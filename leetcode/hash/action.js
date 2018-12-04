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


/**
 * 37. 解数独
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
let solveSudoku = function (board) {
    //记录行的数字
    let row = [];
    //记录列的数字
    let col = [];
    //记录块的数字
    let block = [];
    for (let i = 0; i < board.length; i++) {
        row[i] = [];
        col[i] = [];
        block[i] = [];
        for (let j = 0; j < 10; j++) {
            row[i][j] = false;
            col[i][j] = false;
            block[i][j] = false;
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let blockIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (board[i][j] !== '.') {
                let num = +board[i][j];
                row[i][num] = true;
                col[j][num] = true;
                // blockIndex = i / 3 * 3 + j / 3，取整
                block[blockIndex][num] = true;
            }
        }
    }
    dfs(board, row, col, block, 0, 0);
    //打印
    for (let i = 0; i < 9; i++) {
        let msg = ''
        for (let j = 0; j < 9; j++) {
            msg += board[i][j] + " ";
        }
        console.log(msg);
    }

    function dfs(board, row, col, block, i, j) {
        while (board[i][j] !== '.') {
            if (++j >= 9) {
                i++;
                j = 0;
            }
            if (i >= 9) {
                return true;
            }
        }
        let blockIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        for (let num = 1; num <= 9; num++) {
            if (!row[i][num] && !col[j][num] && !block[blockIndex][num]) {
                // 递归
                board[i][j] = "" + num;
                row[i][num] = true;
                col[j][num] = true;
                block[blockIndex][num] = true;
                if (dfs(board, row, col, block, i, j)) {
                    return true;
                } else {
                    // 回溯
                    row[i][num] = false;
                    col[j][num] = false;
                    block[blockIndex][num] = false;
                    board[i][j] = '.';
                }
            }
        }
        return false;
    }
};


// console.log(solveSudoku([
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]));


