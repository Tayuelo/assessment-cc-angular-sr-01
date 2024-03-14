import { mockMonsters } from '../__mocks__/monsters';
import { getRandomObject } from './array-helpers';

describe('getRandomObject', () => {
  it('should return null if monster is null', () => {
    const monsters = mockMonsters.monsters;
    const randomObject = getRandomObject(monsters, null);
    expect(randomObject).toBeNull();
  });

  it('should return a random object excluding the provided monster', () => {
    const monsters = mockMonsters.monsters;
    const selectedMonster = mockMonsters.selectedMonster;
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const randomObject = getRandomObject(monsters, selectedMonster);
    expect(randomObject?.id).toEqual('monster-4');
  });
});
