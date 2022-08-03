
/** 
 * This is the algorithm described in "Drawing non-layered tidy trees in linear time" by Atze van der Ploeg
 * 
 * Reference: https://core.ac.uk/download/pdf/301654972.pdf
 */
import { Tree, TreeKey, TreeNode, TreeValue } from '../../MAryTree';

export type TreeValuePositioned<K = TreeKey, V = TreeValue> = {
  width: number;
  height: number;
  x?: number;
  y?: number;
  prelim?: number;
  mod?: number;
  shift?: number;
  change?: number;
  tl?: TreeNode<K, TreeValuePositioned<K, V>> | null;
  tr?: TreeNode<K, TreeValuePositioned<K, V>> | null;
  el?: TreeNode<K, TreeValuePositioned<K, V>> | null;
  er?: TreeNode<K, TreeValuePositioned<K, V>> | null;
  msel?: number;
  mser?: number;
  data?: V;
};

export type CalculateCoordinatesOptions = {
  nodeSpacingX?: number;
  nodeSpacingY?: number;
};

export class IYL {
  lowY: number;
  index: number;
  nxt: IYL;

  constructor(lowY: number, index: number, nxt: IYL) {
    this.lowY = lowY;
    this.index = index;
    this.nxt = nxt;
  }
}

export function updateIYL(minY: number, i: number, ih: IYL): IYL {
  // Remove siblings that are hidden by the new subtree.
  while (ih != null && minY >= ih.lowY) {
    ih = ih.nxt;
  }

  return new IYL(minY, i, ih);
}

