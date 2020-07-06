import { Household } from './../src/household';
import { Roommate } from './../src/roommate';
import { Expense } from './../src/expense';

describe('Household testing', () => {
  let household;

  beforeEach(() => {
    household = new Household();
    household.addRoommate('Steve');
  })

  test('should create a household object', () => {
    expect(household).toBeDefined();
    expect(household.total).toEqual(0);
    expect(household.roommates.length).toBeTruthy();
    expect(household.expenses.length).toEqual(0);
  });

  test('should add roommates to the household', () => {
    expect(household.roommates.length).toEqual(1);
    expect(household.roommates[0].name).toBe('Steve');
    expect(household.roommates[0].index).toEqual(0);
    expect(household.nextIndex).toEqual(1);
  });

  test('should remove roommates from the household', () => {
    household.removeRoommateByIndex(0);
    expect(household.roommates.length).toEqual(0);
  });

  test('should find a roommate index, given their name', () => {
    expect(household.findIndexByName('Steve')).toBe(0);
    expect(household.findIndexByName('John')).toEqual(false);
  });

  test('should find a roommates name, given their index', ()=>{
    expect(household.findNameByIndex(0)).toBe('Steve');
    expect(household.findNameByIndex(5)).toBe(false);
  });
});;