import { MAryTree, MAryTreeNode } from "./MAryTree";

describe('MAryTree', () => {
  it('creates tree with single node', () => {
    const bt = new MAryTree(0);

    expect(bt.root.parent).toBe(null);
    expect(bt.root.children).toEqual([]);
  });

  it('enforces max children', () => {
    const bt = new MAryTree(1, 1, {
      maxChildren: 3,
    });
    
    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);

    expect(() => bt.insert(1, 5)).toThrowError();
  });

  it('can check descendents', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    expect(bt.find(4)?.isDescendant(bt.find(1))).toBe(true);
    expect(bt.find(4)?.isDescendant(bt.find(2))).toBe(true);
    expect(bt.find(4)?.isDescendant(bt.find(3))).toBe(false);
    expect(bt.find(4)?.isDescendant(bt.find(5))).toBe(false);
  });

  it('can get depth', () => {
    const bt = new MAryTree(1);

    expect(bt.depth(bt.root)).toBe(0);

    expect(bt.depth(bt.insert(1, 2))).toBe(1);
    expect(bt.depth(bt.insert(1, 3))).toBe(1);
    expect(bt.depth(bt.insert(2, 4))).toBe(2);
    expect(bt.depth(bt.insert(2, 5))).toBe(2);
    expect(bt.depth(bt.insert(3, 6))).toBe(2);
    expect(bt.depth(bt.insert(5, 7))).toBe(3);
  });

  it('can get height', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    expect(bt.height(bt.find(1))).toEqual(3);
    expect(bt.height(bt.find(2))).toEqual(2);
  });

  it('can get row', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    expect(Array.from(bt.rowTraversal(0)).map(n => n.key)).toEqual([1]);
    expect(Array.from(bt.rowTraversal(1)).map(n => n.key)).toEqual([2, 3]);
    expect(Array.from(bt.rowTraversal(2)).map(n => n.key)).toEqual([4, 5, 6]);
    expect(Array.from(bt.rowTraversal(3)).map(n => n.key)).toEqual([7]);
  });

  it('can connect left neighbor', () => {
    const bt = new MAryTree('O');

    bt.insert('O', 'E');
    bt.insert('O', 'F');
    bt.insert('O', 'N');

    bt.insert('E', 'A');
    bt.insert('E', 'D');

    bt.insert('D', 'B');
    bt.insert('D', 'C');

    bt.insert('N', 'G');
    bt.insert('N', 'M');

    bt.insert('M', 'H');
    bt.insert('M', 'I');
    bt.insert('M', 'J');
    bt.insert('M', 'K');
    bt.insert('M', 'L');

    bt.connectLeftNeighbor();
    
    expect(bt.find('O')?.leftNeighbor?.key).toEqual(undefined);

    expect(bt.find('E')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('F')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('N')?.leftNeighbor?.key).toEqual(undefined);

    expect(bt.find('A')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('D')?.leftNeighbor?.key).toEqual(undefined);

    expect(bt.find('B')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('C')?.leftNeighbor?.key).toEqual(undefined);

    expect(bt.find('G')?.leftNeighbor?.key).toEqual('D');
    expect(bt.find('M')?.leftNeighbor?.key).toEqual(undefined);

    expect(bt.find('H')?.leftNeighbor?.key).toEqual('C');
    expect(bt.find('I')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('J')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('K')?.leftNeighbor?.key).toEqual(undefined);
    expect(bt.find('L')?.leftNeighbor?.key).toEqual(undefined);
  });

  it('can get left most descendant at depth', () => {
    const bt = new MAryTree('O');

    bt.insert('O', 'E');
    bt.insert('O', 'F');
    bt.insert('O', 'N');

    bt.insert('E', 'A');
    bt.insert('E', 'D');

    bt.insert('D', 'B');
    bt.insert('D', 'C');

    bt.insert('N', 'G');
    bt.insert('N', 'M');

    bt.insert('M', 'H');
    bt.insert('M', 'I');
    bt.insert('M', 'J');
    bt.insert('M', 'K');
    bt.insert('M', 'L');

    expect(bt.leftMostDescendant(bt.find('N'), 0)?.key).toEqual('N');
    expect(bt.leftMostDescendant(bt.find('N'), 1)?.key).toEqual('G');
    expect(bt.leftMostDescendant(bt.find('N'), 2)?.key).toEqual('H');
  });

  it('inOrderTraversal', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);
    bt.insert(2, 5);
    bt.insert(2, 6);
    bt.insert(2, 7);

    const a = Array.from(bt.inOrderTraversal()).map(n => n.key);

    expect(a).toEqual([ 5, 6, 2, 7, 3, 1, 4 ]);
  }); 

  it('preOrderTraversal', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);

    const a = Array.from(bt.preOrderTraversal()).map(n => n.key);

    expect(a).toEqual([ 1, 2, 4, 5, 3 ]);
  }); 

  it('postOrderTraversal', () => {
    const bt = new MAryTree('O');

    bt.insert('O', 'E');
    bt.insert('O', 'F');
    bt.insert('O', 'N');

    bt.insert('E', 'A');
    bt.insert('E', 'D');

    bt.insert('D', 'B');
    bt.insert('D', 'C');

    bt.insert('N', 'G');
    bt.insert('N', 'M');

    bt.insert('M', 'H');
    bt.insert('M', 'I');
    bt.insert('M', 'J');
    bt.insert('M', 'K');
    bt.insert('M', 'L');

    const a = Array.from(bt.postOrderTraversal()).map(n => n.key);

    expect(a).toEqual([ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O' ]);
  });

  it('breadthFirstTraversal', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    const a = Array.from(bt.breadthFirstTraversal()).map(n => n.key);

    expect(a).toEqual([ 1, 2, 3, 4, 5, 6, 7]);
  });

  it('leftSiblingTraversal', () => {
    const bt = new MAryTree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);
    bt.insert(1, 5);
    const n = bt.insert(1, 6);
    bt.insert(1, 7);

    const a = Array.from(bt.leftSiblingTraversal(n)).map(n => n.key);

    expect(a).toEqual([ 5, 4, 3, 2 ]);
  });

  it('leftDescendantTraversal', () => {
    const bt = new MAryTree('O');

    bt.insert('O', 'E');
    bt.insert('O', 'F');
    const N = bt.insert('O', 'N');

    bt.insert('E', 'A');
    bt.insert('E', 'D');

    bt.insert('D', 'B');
    bt.insert('D', 'C');

    bt.insert('N', 'G');
    bt.insert('N', 'M');

    bt.insert('M', 'H');
    bt.insert('M', 'I');
    bt.insert('M', 'J');
    bt.insert('M', 'K');
    bt.insert('M', 'L');

    const a = Array.from(bt.leftDescendantTraversal(bt.root)).map(n => n.key);

    expect(a).toEqual([ 'E', 'A', 'B' ]);

    const b = Array.from(bt.leftDescendantTraversal(N)).map(n => n.key);

    expect(b).toEqual([ 'G', 'H' ]);
    
  });
});