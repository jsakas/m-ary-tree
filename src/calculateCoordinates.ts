
import { Tree, TreeKey, TreeNode } from './MAryTree';

export type TreeValuePositioned<T = unknown> = {
  x?: number;
  y?: number;
  prelimX?: number;
  modifier?: number;
  data: T;
};

export type CalculateCoordinatesOptions = {
  nodeWidth?: number;
  nodeHeight?: number;
  nodeSpacingX?: number;
  nodeSpacingY?: number;
};

/**
 * Perform multiple traversals to calculate and store the x, y coordinates for each node
 * based on the node width and spacing options.
 * 
 * This is the core algorithm described in Node-Positioning Algorithm for General Trees by John Q. Walker
 * 
 * Reference: [https://www.cs.unc.edu/techreports/89-034.pdf](https://www.cs.unc.edu/techreports/89-034.pdf)
 */
export default function calculateCoordinates<K = TreeKey>(tree: Tree<K, TreeValuePositioned>, options : CalculateCoordinatesOptions = {}) {
  const {
    nodeWidth = 2,
    nodeSpacingX = 4,
    nodeHeight = 2,
    nodeSpacingY = 4,
  } = options;

  tree.connectLeftNeighbor();

  for (const node of tree.postOrderTraversal()) {
    if (!node.value) {
      node.value = {
        data: undefined,
      };
    }

    node.value.prelimX = 0;
    node.value.modifier = 0;

    if (node.leftSibling) {
      node.value.prelimX = nodeWidth + nodeSpacingX;

      if (node.leftSibling) {
        node.value.prelimX += node.leftSibling.value.prelimX;
      }

      if (node.hasChildren) {
        node.value.modifier = node.value.prelimX - (node.children[0].value.prelimX + node.children[node.children.length - 1].value.prelimX) / 2;
      }
    }

    if (!node.leftSibling) {
      if (node.hasChildren) {
        node.value.prelimX = (node.children[0].value.prelimX + node.children[node.children.length - 1].value.prelimX) / 2;
      }
    }

    for (const leftSibling of tree.leftSiblingTraversal(node)) {
      for (const leftChild of tree.leftDescendantTraversal(node)) {
        if (leftChild.leftNeighbor && leftChild.leftNeighbor.isDescendant(leftSibling)) {
          const leftChildX = calculateX(leftChild);
          const leftNeighborX = calculateX(leftChild.leftNeighbor);

          const diff = leftChildX - leftNeighborX;

          if (diff < (nodeWidth + nodeSpacingX)) {
            const adjustment = nodeWidth + nodeSpacingX - diff;

            node.value.prelimX += adjustment;
            node.value.modifier += adjustment;
          }
        }
      }
    }
  }

  for (const node of tree.preOrderTraversal()) {
    node.value.x = calculateX(node);
    node.value.y = (nodeSpacingY + nodeHeight) * tree.depth(node);
  }
}

/**
 * Calculate the X coordinate. 
 * 
 * Warning: Do not use this method directly. Call `calculateCoordinates` instead.
 * 
 * @private
 * @param {TreeNode} node 
 * @returns {number}
 */
function calculateX<K = TreeKey>(node: TreeNode<K, TreeValuePositioned>): number {
  let x = node.value.prelimX;

  let parent = node.parent;

  while (parent) {
    x += parent.value?.modifier || 0;
    parent = parent.parent;
  }

  return x;
}
