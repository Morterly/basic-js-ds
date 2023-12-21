// const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  node

  root() {
    return !this.node ? null : this.node;
  }

  add(value) {
    if (!this.node) {
      this.node = this.nodeAdd(value, this.node);
    }
    if (value > this.node.data) {
      this.node.right = this.nodeAdd(value, this.node.right);
    } else if (value < this.node.data) {
      this.node.left = this.nodeAdd(value, this.node.left);
    }
  }

  nodeAdd(value, node) {
    if (!node) {
      node = new Node(value);
    }

    if (value > node.data) {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        node.right = this.nodeAdd(value, node.right);
      }
    } else if (value < node.data) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        node.left = this.nodeAdd(value, node.left);
      }
    }
    return node;
  }

  has(data) {
    if (!this.node) {
      return false;
    }
    let newNode = this.node;
    while (newNode) {
      // console.log(newNode);
      if (newNode.data === data) {
        return true;
      }
      if (data > newNode.data) {
        newNode = newNode.right;
      } else if (data < newNode.data) {
        newNode = newNode.left;
      }
    }
    return false;
  }

  find(data) {
    if (!this.node) {
      return null;
    }
    let newNode = this.node;
    while (newNode) {
      if (newNode.data === data) {
        return newNode;
      }
      if (data > newNode.data) {
        newNode = newNode.right;
      } else if (data < newNode.data) {
        newNode = newNode.left;
      }
    }
    return null;
  }

  remove(data) {
    let currentNode = this.find(data);
    if (!currentNode) {
      return;
    }
    let parentNode = this.findParentNode(data);

    if (!currentNode.right && !currentNode.left) {
      parentNode.right === currentNode ? parentNode.right = null : parentNode.left = null;
    } else if (currentNode.right && !currentNode.left) {
      if (parentNode === currentNode) {
        this.node = parentNode.right;
      } else {
        parentNode.right === currentNode ? parentNode.right = currentNode.right : parentNode.left = currentNode.right;
      }
    } else if (!currentNode.right && currentNode.left) {
      if (parentNode === currentNode) {
        this.node = parentNode.left;
      } else {
        parentNode.right === currentNode ? parentNode.right = currentNode.left : parentNode.left = currentNode.left;
      }
      
    } else {
      let minNode = this.currentNodeMinMax(currentNode.right, 'min');
      let minParentNode = this.findParentNode(minNode.data);

      if (minParentNode.left === minNode) {
        minParentNode.left = minNode.right;
      }
      if (minParentNode.right === minNode) {
        minParentNode.right = minNode.right;
      }

      minNode.left = currentNode.left;
      minNode.right = currentNode.right;

      if (currentNode === this.node) {
        this.node = minNode;
      } else {
        parentNode.right === currentNode ? parentNode.right = minNode : parentNode.left = minNode;
      }
    }
  }

  findParentNode(data) {
    if (this.node.data === data) {
      return this.node;
    }
    let newNode = this.node;
    while (newNode) {
      if ((newNode.right && newNode.right.data === data) || (newNode.left && newNode.left.data === data)) {
        return newNode;
      }
      if (data > newNode.data) {
        newNode = newNode.right;
      } else if (data < newNode.data) {
        newNode = newNode.left;
      }
    }
  }

  currentNodeMinMax(node, type) {
    let value = node;
    if (type === 'min') {
      while (node) {
        value = node;
        node = node.left;
      }
    } else if (type === 'max') {
      while (node) {
        value = node;
        node = node.right;
      }
    }
    return value;
  }

  min() {
    return this.currentNodeMinMax(this.node, 'min').data;
  }

  max() {
    return this.currentNodeMinMax(this.node, 'max').data;
  }
}

module.exports = {
  BinarySearchTree
};