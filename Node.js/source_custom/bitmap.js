
function resizebuf(buf, size) {
    let newSize = buf.length;
    if (newSize >= size) {
        return buf;
    }
    // 扩容2倍
    while (newSize < size) {
        newSize = newSize << 1 + 1;
        //todo 当达到一定数值时,累加固定值,不再2倍扩容
    }
    const newBuf = Buffer.alloc(newSize);
    buf.copy(newBuf, 0, buf.length);
    return newBuf;
}

class BitMap {
    constructor(size = 100) {
        this.buf = Buffer.alloc(size)
    }

    set(amount) {
        if (amount < 0) {
            throw new Error('n必须大于等于0');
        }
        // amount / 8 取整
        const index = amount >>> 3;
        this.bug = resizebuf(this.buf, index);
        // amount % 8 取余
        let seq = amount & 0x07
        seq = 1 << seq;
        this.buf[index] = this.buf[index] | seq;
    }

    clear(amount) {
        if (amount < 0) {
            throw new Error('n必须大于等于0');
        }
        const index = amount >>> 3
        let seq = amount & 0x07
        seq = ~(1 << seq)
        this.buf[index] = this.buf[index] & seq;
    }

    get(amount) {
        if (amount < 0) {
            throw new Error('n必须大于等于0');
        }
        const index = amount >>> 3
        let seq = amount & 0x07
        seq = 1 << seq;
        return !!(this.buf[index] & seq)
    }

    getBuf() {
        return this.buf
    }
}

