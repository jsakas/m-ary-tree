import { breadthFirstTraversal, inOrderTraversal, leftDescendantTraversal, leftSiblingTraversal, postOrderTraversal, preOrderTraversal, rowTraversal, Tree } from "./MAryTree";

describe('Tree', () => {
  it('creates tree with single node', () => {
    const bt = new Tree(0);

    expect(bt.parent).toBe(null);
    expect(bt.children).toEqual([]);
  });

  it('enforces max children', () => {
    const bt = new Tree(1, 1, null, {
      maxChildren: 3,
    });

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);

    expect(() => bt.insert(1, 5)).toThrowError();
  });

  it('can use primitives as data', () => {
    const tree = new Tree<number, string>(0, 'foo');

    expect(tree.data).toEqual('foo');
  });

  it('can use objects as data', () => {
    const tree = new Tree<number, { foo: string }>(0, { foo: 'bar' });

    expect(tree.data.foo).toEqual('bar');
  });

  it('can be converted to json', () => {
    const tree = new Tree(0);

    tree.insert(0, 1);
    tree.insert(0, 2);

    const json = JSON.stringify(tree);

    expect(JSON.parse(json)).toEqual({ 
      key: 0, 
      data: null,
      children: [
        {
          key: 1,
          data: null,
          children: []
        },
        {
          key: 2,
          data: null,
          children: []
        }
      ],
    });
  });

  it('can check descendents', () => {
    const bt = new Tree(1);

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
    const bt = new Tree(1);

    expect(bt.depth(bt)).toBe(0);

    expect(bt.depth(bt.insert(1, 2))).toBe(1);
    expect(bt.depth(bt.insert(1, 3))).toBe(1);
    expect(bt.depth(bt.insert(2, 4))).toBe(2);
    expect(bt.depth(bt.insert(2, 5))).toBe(2);
    expect(bt.depth(bt.insert(3, 6))).toBe(2);
    expect(bt.depth(bt.insert(5, 7))).toBe(3);
  });

  it('can get height', () => {
    const bt = new Tree(1);

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
    const bt = new Tree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    expect(Array.from(rowTraversal(bt, 0)).map(n => n.key)).toEqual([1]);
    expect(Array.from(rowTraversal(bt, 1)).map(n => n.key)).toEqual([2, 3]);
    expect(Array.from(rowTraversal(bt, 2)).map(n => n.key)).toEqual([4, 5, 6]);
  });

  it('can connect left neighbor', () => {
    const bt = new Tree('O');

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

  it.only('can get left most descendant at depth', () => {
    const bt = new Tree('O');

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

    expect(bt.find('N').leftMostDescendant(0)?.key).toEqual('N');
    expect(bt.find('N').leftMostDescendant(1)?.key).toEqual('G');
    expect(bt.find('N').leftMostDescendant(2)?.key).toEqual('H');
  });

  it('inOrderTraversal', () => {
    const bt = new Tree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);
    bt.insert(2, 5);
    bt.insert(2, 6);
    bt.insert(2, 7);

    const a = Array.from(inOrderTraversal(bt)).map(n => n.key);

    expect(a).toEqual([5, 6, 2, 7, 3, 1, 4]);
  });

  it('preOrderTraversal', () => {
    const bt = new Tree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);

    const a = Array.from(preOrderTraversal(bt)).map(n => n.key);

    expect(a).toEqual([1, 2, 4, 5, 3]);
  });

  it('postOrderTraversal', () => {
    const bt = new Tree('O');

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

    const a = Array.from(postOrderTraversal(bt)).map(n => n.key);

    expect(a).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']);
  });

  it('breadthFirstTraversal', () => {
    const bt = new Tree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(2, 4);
    bt.insert(2, 5);
    bt.insert(3, 6);
    bt.insert(5, 7);

    const a = Array.from(breadthFirstTraversal(bt)).map(n => n.key);

    expect(a).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('leftSiblingTraversal', () => {
    const bt = new Tree(1);

    bt.insert(1, 2);
    bt.insert(1, 3);
    bt.insert(1, 4);
    bt.insert(1, 5);
    const n = bt.insert(1, 6);
    bt.insert(1, 7);

    const a = Array.from(leftSiblingTraversal(n)).map(n => n.key);

    expect(a).toEqual([5, 4, 3, 2]);
  });

  it('leftDescendantTraversal', () => {
    const bt = new Tree('O');

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

    const a = Array.from(leftDescendantTraversal(bt)).map(n => n.key);

    expect(a).toEqual(['E', 'A', 'B']);

    const b = Array.from(leftDescendantTraversal(N)).map(n => n.key);

    expect(b).toEqual(['G', 'H']);

  });

  it('can combine trees', () => {
    const bt1 = new Tree(1);

    const bt2 = new Tree(2);

    bt2.insert(2, 4);
    bt2.insert(2, 5);
    bt2.insert(5, 7);

    bt1.insert(1, 2, bt2);

    bt1.insert(1, 3);
    bt1.insert(3, 6);

    const a = Array.from(breadthFirstTraversal(bt1)).map(n => n.key);

    expect(a).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});