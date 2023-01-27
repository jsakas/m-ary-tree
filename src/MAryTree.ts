export type TreeKey = string | number;
export type TreeData = { [key: string]: unknown };
export type TreeOptions = {
  maxChildren?: number;
};

export function isTree(obj: unknown): obj is Tree {
  return obj instanceof Tree;
}

export class Tree<K = TreeKey, D = TreeData> {
  /**
   * @memberof Tree
   * @member {TreeKey} key key for this node
   */
  key: K;
  /**
   * @memberof Tree
   * @member {TreeData} data information stored on node
   */
  data: D;
  /**
   * @memberof Tree
   * @member {Tree} parent reference to this nodes parent
   */
  parent?: Tree<K, D>;
  /**
   * @memberof Tree
   * @member {TreeOptions} options stored options passed in on object construction 
   */
  options: TreeOptions;
  /**
   * @memberof Tree
   * @member {Tree[]} children array of child nodes
   */
  children: Tree<K, D>[];
  /**
   * @memberof Tree
   * @member {Tree} leftNeighbor reference to this nodes left neighbor
   */
  leftNeighbor: Tree<K, D> | null;

  /**
   * Tree constructor
   * 
   * @param {TreeKey} key 
   * @param {TreeData} data 
   * @param {(Tree|null)} parent 
   * @param {TreeOptions} options 
   */
  constructor(key: K, data: D = null, parent: Tree<K, D> = null, options: TreeOptions = {}) {
    this.key = typeof key !== 'undefined' ? key : null;
    this.data = typeof data !== 'undefined' ? data : null;
    this.parent = typeof parent !== 'undefined' ? parent : null;
    this.options = options || {};
    this.children = [];
    this.leftNeighbor = null;
  }

  toJSON() {
    return {
      key: this.key,
      data: this.data,
      children: this.children,
    };
  }

