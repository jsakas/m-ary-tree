import calculateCoordinates, { MAryTreeValuePositioned } from "./calculateCoordinates";
import { MAryTree } from "./MAryTree";


describe('calculateCoordinates', () => {
  it('can calculate x coordinates', () => {
    const bt = new MAryTree<string, MAryTreeValuePositioned>('O');

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

    expect(bt.find('O')?.value.x).toEqual(13.5);
    expect(bt.find('E')?.value.x).toEqual(3);
    expect(bt.find('A')?.value.x).toEqual(0);
    expect(bt.find('D')?.value.x).toEqual(6);
    expect(bt.find('B')?.value.x).toEqual(3);
    expect(bt.find('C')?.value.x).toEqual(9);
    
    // Note: In John Q. Walker's original algorithm, this is modified to 13.5
    // Our algorithm does not account for this offset
    //
    expect(bt.find('F')?.value.x).toEqual(9);

    expect(bt.find('N')?.value.x).toEqual(24);
    expect(bt.find('G')?.value.x).toEqual(21);
    expect(bt.find('M')?.value.x).toEqual(27);
    expect(bt.find('H')?.value.x).toEqual(15);
    expect(bt.find('I')?.value.x).toEqual(21);
    expect(bt.find('J')?.value.x).toEqual(27);
    expect(bt.find('K')?.value.x).toEqual(33);
    expect(bt.find('L')?.value.x).toEqual(39);
  });

  it('can calculate y coordinates', () => {
    const bt = new MAryTree<string, MAryTreeValuePositioned>('O');

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

    expect(bt.find('O')?.value.y).toEqual(0);
    expect(bt.find('E')?.value.y).toEqual(6);
    expect(bt.find('A')?.value.y).toEqual(12);
    expect(bt.find('D')?.value.y).toEqual(12);
    expect(bt.find('B')?.value.y).toEqual(18);
    expect(bt.find('C')?.value.y).toEqual(18);
    expect(bt.find('F')?.value.y).toEqual(6);
    expect(bt.find('N')?.value.y).toEqual(6);
    expect(bt.find('G')?.value.y).toEqual(12);
    expect(bt.find('M')?.value.y).toEqual(12);
    expect(bt.find('H')?.value.y).toEqual(18);
    expect(bt.find('I')?.value.y).toEqual(18);
    expect(bt.find('J')?.value.y).toEqual(18);
    expect(bt.find('K')?.value.y).toEqual(18);
    expect(bt.find('L')?.value.y).toEqual(18);
  });
});