export type MAryTreeKey = string | number;
export type MAryTreeValue = unknown;
export type MAryTreeOptions = {
  maxChildren?: number;
};
export class MAryTreeNode<K = MAryTreeKey, T = MAryTreeValue> {
  /**
   * @memberof MAryTreeNode
   * @member {MAryTreeKey} key key for this node
   */
  key: K;
  /**
   * @memberof MAryTreeNode
   * @member {MAryTreeValue} value information stored on node
   */
  value?: T;
  /**
   * @memberof MAryTreeNode
   * @member {MAryTreeNode} parent reference to this nodes parent
   */
  parent: MAryTreeNode<K, T> | null;
  /**
   * @memberof MAryTreeNode
   * @member {MAryTreeNode[]} children array of child nodes
   */
  children: MAryTreeNode<K, T>[];
  /**
   * @memberof MAryTreeNode
   * @member {MAryTreeNode} leftNeighbor reference to this nodes left neighbor
   */
  leftNeighbor: MAryTreeNode<K, T> | null;

  /**
   * MAryTreeNode constructor
   * 
   * @param {MAryTreeKey} key 
   * @param {MAryTreeValue} value 
   * @param {(MAryTreeNode|null)} parent 
   */
  constructor(key: K, value: T, parent: MAryTreeNode<K, T> | null = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
    this.leftNeighbor = null;
  }

  toJSON() {
    return {
      key: this.key,
      value: this.value,
      parent: this.parent?.key,
      children: this.children,
      leftNeighbor: this.leftNeighbor?.key,
    };
  }

  /**
   * Check if this node is a descendent of a parent.
   * 
   * @param {MAryTreeNode} node the parent node to check against
   * @returns {boolean}
   */
  isDescendant(node? : MAryTreeNode<K, T>) : boolean {
    if (node === this.parent) {
      return true;
    }

    if (this.parent) {
      return this.parent.isDescendant(node);
    }

    return false;
  }

  /**
   * Returns true if this node has no children.
   * @returns {boolean}
   */
  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  /**
   * Returns true if this node has children.
   * @returns {boolean}
   */
  get hasChildren(): boolean {
    return !this.isLeaf;
  }

  /**
   * Returns the index of this node amoung its sibling nodes.
   * @returns {number}
   */
  get siblingIndex(): number {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }

    return 0;
  }

  /**
   * Returns the left sibling of this node if it exists.
   * @returns {(MAryTreeNode|null)} 
   */
  get leftSibling(): MAryTreeNode<K, T> | null {
    if (!this.parent) {
      return null;
    }

    const index = this.siblingIndex;

    if (index > 0) {
      return this.parent.children[index - 1];
    }

    return null;
  }

  *[Symbol.iterator]() {
    if (this.children.length > 0) {
      for (const child of this.children) {
        yield child;
      }
    }
  }
}
export class MAryTree<K = MAryTreeKey, T = MAryTreeValue> {
  /**
   * @memberof MAryTree
   * @member {MAryTreeNode} root reference to the tree's root node
   */
  root: MAryTreeNode<K, T>;
  /**
   * @memberof MAryTree
   * @member {MAryTreeOptions} options stored options passed in on object construction 
   */
  options: MAryTreeOptions;

  /**
   * @param {MAryTreeKey} key 
   * @param {MAryTreeValue} value 
   * @param {MAryTreeOptions} options 
   */
  constructor(key: K, value?: T, options: MAryTreeOptions = {}) {
    this.root = new MAryTreeNode<K, T>(key, value);
    this.options = options;
  }

