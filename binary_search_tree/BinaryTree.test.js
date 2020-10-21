const { BinaryTree } = require('./index.js');
const expect = require('chai').expect;

describe('BinaryTree', () => {
    describe('insert', () => {
        it('should add a value to the left if it is less than the head of the binary tree', () => {
            let head = new BinaryTree(7);
            const actual = head.insert(5).left;
            let expected = head.left;
            expect(actual).to.deep.equal(expected)
        });
        it('should add a value to the right if it is greater than the head of the binary tree', () => {
            let head = new BinaryTree(7);
            const actual = head.insert(12).right;
            const expected = head.right;
            expect(actual).to.deep.equal(expected);
        });
        it('should increase the count of the node if it is equal to the head of the binary tree', () => {
            let head = new BinaryTree(7);
            const actual = head.insert(7);
            const expected = { value: 7, left: null, right: null, count: 2};
            expect(actual).to.deep.equal(expected);
        })
    });
    describe('inOrder', () => {
        it('should return the elements in order from lowest to highest', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.inOrder();
            const expected = [4,10,12,15,18,22,24,25,31,35,44,50,66,70,90];
            expect(actual).to.deep.equal(expected);
        });
    });
    describe('preorder', () => {
        it('should return the parent node, followed by the left node, followed by the right node', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.preOrder();
            const expected = [25,15,10,4,12,22,18,24,50,35,31,44,70,66,90];
            expect(actual).to.deep.equal(expected);
        })
    });
    describe('postorder', () => {
        it('should return the left node, followed by the right node, followed by the parent node', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.postOrder();
            const expected = [4,12,10,18,24,22,15,31,44,35,66,90,70,50,25];
            expect(actual).to.deep.equal(expected);
        })
    });
    describe('find', () => {
        it('should return true if the value is present in the bottom of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.find(4);
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return true if the value is present in the middle of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.find(31);
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return true if the value is present at the beginning of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.find(25);
            const expected = true;
            expect(actual).to.equal(expected);
        })
        it('should return false if the value is not present in the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.find(42);
            const expected = false;
            expect(actual).to.equal(expected);
        })
    })
    describe('delete', () => {
        it('should remove values properly', () => {
           let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            head.delete(4);
            head.delete(35);
            head.delete(12);
            head.delete(70);
            const actual = head.inOrder();
            const expected = [10,15,18,22,24,25,31,44,50,66,90];
            expect(actual).to.deep.equal(expected);
        })
    })
     describe('search', () => {
        it('should return true if the value is present in the bottom of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.search(4);
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return true if the value is present in the middle of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.search(31);
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return true if the value is present at the beginning of the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.search(25);
            const expected = true;
            expect(actual).to.equal(expected);
        })
        it('should return false if the value is not present in the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.search(42);
            const expected = false;
            expect(actual).to.equal(expected);
        });
    });
    describe('getMax', () => {
        it('should return the largest value in the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.getMax();
            const expected = 90;
            expect(actual).to.equal(expected);
        });
        it('should return null if there are no values in the tree', () => {
            let head = new BinaryTree();
            const actual = head.getMax();
            const expected = null;
            expect(actual).to.deep.equal(expected);
        });
    });
    describe('getMin', () => {
        it('should return the minimum value in the tree', () => {
            let head = new BinaryTree(25);
            head.insert(15);
            head.insert(50);
            head.insert(10);
            head.insert(22);
            head.insert(35);
            head.insert(70);
            head.insert(4);
            head.insert(12);
            head.insert(18);
            head.insert(24);
            head.insert(31);
            head.insert(44);
            head.insert(66);
            head.insert(90);
            const actual = head.getMin();
            const expected = 4;
            expect(actual).to.equal(expected);
        });
        it('should return null if there are no values in the tree', () => {
            let head = new BinaryTree();
            const actual = head.getMin();
            const expected = null;
            expect(actual).to.deep.equal(expected);
        })
    })
})
