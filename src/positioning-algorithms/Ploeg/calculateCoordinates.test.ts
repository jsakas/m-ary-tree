import calculateCoordinates, { TreeValuePositioned } from "./calculateCoordinates";
import { Tree } from "../../MAryTree";


describe('calculateCoordinates', () => {
  it('can calculate coordinates', () => {
    const bt = new Tree<number, TreeValuePositioned>(0, {
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

    calculateCoordinates(bt);
  });
});