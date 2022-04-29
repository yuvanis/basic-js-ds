const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = new Node(null);
  }

  root() {
    return this.rootNode.data === null ? null : this.rootNode;
  }

  add(data) {
    let node = this.rootNode


    while (true) {
      if (node.data === null) {
        node.data = data;
        return;
      }
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
          return
        }
        node = node.left
        continue;
      }

      if (data > node.data) {
        if (node.right === null) {
          node.right = new Node(data);
          return;
        }
        node = node.right

      }
    }
  }

  has(data) {
    return this.findWithPrev(data)[0] !== null;
  }

  findWithPrev(data) {
    let node = this.rootNode;
    let prevNode = null;
    while (node !== null) {
      if (data === node.data) return [node, prevNode];
      prevNode = node;
      node = data > node.data ? node.right : node.left;
    }
    return [null, prevNode];
  }

  find(data) {
    return this.findWithPrev(data)[0];
  }

  reassign(prevNode, node, data) {
    if (data > prevNode.data) {
      prevNode.right = node;
    } else {
      prevNode.left = node;
    }
  }

  remove(data) {
    const [node, prevNode] = this.findWithPrev(data);
    if (node === null) return;
    if (node.left === null && node.rigth === null) {
      this.reassign(prevNode, null, node.data);
      return;
    }

    if (node.left === null || node.right === null) {
      this.reassign(prevNode, node.left === null ? node.right : node.left, node.data);
      return;
    }

    let theMostRightLeft = node.left;
    while (theMostRightLeft.right !== null) {
      theMostRightLeft = theMostRightLeft.right;
    }

    node.data = theMostRightLeft.data;
    theMostRightLeft.data = 'toDelete' + theMostRightLeft.data;
    this.remove(theMostRightLeft.data);
  }

  min() {
    let node = this.rootNode;
    while (node.left !== null) {
      node = node.left
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right !== null) {
      node = node.right
    }
    return node.data;
  }

}

module.exports = {
  BinarySearchTree
};