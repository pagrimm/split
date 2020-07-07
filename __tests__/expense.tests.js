import { Expense } from './../src/expense';

describe('Expense tester', ()=>{
  test('should verify a valid expense', ()=>{
    let testExpense = new Expense(20, 'Pizza', [20, 0, 0], [-10, -5, -5], 0);
    expect(testExpense.verifyExpense()).toBe(true);
  });

  test('should reject an invalid expense', ()=>{
    let testExpense = new Expense(20, 'Pizza', [20, 0, 0], [0, 0, 0], 0);
    expect(testExpense.verifyExpense()).toBe(false);
  });
});