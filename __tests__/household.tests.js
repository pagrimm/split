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
    expect(household.nextRoommateIndex).toEqual(1);
  });

  test('should remove roommates from the household', () => {
    household.removeRoommateByIndex(0);
    expect(household.roommates.length).toEqual(0);
  });

  test('should find a roommate index, given their name', () => {
    expect(household.findIndexByName('Steve')).toBe(0);
    expect(household.findIndexByName('John')).toEqual(false);
  });

  test('should find a roommates name, given their index', () => { 
    expect(household.findNameByIndex(0)).toBe('Steve');
    expect(household.findNameByIndex(5)).toBe(false);
  });

  test('should be able to add expenses', () => {
    household.addExpense(20, 'Pizza', [20, 0, 0], [-10, -5, -5]);
    expect(household.expenses.length).toBe(1);
    expect(household.expenses[0].total).toBe(20);
    expect(household.expenses[0].name).toBe('Pizza');
  });

  test('should be able to remove an expense', () =>  {
    household.addExpense(20, 'Pizza', [20, 0, 0], [-10, -5, -5]);
    household.removeExpense(0);
    expect(household.expenses.length).toBe(0);
  });

  test('should find all credits and debits a specific roommate is responsible for', () => {
    household.addExpense(20, 'Pizza', [20, 0, 0], [-10, -5, -5]);
    household.addExpense(50, 'Groceries', [50, 0, 0], [-30, -5, -5]);
    const stevesExpenses = household.findExpenses('Steve');
    expect(stevesExpenses).toEqual([['Pizza', 20, -10], ['Groceries', 50, -30]]);
  });
});