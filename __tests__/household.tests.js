import { Household } from './../src/household';
import { Roommate } from './../src/roommate';
import { Expense } from './../src/expense';

describe('Household testing', () => {
  let household;

  beforeEach(() => {
    household = new Household();
  })

  test('should create a household object', () => {
    expect(household).toBeDefined();
    expect(household.total).toEqual(0);
    expect(household.roommates.length).toEqual(0);
    expect(household.expenses.length).toEqual(0);
  });

  test('should add roommates to the household', () => {
    household.addRoommate('Steve');
    expect(household.roommates.length).toEqual(1);
    expect(household.roommates[0].name).toBe('Steve');
    expect(household.roommates[0].index).toEqual(0);
    expect(household.nextIndex).toEqual(1);
  });

  test('should remove roommates from the household', () => {
    household.addRoommate('Steve');
    household.removeRoommateByIndex(0);
    expect(household.roommates.length).toEqual(0);
  });
});