const Mocha = require('mocha');
const runner = new Mocha({});

runner.addFile('./BinaryTree.test.js');

runner.run(failures => {
    if (failures) {
        console.error(failures)
    } else {
        console.log('All passed')
    }
})


class BinaryTree {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.count = 1;
    }
    insert(value, curr) {
        let node = new BinaryTree(value);
        let head = curr || this;
        if (!head.value) {
            head.value = value;
        }
        if (head.value < value) {
            if (head.right !== null) {
               this.insert(value, head.right)
            } else {
                head.right = node;
            }
        } else if (head.value > value) {
            if (head.left !== null) {
                this.insert(value, head.left);
            } else {
                head.left = node;
            }
        } else {
            head.count++;
        }
        return head;
    }
    search(value, root = this) {
        if (!root) return false;
        if (value > root.value) {
            return this.search(value, root.right);
        } else if (value < root.value) {
            return this.search(value, root.left);
        } else {
            return true
        }
    }
    delete(value, root = this) {
        if (root === null) return root;
        if (value < root.value) {
            root.left = this.delete(value, root.left);
        } else if (value > root.value) {
            root.right = this.delete(value, root.right);
        } else {
            if ((root.left === null) && (root.right === null)) {
                return null;
            } else if (root.right === null) {
                return root.left;
            }
            let temp = this.minValue(root.right);
            root.value = temp.value;
            root.right = this.delete(temp.value, root.right);
        }
        return root;
    }
    minValue(node) {
        // Need to find leftmost child to replace deleted node
        let current = node;
        while (current && current.left !== null) {
            current = current.left;
        }
        return current;
    }
    preOrder(node = this, arr = []) {
        if (node === null) {
            return;
        }
        let count = node.count;
        while (count-- > 0) {
            arr.push(node.value)
        };
        this.preOrder(node.left, arr);
        this.preOrder(node.right, arr);
        return arr;
    }
    inOrder(node = this, arr = []) {
        if (node === null) {
            return;
        }
        this.inOrder(node.left, arr);
        let count = node.count;
        while (count-- > 0) {
            arr.push(node.value);
        }
        this.inOrder(node.right, arr);
        return arr;
    }
    postOrder(node = this, arr = []) {
        if (node === null) {
            return;
        }
        this.postOrder(node.left, arr);
        this.postOrder(node.right, arr);
        let count = node.count;
        while (count-- > 0) {
            arr.push(node.value);
        }
        return arr;
    }
    find(value, node = this) {
        let head = node;
        if (head) {
            if (head.value === value) {
                return true;
            } else if (head.value > value) {
                return this.find(value, head.left)
            } else {
                return this.find(value, head.right)
            }
        }
        return false;
    }
    getMax() {
        let current = this;
        if (!current.value) {
            return null;
        }
        while (current.right) {
            current = current.right;
        }
        return current.value;
    }
    getMin() {
        let current = this;
        if (!current.value) {
            return null;
        }
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }
}

module.exports = { BinaryTree }