export default function calculateCoordinates<K, V>(tree: Tree<K, TreeValuePositioned<K, V>>, options: CalculateCoordinatesOptions = {}) {
  const {
    nodeSpacingX = 4,
    nodeSpacingY = 4,
  } = options;

  // Set initial y value for each node
  for (const node of tree.breadthFirstTraversal()) {
    const parentNode = node.parent;

    if (parentNode) {
      node.value.y = parentNode.value.y + parentNode.value.height + nodeSpacingY;
    } else {
      node.value.y = 0;
    }

    node.value.x = 0;
    node.value.prelim = 0;
    node.value.mod = 0;
    node.value.shift = 0;
    node.value.change = 0;
    node.value.tl = null;
    node.value.tr = null;
    node.value.el = null;
    node.value.er = null;
    node.value.msel = 0;
    node.value.mser = 0;
  }

  function firstWalk(node: TreeNode<K, TreeValuePositioned<K, V>>): void {
    if (node.children.length == 0) { setExtremes(node); return; }
    firstWalk(node.children[0]);
    // Create siblings in contour minimal vertical coordinate and index list.}^
    let ih = updateIYL(bottom(node.children[0].value.el), 0, null);
    for (let i = 1; i < node.children.length; i++) {
      firstWalk(node.children[i]);
      //Store lowest vertical coordinate while extreme nodes still point in current subtree.}^
      const minY = bottom(node.children[i].value.er);
      seperate(node, i, ih);
      ih = updateIYL(minY, i, ih);
    }
    positionRoot(node);
    setExtremes(node);
  }

  function setExtremes(node: TreeNode<K, TreeValuePositioned<K, V>>) {
    if (node.children.length == 0) {
      node.value.el = node;
      node.value.er = node;
      node.value.msel = 0;
      node.value.mser = 0;
    } else {
      node.value.el = node.children[0].value.el;
      node.value.msel = node.children[0].value.msel;
      node.value.er = node.children[node.children.length - 1].value.er;
      node.value.mser = node.children[node.children.length - 1].value.mser;
    }
  }

  function seperate(node: TreeNode<K, TreeValuePositioned<K, V>>, i: number, ih: IYL) {
    // Right contour node of left sibling and its sum of modifiers
    let sr = node.children[i - 1];
    let mssr = sr.value.mod;
    // Left contour node of current subtree and its sum of modifiers
    let cl = node.children[i];
    let mscl = cl.value.mod;

    while (sr !== null && cl !== null) {
      if (bottom(sr) > ih.lowY) {
        ih = ih.nxt;
      }

      // How far to the left of the right side of sr is the left side of cl?
      const dist = (mssr + sr.value.prelim + sr.value.width + nodeSpacingX) - (mscl + cl.value.prelim);

      if (dist > 0) {
        mscl += dist;
        moveSubtree(node, i, ih.index, dist);
      }

      const sy = bottom(sr);
      const cy = bottom(cl);
      // Advance highest node(s) and sum(s) of modifiers (Coordinate system increases
      // downwards)
      if (sy < cy) {
        sr = nextRightContour(sr);

        if (sr !== null) {
          mssr += sr.value.mod;
        }
      }

      if (sy >= cy) {
        cl = nextLeftContour(cl);

        if (cl !== null) {
          mscl += cl.value.mod;
        }
      }
    }

    // Set threads and update extreme nodes.
    // In the first case, the current subtree must be taller than the left siblings
    if (sr == null && cl != null) {
      setLeftThread(node, i, cl, mscl);
    }

    // In this case, the left siblings must be taller than the current subtree.
    else if (sr != null && cl == null) {
      setRightThread(node, i, sr, mssr);
    }
  }

  function moveSubtree(node: TreeNode<K, TreeValuePositioned<K, V>>, i: number, si: number, dist: number) {
    // Move subtree by changing mod.
    node.children[i].value.mod += dist;
    node.children[i].value.msel += dist;
    node.children[i].value.mser += dist;

    distributeExtra(node, i, si, dist);
  }

  function nextLeftContour(node: TreeNode<K, TreeValuePositioned<K, V>>): TreeNode<K, TreeValuePositioned<K, V>> {
    return node.children.length == 0 ? node.value.tl : node.children[0];
  }

  function nextRightContour(node: TreeNode<K, TreeValuePositioned<K, V>>): TreeNode<K, TreeValuePositioned<K, V>> {
    return node.children.length == 0 ? node.value.tr : node.children[node.children.length - 1];
  }

  function bottom(node: TreeNode<K, TreeValuePositioned<K, V>>): number {
    return node.value.y + node.value.height;
  }

  function setLeftThread(node: TreeNode<K, TreeValuePositioned<K, V>>, i: number, cl: TreeNode<K, TreeValuePositioned<K, V>>, modsumcl: number): void {
    const li = node.children[0].value.el;
    li.value.tl = cl;
    // Change mod so that the sum of modifier after following thread is correct.}^  
    const diff = (modsumcl - cl.value.mod) - node.children[0].value.msel;
    li.value.mod += diff;
    // Change preliminary x coordinate so that the node does not move.}^  
    li.value.prelim -= diff;
    // Update extreme node and its sum of modifiers.}^  
    node.children[0].value.el = node.children[i].value.el;
    node.children[0].value.msel = node.children[i].value.msel;
  }

  // Symetrical to setLeftThread.
  function setRightThread(node: TreeNode<K, TreeValuePositioned<K, V>>, i: number, sr: TreeNode<K, TreeValuePositioned<K, V>>, modsumsr: number): void {
    const ri = node.children[i].value.er;
    ri.value.tr = sr;
    const diff = (modsumsr - sr.value.mod) - node.children[i].value.mser;
    ri.value.mod += diff;
    ri.value.prelim -= diff;
    node.children[i].value.er = node.children[i - 1].value.er; node.children[i].value.mser = node.children[i - 1].value.mser;
  }

  function positionRoot(node: TreeNode<K, TreeValuePositioned<K, V>>) {
    // Position root between children, taking into account their mod.
    node.value.prelim = (node.children[0].value.prelim + node.children[0].value.mod + node.children[node.children.length - 1].value.mod +
      node.children[node.children.length - 1].value.prelim + node.children[node.children.length - 1].value.width) / 2 - node.value.width / 2;
  }

  function secondWalk(node: TreeNode<K, TreeValuePositioned<K, V>>, modsum: number): void {
    modsum += node.value.mod;
    // Set absolute (non-relative) horizontal coordinate.
    node.value.x = node.value.prelim + modsum;
    addChildSpacing(node);
    for (let i = 0; i < node.children.length; i++) {
      secondWalk(node.children[i], modsum);
    }
  }

  function distributeExtra(node: TreeNode<K, TreeValuePositioned<K, V>>, i: number, si: number, dist: number): void {
    // Are there intermediate children?
    if (si != i - 1) {
      const nr = i - si;
      node.children[si + 1].value.shift += dist / nr;
      node.children[i].value.shift -= dist / nr;
      node.children[i].value.change -= dist - dist / nr;
    }
  }

  function addChildSpacing(node: TreeNode<K, TreeValuePositioned<K, V>>): void {
    let d = 0;
    let modsumdelta = 0;

    for (let i = 0; i < node.children.length; i++) {
      d += node.children[i].value.shift;
      modsumdelta += d + node.children[i].value.change;
      node.children[i].value.mod += modsumdelta;
    }
  }

  function layout() {
    firstWalk(tree.root);
    secondWalk(tree.root, 0);
  }

  layout();
}
