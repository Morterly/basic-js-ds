// const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  arr = []

  getUnderlyingList() {
    return this.arr[0];
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (this.arr.length > 0) {
      this.arr[this.arr.length - 1].next = node;
    }
    this.arr.push(node);
  }

  dequeue() {
    let result = this.arr[0].value;
    this.arr.splice(0, 1);
    return result;
  }
}

module.exports = {
  Queue
};