  /**
   * Check if this node is a descendent of a parent.
   * 
   * @param {Tree} node the parent node to check against
   * @returns {boolean}
   */
  isDescendant(node: Tree<K, D> | null = null): boolean {
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
   * @returns {(Tree|null)} 
   */
  get leftSibling(): Tree<K, D> | null {
    if (!this.parent) {
      return null;
    }

    const index = this.siblingIndex;

    if (index > 0) {
      return this.parent.children[index - 1];
    }

    return null;
  }

  /**
     * Return left most descendent for a node.
     * 
     * The left-most descendent is defined as the left most node in the sub-tree at given depth. 
     * 
     * @param {Tree} root 
     * @param {number} depth 
     * @returns {(Tree|null)}
     */
  leftMostDescendant(depth = 0): Tree<K, D> | null {
    for (const node of breadthFirstTraversal(this)) {

      if (this.depth(node) - this.depth(this) === depth) {
        return node;
      }
    }

    return null;
  }

  /**
   * Perform a breadth-first traversal and connect all left neighbors by setting
   * Tree.leftNeighbor.
   * 
   * The left neighbor is defined as being to the left in the same row, but not part 
   * of the same sub-tree as this nodes parent.
   */
  connectLeftNeighbor() {
    let last = null;
    let depth = 0;

    for (const node of breadthFirstTraversal(this)) {
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
   * @param {TreeData} data 
   * @returns {(Tree|null)}
   */
  insert(
    parentNodeKey: K,
    key: K,
    data?: D | Tree<K, D>,
  ): Tree<K, D> | null {
    const parent = this.find(parentNodeKey);

    if (parent) {
      const { maxChildren } = this.options;

      if (maxChildren && parent.children.length >= maxChildren) {
        throw new Error('Cannot insert child node: parent already has max children');
      }

      if (data instanceof Tree) {
        parent.children.push(data);
        
        data.parent = parent;
        
        return data;
      }

      const node = new Tree<K, D>(key, data as D, parent, this.options);
      parent.children.push(node);

      node.parent = parent;

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
  remove(key: K): boolean {
    for (const node of preOrderTraversal(this)) {

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
   * Find a node by supplying its key, or a callback function
   * 
   * @param {TreeKey | NodeFilter} key 
   * @returns {(Tree|null)}
   */
  find(key: K | ((node: Tree<K, D>) => boolean)): Tree<K, D> | null {
    for (const node of preOrderTraversal(this)) {
      if (typeof key === 'function') {
        try {
          // @ts-ignore
          if (key(node)) {
            return node as Tree<K, D>;
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (node.key === key) return node as Tree<K, D>;
    }

    return null;
  }

  /**
   * Yield modes by filtering them with a callback function
   * 
   * @param {NodeFilter} fn filter callback function 
   * @yields {Tree}
   */
  *filter(fn: ((node: Tree<K, D>) => boolean)): Generator<Tree<K, D>> {
    for (const n of preOrderTraversal(this)) {
      if (fn(n)) {
        yield n;
      }
    }
  }

  /**
   * Return depth of a node.
   * 
   * @param {Tree} node 
   * @returns {number}
   */
  depth(node: Tree<K, D> | null = this): number {
    if (node?.parent) {
      return this.depth(node.parent) + 1;
    }

    return 0;
  }

  /**
   * Return the height of a node.
   * 
   * @param {Tree} node 
   * @returns {number}
   */
  height(node: Tree<K, D> | null = this): number {
    if (node.children.length) {
      return Math.max(...node.children.map(c => this.height(c))) + 1;
    }

    return 0;
  }

  *[Symbol.iterator]() {
    if (this.children.length > 0) {
      for (const child of this.children) {
        yield child;
      }
    }
  }
}

/**
   * Generates nodes in an in-order traversal
   * 
   * @generator
   * @param {Tree} root 
   * @yields {Tree}
   */
export function* inOrderTraversal(root: Tree = this.root): Generator<Tree> {
  const last = root.children && root.children[root.children?.length - 1];

  if (root.children.length > 0) {

    for (const child of root.children) {
      if (child === last) {
        break;
      }

      yield* inOrderTraversal(child);
    }
  }

  yield root;

  if (last) {
    yield* inOrderTraversal(last);
  }
}

/**
 * Generates nodes in a post-order traversal
 * 
 * @generator
 * @param {Tree} root 
 * @yields {Tree}
 */
export function* postOrderTraversal<N extends Tree<any, any>>(root: N): Generator<N> {
  if (root.children.length > 0) {
    for (const child of root.children) {
      yield* postOrderTraversal(child as N);
    }
  }

  yield root;
}

/**
 * Generates nodes in an pre-order traversal
 * 
 * @generator
 * @param {Tree} root 
 * @yields {Tree}
 */
export function* preOrderTraversal<N extends Tree<any, any>>(root: N): Generator<N> {
  yield root;

  if (root.children.length > 0) {
    for (const child of root.children) {
      yield* preOrderTraversal(child as N);
    }
  }
}

/**
 * Generates nodes in an breadth-first traversal
 * 
 * @generator
 * @param {Tree} root 
 * @yields {Tree}
 */
export function* breadthFirstTraversal<N extends Tree<any, any>>(root: N): Generator<N> {
  const collection: any[] = [root];

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
 * @param {Tree} node 
 * @param {number} row depth 
 * @yields {Tree}
 */
export function* rowTraversal<N extends Tree<any, any>>(node: N, row: number): Generator<N> {
  if (row > node.height()) {
    return;
  }

  for (const n of breadthFirstTraversal(node)) {
    if (n.depth(n) === row) {
      yield n;
    }

    if (n.depth(n) > row) {
      return;
    }
  }
}

/**
 * Generates left-sibling nodes
 * 
 * @generator
 * @param {Tree} root 
 * @yields {Tree}
 */
export function* leftSiblingTraversal<N extends Tree<any, any>>(node: N): Generator<N> {
  let lf = node.leftSibling;
  while (lf) {
    yield lf as N;

    lf = lf.leftSibling;
  }
}

/**
 * Generates left-descendant nodes
 * 
 * @generator
 * @param {Tree} root 
 * @yields {Tree}
 */
export function* leftDescendantTraversal<N extends Tree<any, any>>(node: N): Generator<N> {
  let depth = 1;
  let leftChild = node.leftMostDescendant(depth);
  while (leftChild) {
    yield leftChild as N;

    depth += 1;
    leftChild = node.leftMostDescendant(depth);
  }
}