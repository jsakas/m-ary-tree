export type TreeKey = string | number;
export type TreeValue = unknown;
export type TreeOptions = {
  maxChildren?: number;
};
export class TreeNode<K = TreeKey, T = TreeValue> {
  /**
   * @memberof TreeNode
   * @member {TreeKey} key key for this node
   */
  key: K;
  /**
   * @memberof TreeNode
   * @member {TreeValue} value information stored on node
   */
  value: T;
  /**
   * @memberof TreeNode
   * @member {TreeNode} parent reference to this nodes parent
   */
  parent: TreeNode<K, T> | null;
  /**
   * @memberof TreeNode
   * @member {TreeNode[]} children array of child nodes
   */
  children: TreeNode<K, T>[];
  /**
   * @memberof TreeNode
   * @member {TreeNode} leftNeighbor reference to this nodes left neighbor
   */
  leftNeighbor: TreeNode<K, T> | null;

  /**
   * TreeNode constructor
   * 
   * @param {TreeKey} key 
   * @param {TreeValue} value 
   * @param {(TreeNode|null)} parent 
   */
  constructor(key: K, value: T, parent: TreeNode<K, T> | null = null) {
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
   * @param {TreeNode} node the parent node to check against
   * @returns {boolean}
   */
  isDescendant(node : TreeNode<K, T> | null = null) : boolean {
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
   * @returns {(TreeNode|null)} 
   */
  get leftSibling(): TreeNode<K, T> | null {
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
export class Tree<K = TreeKey, T = TreeValue> {
  /**
   * @memberof Tree
   * @member {TreeNode} root reference to the tree's root node
   */
  root: TreeNode<K, T>;
  /**
   * @memberof Tree
   * @member {TreeOptions} options stored options passed in on object construction 
   */
  options: TreeOptions;

  /**
   * @param {TreeKey} key 
   * @param {TreeValue} value 
   * @param {TreeOptions} options 
   */
  constructor(key: K, value?: T, options: TreeOptions = {}) {
    this.root = new TreeNode<K, T>(key, value);
    this.options = options;
  }

  /**
   * Generates nodes in an in-order traversal
   * 
   * @generator
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *inOrderTraversal(root: TreeNode<K, T> = this.root): Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *postOrderTraversal(root: TreeNode<K, T> = this.root): Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *preOrderTraversal(root = this.root): Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *breadthFirstTraversal(root = this.root): Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *rowTraversal(n: number): Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *leftSiblingTraversal(node : TreeNode<K, T> | null = null) : Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @yields {TreeNode}
   */
  *leftDescendantTraversal(node: TreeNode<K, T> | null = null):  Generator<TreeNode<K, T>> {
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
   * @param {TreeNode} root 
   * @param {number} depth 
   * @returns {(TreeNode|null)}
   */
  leftMostDescendant(root : TreeNode<K, T> | null = this.root, depth = 0): TreeNode<K, T> | null {
    for (const node of this.breadthFirstTraversal(root)) {

      if (this.depth(node) - this.depth(root) === depth) {
        return node;
      }
    }

    return null;
  }

  /**
   * Perform a breadth-first traversal and connect all left neighbors by setting
   * TreeNode.leftNeighbor.
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
   * @param {TreeKey} parentNodeKey
   * @param {TreeKey} key 
   * @param {TreeValue} value 
   * @returns {(TreeNode|null)}
   */
  insert(
    parentNodeKey: K,
    key: K,
    value?: T | Tree<K, T>,
  ): TreeNode<K, T> | null {
    const parent = this.find(parentNodeKey);

    if (parent) {
      const { maxChildren } = this.options;

      if (maxChildren && parent.children.length >= maxChildren) {
        throw new Error('Cannot insert child node: parent already has max children');
      }

      let node : TreeNode<K, T> | null = null;

      if (value && 'root' in value) {
        node = new TreeNode<K, T>(key, value.root.value, parent);

        for (const child of value.root.children) {
          child.parent = node;
          node.children.push(child);
        }
      } else {
        node = new TreeNode<K, T>(key, value as T, parent);
      }
      
      parent.children.push(node);
  
      return node;
    }

    return null;
  }

  /**
   * Remove a given node by its key
   * 
   * @param {TreeKey} key the tree key to remove
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
   * @returns {(TreeNode|null)}
   */
  find(key: K) : TreeNode<K, T> | null {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }

    return null;
  }

  /**
   * Return depth of a node.
   * 
   * @param {TreeNode} node 
   * @returns {number}
   */
  depth(node: TreeNode<K, T> | null = this.root): number {
    if (node?.parent) {
      return this.depth(node.parent) + 1;
    }

    return 0;
  }

  /**
   * Return the height of a node.
   * 
   * @param {TreeNode} node 
   * @returns {number}
   */
  height(node: TreeNode<K, T> | null = this.root): number {
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