const Mocha = require('mocha');
const runner = new Mocha({});

runner.addFile('./Heap.test.js');

runner.run(failures => {
    if (failures) {
        console.error(failures);
    } else {
        console.log('All passed')
    }
});

class Heap {
    constructor(type) {
        this.heap = [0];
        this.size = 0;
        this.type = type;
        if (type === 'min') {
            this.extractMin = this.extractMax;
            this.deleteMin = this.deleteMax;
            this.getMin = this.getMax;
            this.extractMax = undefined;
            this.deleteMax = undefined;
            this.getMax = undefined;
            this.maxChild = undefined;
        } else {
            this.minChild = undefined;
        }
    }
    insert(value) {
        this.heap.push(value);
        this.siftUp(++this.size);
    }
    deleteMax() {
        this.heap[1] = this.heap[this.size--];
        this.heap.pop();
        this.siftDown(1);
    }
    extractMax() {
        let prevMax = this.heap[1];
        this.heap[1] = this.heap[this.size--];
        this.heap.pop();
        this.siftDown(1);
        return prevMax;
    }
    replace(value) {
        this.heap[1] = value;
        this.siftDown(1);
    }
    delete(value) {
        let deletedVal;
        for (let i = 1; i <= this.size; i++) {
            if (this.heap[i] === value) {
                deletedVal = this.heap[i];
                this.heap[i] = this.heap[this.size--];
                this.heap.pop();
                this.siftDown(i);
                return deletedVal;
            }
        }
    }
    getMax() {
        return this.heap[1];
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    siftDown(index) {
        if (this.type === 'min') {
            while (index * 2 <= this.size) {
                let min_child = this.minChild(index);
                if (this.heap[index] > this.heap[min_child]) {
                    [this.heap[index], this.heap[min_child]] = [this.heap[min_child], this.heap[index]];
                } else {
                    break;
                }
                index = min_child;
            }
        } else {
            while (index * 2 <= this.size) {
                let max_child = this.maxChild(index);
                if (this.heap[index] < this.heap[max_child]) {
                    [this.heap[index], this.heap[max_child]] = [this.heap[max_child], this.heap[index]];
                } else {
                    break;
                }
                index = max_child;
            }
        }
    }
    siftUp(index) {
        if (this.type === 'min') {
            while (Math.trunc(index / 2) > 0) {
                if (this.heap[Math.trunc(index / 2)] > this.heap[index]) {
                    [ this.heap[Math.trunc(index / 2)], this.heap[index] ] = [ this.heap[index], this.heap[Math.trunc(index / 2)]];
                } else {
                    break;
                }
                index = Math.trunc(index /2)
            }
        } else {
            while (Math.trunc(index / 2) > 0) {
                if (this.heap[Math.trunc(index / 2)] < this.heap[index]) {
                    [this.heap[Math.trunc(index / 2)], this.heap[index]] = [this.heap[index], this.heap[Math.trunc(index / 2)]];
                } else {
                    break;
                }
                index = Math.trunc(index / 2);
            }
        }
    }
    maxChild(index) {
        if ((index * 2 + 1) > this.size) {
            return index * 2;
        } else if (this.heap[index * 2] > this.heap[index * 2 + 1]) {
            return index * 2;
        } else {
            return index * 2 + 1;
        }
    }
    minChild(index) {
        if ((index * 2 + 1) > this.size) {
            return index * 2;
        } else if (this.heap[index * 2] < this.heap[index * 2 + 1]) {
            return index * 2;
        } else {
            return index * 2 + 1;
        }
    }
    isHeap() {
        let i = 1;
        while (i * 2 <= this.size) {
            if ((i * 2 + 1) < this.size) {
                if (this.type === 'min') {
                    if (this.heap[i] > this.heap[i * 2 + 1]) {
                        return false;
                    }
                } else {
                    if (this.heap[i] < this.heap[i * 2 + 1]) {
                        return false;
                    }
                }
            }
            if (this.type === 'min') {
                if (this.heap[i] > this.heap[i * 2]) {
                    return false;
                }
            } else {
                if (this.heap[i] < this.heap[i * 2]) {
                return false;
                }
            }
            i++;
        }
        return true;
    }
    heapify(arr = []) {
        this.heap = [...this.heap, ...arr];
        this.size += arr.length;
        for (let i = Math.trunc(this.size / 2); i >= 1; i--) {
            this.siftDown(i);
        }
    }
}

module.exports = { Heap }