  /**
   * Generates nodes in an in-order traversal
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *inOrderTraversal(root: MAryTreeNode<K, T> = this.root): Generator<MAryTreeNode<K, T>> {
    const last = root.children && root.children[root.children?.length - 1];

    if (root.children.length > 0) {

      for (const child of root.children) {
        if (child === last) {
          break;
        }

        yield* this.inOrderTraversal(child);
      }
    }

    yield root;

    if (last) {
      yield* this.inOrderTraversal(last);
    }
  }

  /**
   * Generates nodes in a post-order traversal
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *postOrderTraversal(root: MAryTreeNode<K, T> = this.root): Generator<MAryTreeNode<K, T>> {
    if (root.children.length > 0) {
      for (const child of root.children) {
        yield* this.postOrderTraversal(child);
      }
    }

    yield root;
  }

  /**
   * Generates nodes in an pre-order traversal
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *preOrderTraversal(root = this.root): Generator<MAryTreeNode<K, T>> {
    yield root;

    if (root.children.length > 0) {
      for (const child of root.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  /**
   * Generates nodes in an breadth-first traversal
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *breadthFirstTraversal(root = this.root): Generator<MAryTreeNode<K, T>> {
    const collection = [root];

    while (collection.length) {
      const node = collection.shift();

      if (node) {
        yield node;

        if (node.hasChildren) {
          for (const child of node.children) {
            collection.push(child);
          }
        }
      }
    }
  }

  /**
   * Generates nodes at a single depth
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *rowTraversal(n: number): Generator<MAryTreeNode<K, T>> {
    if (n > this.height()) {
      return;
    }

    for (const node of this.breadthFirstTraversal()) {
      if (this.depth(node) === n) {
        yield node;
      }

      if (this.depth(node) > n) {
        return;
      }
    }
  }

  /**
   * Generates left-sibling nodes
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *leftSiblingTraversal(node : MAryTreeNode<K, T>) : Generator<MAryTreeNode<K, T>> {
    let lf = node.leftSibling;
    while (lf) {
      yield lf;

      lf = lf.leftSibling;
    }
  }

  /**
   * Generates left-descendant nodes
   * 
   * @generator
   * @param {MAryTreeNode} root 
   * @yields {MAryTreeNode}
   */
  *leftDescendantTraversal(node: MAryTreeNode<K, T>):  Generator<MAryTreeNode<K, T>> {
    let depth = 1;
    let leftChild = this.leftMostDescendant(node, depth);
    while (leftChild) {
      yield leftChild;

      depth += 1;
      leftChild = this.leftMostDescendant(node, depth);
    }
  }

  /**
   * Return left most descendent for a node.
   * 
   * The left-most descendent is defined as the left most node in the sub-tree at given depth. 
   * 
   * @param {MAryTreeNode} root 
   * @param {number} depth 
   * @returns {(MAryTreeNode|null)}
   */
  leftMostDescendant(root = this.root, depth = 0): MAryTreeNode<K, T> | null {
    for (const node of this.breadthFirstTraversal(root)) {

      if (this.depth(node) - this.depth(root) === depth) {
        return node;
      }
    }

    return null;
  }

  /**
   * Perform a breadth-first traversal and connect all left neighbors by setting
   * MAryTreeNode.leftNeighbor.
   * 
   * The left neighbor is defined as being to the left in the same row, but not part 
   * of the same sub-tree as this nodes parent.
   */
  connectLeftNeighbor() {
    let last = null;
    let depth = 0;

    for (const node of this.breadthFirstTraversal()) {
      if (last && depth === this.depth(node) && node.siblingIndex === 0) {
        node.leftNeighbor = last;
      }

      last = node;
      depth = this.depth(node);
    }
  } 

  /**
   * Insert a new child node at the given parent key.
   *  
   * @param {MAryTreeKey} parentNodeKey
   * @param {MAryTreeKey} key 
   * @param {MAryTreeValue} value 
   * @returns {(MAryTreeNode|null)}
   */
  insert(
    parentNodeKey: K,
    key: K,
    value?: T,
  ): MAryTreeNode<K, T> | null {
    const parent = this.find(parentNodeKey);

    if (parent) {
      const { maxChildren } = this.options;

      if (maxChildren && parent.children.length >= maxChildren) {
        throw new Error('Cannot insert child node: parent already has max children');
      }

      const node = new MAryTreeNode<K, T>(key, value, parent);

      parent.children.push(node);

      return node;
    }

    return null;
  }

  /**
   * Remove a given node by its key
   * 
   * @param {MAryTreeKey} key the tree key to remove
   * @returns {boolean} true if the node was found, false if it was not found.
   */
  remove(key: K) : boolean {
    for (const node of this.preOrderTraversal()) {

      if (node.key === key) {
        if (node.parent) {
          const index = node.siblingIndex;
          node.parent.children.splice(index, 1);

          return true;
        }
      }
    }
    return false;
  }

  /**
   * Find a node by supplying its key.
   * 
   * @param key 
   * @returns {(MAryTreeNode|null)}
   */
  find(key: K) : MAryTreeNode<K, T> | null {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }

    return null;
  }

  /**
   * Return depth of a node.
   * 
   * @param {MAryTreeNode} node 
   * @returns {number}
   */
  depth(node: MAryTreeNode<K, T> = this.root): number {
    if (node?.parent) {
      return this.depth(node.parent) + 1;
    }

    return 0;
  }

  /**
   * Return the height of a node.
   * 
   * @param {MAryTreeNode} node 
   * @returns {number}
   */
  height(node: MAryTreeNode<K, T> = this.root): number {
    if (node.children.length) {
      return Math.max(...node.children.map(c => this.height(c))) + 1;
    }

    return 0;
  }

  *[Symbol.iterator]() {
    if (this.root.children.length > 0) {
      for (const child of this.root.children) {
        yield child;
      }
    }
  }
}