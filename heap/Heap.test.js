const { Heap } = require('./index.js');
const expect = require('chai').expect;

describe('Heap', () => {
    describe('insert', () => {
        it('should add a new value to the max heap', () => {
            let heap = new Heap();
            heap.insert(2);
            heap.insert(3);
            heap.insert(5);
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.includes(2);
            expect(actual).to.be.an('array').that.includes(3);
            expect(actual).to.be.an('array').that.includes(5);
        });
        it('should maintain heap properties in a max heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should add a new value to the min heap', () => {
            let heap = new Heap('min');
            heap.insert(2);
            heap.insert(3);
            heap.insert(5);
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.includes(2);
            expect(actual).to.be.an('array').that.includes(3);
            expect(actual).to.be.an('array').that.includes(5);
        });
        it('should maintain heap properties in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        })
    });
    describe('delete', () => {
        it('should be able to remove an arbitrary value from a max heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.insert(22);
            heap.insert(17);
            heap.insert(13);
            heap.delete(12);
            heap.delete(17)
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.not.includes(12);
            expect(actual).to.be.an('array').that.not.includes(17);
        });
        it('should maintain heap properties in a max heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.insert(22);
            heap.insert(17);
            heap.insert(13);
            heap.delete(12);
            heap.delete(17);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should be able to remove an arbitrary value from a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.insert(22);
            heap.insert(17);
            heap.insert(13);
            heap.delete(12);
            heap.delete(17);
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.not.includes(12);
            expect(actual).to.be.an('array').that.not.includes(17);
        });
        it('should maintain heap properties in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.insert(22);
            heap.insert(17);
            heap.insert(13);
            heap.delete(12);
            heap.delete(17);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
    })
    describe('getSize', () => {
        it('should return the number of values present in the heap', () => {
            let heap = new Heap();
            heap.insert(5);
            heap.insert(10);
            heap.insert(2);
            heap.insert(7);
            heap.insert(11);
            const actual = heap.getSize();
            const expected = 5;
            expect(actual).to.equal(expected);
        });
        it('should return the number of values present in the heap after deletions', () => {
            let heap = new Heap();
            heap.insert(5);
            heap.insert(10);
            heap.insert(2);
            heap.insert(7);
            heap.insert(11);
            heap.deleteMax();
            heap.deleteMax();
            const actual = heap.getSize();
            const expected = 3;
            expect(actual).to.equal(expected);
        });
        it('should return the number of values present in a min heap', () => {
            let heap = new Heap();
            heap.insert(5);
            heap.insert(10);
            heap.insert(2);
            heap.insert(7);
            heap.insert(11);
            const actual = heap.getSize();
            const expected = 5;
            expect(actual).to.equal(expected);
        })
    })
    describe('heapify', () => {
        it('should append the array values passed in to the heap and turn it into a max heap', () => {
            let heap = new Heap();
            heap.insert(1);
            const heaped = heap.heapify([7,8,9,10]);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected)
        });
        it('should append the array values passed in to the heap and turn it into a max heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            const heaped = heap.heapify([7,8,9,10]);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected)
        });
    });
    describe('isEmpty', () => {
        it('should return true if the heap is empty', () => {
            let heap = new Heap();
            const actual = heap.isEmpty();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return false if the heap is not empty', () => {
            let heap = new Heap();
            heap.insert(2);
            const actual = heap.isEmpty();
            const expected = false;
            expect(actual).to.equal(expected);
        });
    });
    describe('isHeap', () => {
        it('should return false if the tree is not a heap', () => {
            let heap = new Heap();
            heap.heap = [0,7,12,4];
            heap.size = 3;
            const actual = heap.isHeap();
            const expected = false;
            expect(actual).to.equal(expected);
        })
        it('should return true if the tree is a max heap', () => {
            let heap = new Heap();
            heap.heap = [0,22,13,5,1,10];
            heap.size = 5;
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return true if the tree is a min heap', () => {
            let heap = new Heap('min');
            heap.heap = [0,1,5,13,10,22];
            heap.size = 5;
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        })
    });
    describe('replace', () => {
        it('should remove the max value and add a new value in a max heap', () => {
            let heap = new Heap();
            heap.insert(5);
            heap.insert(22);
            heap.insert(13);
            heap.insert(10);
            heap.insert(15);
            heap.insert(1);
            heap.insert(14);
            heap.replace(7);
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.includes(5);
            expect(actual).to.be.an('array').that.includes(7);
            expect(actual).to.be.an('array').that.includes(13);
            expect(actual).to.be.an('array').that.includes(15);
            expect(actual).to.be.an('array').that.includes(14);
            expect(actual).to.be.an('array').that.includes(10);
            expect(actual).to.be.an('array').that.includes(1);
            expect(actual).to.be.an('array').that.not.includes(22);
        });
        it('should maintain heap properties in a max heap', () => {
            let heap = new Heap();
            heap.insert(5);
            heap.insert(22);
            heap.insert(13);
            heap.insert(10);
            heap.insert(15);
            heap.insert(1);
            heap.insert(14);
            heap.replace(7);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should remove the min value and add a new value in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(5);
            heap.insert(22);
            heap.insert(13);
            heap.insert(10);
            heap.insert(15);
            heap.insert(1);
            heap.insert(14);
            heap.replace(7);
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.includes(5);
            expect(actual).to.be.an('array').that.includes(7);
            expect(actual).to.be.an('array').that.includes(13);
            expect(actual).to.be.an('array').that.includes(15);
            expect(actual).to.be.an('array').that.includes(14);
            expect(actual).to.be.an('array').that.includes(10);
            expect(actual).to.be.an('array').that.includes(22);
            expect(actual).to.be.an('array').that.not.includes(1);
        });
        it('should maintain heap properties in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(5);
            heap.insert(22);
            heap.insert(13);
            heap.insert(10);
            heap.insert(15);
            heap.insert(1);
            heap.insert(14);
            heap.replace(7);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        })
    });
    describe('siftDown', () => {
        it('should move a node down the tree', () => {
            let heap = new Heap();
            heap.heap = [0,2,3,5];
            heap.size = 3;
            heap.siftDown(1);
            const actual = heap.heap;
            const expected = [0,5,3,2];
            expect(actual).to.deep.equal(expected);
        });
    })
    describe('siftUp', () => {
        it('should move a node up the tree', () => {
            let heap = new Heap();
            heap.heap = [0,2,3,5];
            heap.siftUp(3);
            const actual = heap.heap;
            const expected = [0,5,3,2];
            expect(actual).to.deep.equal(expected);
        })
    });
    describe('maxChild', () => {
        it('should return the index of the largest child of a node in a max heap', () => {
            let heap = new Heap();
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            const actual = heap.maxChild(1);
            const expected = 2;
            expect(actual).to.equal(expected);
        })
        it('should not be a function in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            expect(() => {
                heap.maxChild()
            }).to.throw(TypeError, 'heap.maxChild is not a function')
        });
    })
    describe('minChild', () => {
        it('should return the index of the smallest child of a node in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            const actual = heap.minChild(1);
            const expected = 2;
            expect(actual).to.equal(expected);
        });
        it('should not be a function in a max heap', () => {
            let heap = new Heap();
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            expect(() => {
                heap.minChild(1);
            }).to.throw(TypeError, 'heap.minChild is not a function')
        });
    });
    describe('getMax', () => {
        it('should return the max value of the heap', () => {
            let heap = new Heap();
            heap.insert(4);
            heap.insert(7);
            heap.insert(10);
            heap.insert(3);
            const actual = heap.getMax();
            const expected = 10;
            expect(actual).to.equal(expected);
        });
        it('should not be a function in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(4);
            heap.insert(7);
            heap.insert(10);
            heap.insert(3);
            expect(() => {
                heap.getMax()
            }).to.throw(TypeError, 'heap.getMax is not a function')
        })
    });
    describe('deleteMax', () => {
        it('should remove the max value from the heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.deleteMax();
            const actual = heap.heap[1];
            const expected = 10;
            expect(actual).to.equal(expected);
        });
        it('should maintain heap properties', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.deleteMax();
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should not be a function in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            expect(() => {
                heap.deleteMax()
            }).to.throw(TypeError, 'heap.deleteMax is not a function');
        })
    });
    describe('extractMax', () => {
        it('should remove the maximum value of the heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.extractMax();
            const actual = heap.heap[1];
            const expected = 10;
            expect(actual).to.equal(expected);
        });
        it('should return the node with the maximum value after removing it', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            const actual = heap.extractMax();
            const expected = 12;
            expect(actual).to.equal(expected);
        });
        it('should maintain heap properties', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.extractMax();
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should not be a function in a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            expect(() => {
                heap.extractMax();
            }).to.throw(TypeError, 'heap.extractMax is not a function')
        })
    })
    describe('getMin', () => {
        it('should return the minimum value of a min heap', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            const actual = heap.getMin();
            const expected = 3;
            expect(actual).to.equal(expected)
        });
        it('should not be a function in a max heap', () => {
            let heap = new Heap();
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            expect(() => {
                heap.getMin()
            }).to.throw(TypeError, 'heap.getMin is not a function')
        })
    });
    describe('deleteMin', () => {
        it('should remove the minimum value of a min heap', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.deleteMin();
            const actual = heap.heap[1];
            const expected = 5;
            expect(actual).to.equal(expected);
        });
        it('should maintain heap properties', () => {
            let heap = new Heap('min');
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            heap.deleteMin();
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should not be a function in a max heap', () => {
            let heap = new Heap();
            heap.insert(1);
            heap.insert(5);
            heap.insert(10);
            heap.insert(12);
            expect(() => {
                heap.deleteMin()
            }).to.throw(TypeError, 'heap.deleteMin is not a function')
        })
    })    
    describe('extractMin', () => {
        it('should return the minimum value of the min heap', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            const actual = heap.extractMin();
            const expected = 3;
            expect(actual).to.equal(expected);
        });
        it('should remove the minimum value of the min heap', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            heap.extractMin();
            const actual = heap.heap;
            expect(actual).to.be.an('array').that.not.includes(3);
        });
        it('should maintain heap properties', () => {
            let heap = new Heap('min');
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            const actual = heap.isHeap();
            const expected = true;
            expect(actual).to.equal(expected);
        })
        it('should not be a function in a max heap', () => {
            let heap = new Heap();
            heap.insert(7);
            heap.insert(8);
            heap.insert(12);
            heap.insert(11);
            heap.insert(3);
            heap.insert(10);
            expect(() => {
                heap.extractMin()
            }).to.throw(TypeError, 'heap.extractMin is not a function')
        });
    });
})
