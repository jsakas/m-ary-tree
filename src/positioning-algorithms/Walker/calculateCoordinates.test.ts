import calculateCoordinates, { TreeDataPositioned } from "./calculateCoordinates";
import { Tree } from "../../MAryTree";


describe('calculateCoordinates', () => {
  it('sets x and y variables', () => {
    const bt = new Tree(0);

    bt.insert(0, 1);
    bt.insert(0, 2);

    const positionedTree = calculateCoordinates(bt);

    for (const node of positionedTree.preOrderTraversal()) {
      expect(typeof node.data.x).toBe('number');
      expect(typeof node.data.y).toBe('number');
      expect(typeof node.data.width).toBe('number');
      expect(typeof node.data.height).toBe('number');
    }
  });

  it('can calculate x coordinates', () => {
    const bt = new Tree<string>('O');

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

    calculateCoordinates(bt);

    expect(bt.find('O')?.data.x).toEqual(13.5);
    expect(bt.find('E')?.data.x).toEqual(3);
    expect(bt.find('A')?.data.x).toEqual(0);
    expect(bt.find('D')?.data.x).toEqual(6);
    expect(bt.find('B')?.data.x).toEqual(3);
    expect(bt.find('C')?.data.x).toEqual(9);

    // Note: In John Q. Walker's original algorithm, this is modified to 13.5
    // Our algorithm does not account for this offset
    //
    expect(bt.find('F')?.data.x).toEqual(9);

    expect(bt.find('N')?.data.x).toEqual(24);
    expect(bt.find('G')?.data.x).toEqual(21);
    expect(bt.find('M')?.data.x).toEqual(27);
    expect(bt.find('H')?.data.x).toEqual(15);
    expect(bt.find('I')?.data.x).toEqual(21);
    expect(bt.find('J')?.data.x).toEqual(27);
    expect(bt.find('K')?.data.x).toEqual(33);
    expect(bt.find('L')?.data.x).toEqual(39);
  });

  it('can calculate y coordinates', () => {
    const bt = new Tree<string, TreeDataPositioned>('O');

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

    calculateCoordinates(bt);

    expect(bt.find('O')?.data.y).toEqual(0);
    expect(bt.find('E')?.data.y).toEqual(6);
    expect(bt.find('A')?.data.y).toEqual(12);
    expect(bt.find('D')?.data.y).toEqual(12);
    expect(bt.find('B')?.data.y).toEqual(18);
    expect(bt.find('C')?.data.y).toEqual(18);
    expect(bt.find('F')?.data.y).toEqual(6);
    expect(bt.find('N')?.data.y).toEqual(6);
    expect(bt.find('G')?.data.y).toEqual(12);
    expect(bt.find('M')?.data.y).toEqual(12);
    expect(bt.find('H')?.data.y).toEqual(18);
    expect(bt.find('I')?.data.y).toEqual(18);
    expect(bt.find('J')?.data.y).toEqual(18);
    expect(bt.find('K')?.data.y).toEqual(18);
    expect(bt.find('L')?.data.y).toEqual(18);
  });
});