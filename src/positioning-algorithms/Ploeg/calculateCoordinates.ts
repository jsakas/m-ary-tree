
/** 
 * This is the algorithm described in "Drawing non-layered tidy trees in linear time" by Atze van der Ploeg
 * 
 * Reference: https://core.ac.uk/download/pdf/301654972.pdf
 */
import { Tree, TreeKey, TreeData, breadthFirstTraversal } from '../../MAryTree';

export type TreeDataPositioned<K = TreeKey, D = TreeData> = TreeData & {
  width: number;
  height: number;
  x: number;
  y: number;
  spacingY?: number;
  spacingTop?: number;
  spacingBottom?: number;
  prelim?: number;
  mod?: number;
  shift?: number;
  change?: number;
  tl?: Tree<K, TreeDataPositioned<K, D>> | null;
  tr?: Tree<K, TreeDataPositioned<K, D>> | null;
  el?: Tree<K, TreeDataPositioned<K, D>> | null;
  er?: Tree<K, TreeDataPositioned<K, D>> | null;
  msel?: number;
  mser?: number;
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

export function calculateCoordinates<K, D>(tree: Tree<K, D>, options: CalculateCoordinatesOptions = {}) : Tree<K, TreeDataPositioned<K, D>> {
  const {
    nodeSpacingX = 4,
    nodeSpacingY = 4,
  } = options;

  // Set initial y value for each node
  for (const node of breadthFirstTraversal((tree as unknown as Tree<K, TreeDataPositioned<K, D>>))) {
    const parentNode = node.parent;

    if (parentNode) {
      let parentNodeSpacingBottom = nodeSpacingY;

      if (typeof node?.parent?.data?.spacingBottom === 'number') {
        parentNodeSpacingBottom = node.parent.data.spacingBottom;
      } else if (typeof node?.parent?.data?.spacingY === 'number') {
        parentNodeSpacingBottom = node.parent.data.spacingY;
      }

      let nodeSpacingTop = nodeSpacingY;

      if (typeof node?.data?.spacingTop === 'number') {
        nodeSpacingTop = node.data.spacingTop;
      } else if (typeof node?.data?.spacingY === 'number') {
        nodeSpacingTop = node.data.spacingY;
      }

      const spacingY = Math.max(parentNodeSpacingBottom, nodeSpacingTop);

      node.data.y = parentNode.data.y + parentNode.data.height + spacingY;
    } else {
      node.data.y = 0;
    }

    node.data.x = 0;
    node.data.prelim = 0;
    node.data.mod = 0;
    node.data.shift = 0;
    node.data.change = 0;
    node.data.tl = null;
    node.data.tr = null;
    node.data.el = null;
    node.data.er = null;
    node.data.msel = 0;
    node.data.mser = 0;
  }

  function firstWalk(node: Tree<K, TreeDataPositioned<K, D>>): void {
    if (node.children.length == 0) { setExtremes(node); return; }
    firstWalk(node.children[0]);
    // Create siblings in contour minimal vertical coordinate and index list.}^
    let ih = updateIYL(bottom(node.children[0].data.el), 0, null);
    for (let i = 1; i < node.children.length; i++) {
      firstWalk(node.children[i]);
      //Store lowest vertical coordinate while extreme nodes still point in current subtree.}^
      const minY = bottom(node.children[i].data.er);
      seperate(node, i, ih);
      ih = updateIYL(minY, i, ih);
    }
    positionRoot(node);
    setExtremes(node);
  }

  function setExtremes(node: Tree<K, TreeDataPositioned<K, D>>) {
    if (node.children.length == 0) {
      node.data.el = node;
      node.data.er = node;
      node.data.msel = 0;
      node.data.mser = 0;
    } else {
      node.data.el = node.children[0].data.el;
      node.data.msel = node.children[0].data.msel;
      node.data.er = node.children[node.children.length - 1].data.er;
      node.data.mser = node.children[node.children.length - 1].data.mser;
    }
  }

  function seperate(node: Tree<K, TreeDataPositioned<K, D>>, i: number, ih: IYL) {
    // Right contour node of left sibling and its sum of modifiers
    let sr = node.children[i - 1];
    let mssr = sr.data.mod;
    // Left contour node of current subtree and its sum of modifiers
    let cl = node.children[i];
    let mscl = cl.data.mod;

    while (sr !== null && cl !== null) {
      if (bottom(sr) > ih.lowY) {
        ih = ih.nxt;
      }

      // How far to the left of the right side of sr is the left side of cl?
      const dist = (mssr + sr.data.prelim + sr.data.width + nodeSpacingX) - (mscl + cl.data.prelim);

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
          mssr += sr.data.mod;
        }
      }

      if (sy >= cy) {
        cl = nextLeftContour(cl);

        if (cl !== null) {
          mscl += cl.data.mod;
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

  function moveSubtree(node: Tree<K, TreeDataPositioned<K, D>>, i: number, si: number, dist: number) {
    // Move subtree by changing mod.
    node.children[i].data.mod += dist;
    node.children[i].data.msel += dist;
    node.children[i].data.mser += dist;

    distributeExtra(node, i, si, dist);
  }

  function nextLeftContour(node: Tree<K, TreeDataPositioned<K, D>>): Tree<K, TreeDataPositioned<K, D>> {
    return node.children.length == 0 ? node.data.tl : node.children[0];
  }

  function nextRightContour(node: Tree<K, TreeDataPositioned<K, D>>): Tree<K, TreeDataPositioned<K, D>> {
    return node.children.length == 0 ? node.data.tr : node.children[node.children.length - 1];
  }

  function bottom(node: Tree<K, TreeDataPositioned<K, D>>): number {
    return node.data.y + node.data.height;
  }

  function setLeftThread(node: Tree<K, TreeDataPositioned<K, D>>, i: number, cl: Tree<K, TreeDataPositioned<K, D>>, modsumcl: number): void {
    const li = node.children[0].data.el;
    li.data.tl = cl;
    // Change mod so that the sum of modifier after following thread is correct.}^  
    const diff = (modsumcl - cl.data.mod) - node.children[0].data.msel;
    li.data.mod += diff;
    // Change preliminary x coordinate so that the node does not move.}^  
    li.data.prelim -= diff;
    // Update extreme node and its sum of modifiers.}^  
    node.children[0].data.el = node.children[i].data.el;
    node.children[0].data.msel = node.children[i].data.msel;
  }

  // Symetrical to setLeftThread.
  function setRightThread(node: Tree<K, TreeDataPositioned<K, D>>, i: number, sr: Tree<K, TreeDataPositioned<K, D>>, modsumsr: number): void {
    const ri = node.children[i].data.er;
    ri.data.tr = sr;
    const diff = (modsumsr - sr.data.mod) - node.children[i].data.mser;
    ri.data.mod += diff;
    ri.data.prelim -= diff;
    node.children[i].data.er = node.children[i - 1].data.er; node.children[i].data.mser = node.children[i - 1].data.mser;
  }

  function positionRoot(node: Tree<K, TreeDataPositioned<K, D>>) {
    // Position root between children, taking into account their mod.
    node.data.prelim = (node.children[0].data.prelim + node.children[0].data.mod + node.children[node.children.length - 1].data.mod +
      node.children[node.children.length - 1].data.prelim + node.children[node.children.length - 1].data.width) / 2 - node.data.width / 2;
  }

  function secondWalk(node: Tree<K, TreeDataPositioned<K, D>>, modsum: number): void {
    modsum += node.data.mod;
    // Set absolute (non-relative) horizontal coordinate.
    node.data.x = node.data.prelim + modsum;
    addChildSpacing(node);
    for (let i = 0; i < node.children.length; i++) {
      secondWalk(node.children[i], modsum);
    }
  }

  function distributeExtra(node: Tree<K, TreeDataPositioned<K, D>>, i: number, si: number, dist: number): void {
    // Are there intermediate children?
    if (si != i - 1) {
      const nr = i - si;
      node.children[si + 1].data.shift += dist / nr;
      node.children[i].data.shift -= dist / nr;
      node.children[i].data.change -= dist - dist / nr;
    }
  }

  function addChildSpacing(node: Tree<K, TreeDataPositioned<K, D>>): void {
    let d = 0;
    let modsumdelta = 0;

    for (let i = 0; i < node.children.length; i++) {
      d += node.children[i].data.shift;
      modsumdelta += d + node.children[i].data.change;
      node.children[i].data.mod += modsumdelta;
    }
  }

  function layout() {
    firstWalk((tree as unknown as Tree<K, TreeDataPositioned<K, D>>));
    secondWalk((tree as unknown as Tree<K, TreeDataPositioned<K, D>>), 0);
  }

  layout();

  return tree as unknown as Tree<K, TreeDataPositioned<K, D>>;
}

export default calculateCoordinates;
