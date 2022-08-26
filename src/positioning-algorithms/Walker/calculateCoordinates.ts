
/** 
 * This is the algorithm described in "Node-Positioning Algorithm for General Trees" by John Q. Walker
 * 
 * Reference: https://www.cs.unc.edu/techreports/89-034.pdf
 */
import { Tree, TreeKey, TreeNode, TreeData } from '../../MAryTree';

export type TreeDataPositioned<D = TreeData> = D & {
  x: number;
  y: number;
  width: number;
  height: number;
  prelimX?: number;
  modifier?: number;
};

export type CalculateCoordinatesOptions = {
  nodeWidth?: number;
  nodeHeight?: number;
  nodeSpacingX?: number;
  nodeSpacingY?: number;
};

export default function calculateCoordinates<K, D extends Partial<TreeDataPositioned>>(tree: Tree<K, D>, options: CalculateCoordinatesOptions = {}) : Tree<K, TreeDataPositioned<D>> {
  const {
    nodeWidth = 2,
    nodeSpacingX = 4,
    nodeHeight = 2,
    nodeSpacingY = 4,
  } = options;

  tree.connectLeftNeighbor();

  for (const node of (tree as unknown as Tree<K, TreeDataPositioned<D>>).postOrderTraversal()) {
    if (!node.data) {
      node.data = {} as TreeDataPositioned<D>;
    }

    node.data.x = 0;
    node.data.y = 0;
    node.data.prelimX = 0;
    node.data.modifier = 0;
    node.data.width = nodeWidth;
    node.data.height = nodeHeight;

    if (node.leftSibling) {
      node.data.prelimX = nodeWidth + nodeSpacingX;

      if (node.leftSibling) {
        node.data.prelimX += node.leftSibling.data.prelimX;
      }

      if (node.hasChildren) {
        node.data.modifier = node.data.prelimX - (node.children[0].data.prelimX + node.children[node.children.length - 1].data.prelimX) / 2;
      }
    }

    if (!node.leftSibling) {
      if (node.hasChildren) {
        node.data.prelimX = (node.children[0].data.prelimX + node.children[node.children.length - 1].data.prelimX) / 2;
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

            node.data.prelimX += adjustment;
            node.data.modifier += adjustment;
          }
        }
      }
    }
  }

  for (const node of tree.preOrderTraversal()) {
    node.data.x = calculateX(node);
    node.data.y = (nodeSpacingY + nodeHeight) * tree.depth(node);
  }

  return tree as Tree<K, TreeDataPositioned<D>>;
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
function calculateX<K = TreeKey>(node: TreeNode<K, Partial<TreeDataPositioned>>): number {
  let x = node.data.prelimX;

  let parent = node.parent;

  while (parent) {
    x += parent.data?.modifier || 0;
    parent = parent.parent;
  }

  return x;
}
