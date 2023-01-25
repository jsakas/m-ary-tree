import { calculateCoordinates } from "./calculateCoordinates";
import { Tree } from "../../MAryTree";


describe('calculateCoordinates', () => {
  it('can calculate coordinates', () => {
    const bt = new Tree(0, {
      width: 60,
      height: 25,
    });

    bt.insert(0, 1, {
      width: 50,
      height: 20,
    });

    bt.insert(0, 2, {
      width: 50,
      height: 60,
    });

    const positionedTree = calculateCoordinates(bt);

    for (const node of positionedTree.preOrderTraversal()) {
      expect(typeof node.data.x).toBe('number');
      expect(typeof node.data.y).toBe('number');
      expect(typeof node.data.width).toBe('number');
      expect(typeof node.data.height).toBe('number');
    }
  });
});