//Household = {this.roomates = []; Expenses = []; Total = num;}
import { Roommate } from './roommate';
import { Expense } from './expense';

export class Household {
  constructor() {
    this.roommates = [];
    this.expenses = [];
    this.total = 0;
    this.nextRoommateIndex = 0;
    this.nextExpenseId = 0;
  }
  
  addRoommate (name) {
    let roommate = new Roommate(name, this.nextRoommateIndex);
    this.nextRoommateIndex ++;
    this.roommates.push(roommate);
  }

  removeRoommateByIndex (index) {
    for (let i = 0; i < this.roommates.length; i++) {
      if (this.roommates[i].index === index) {
        this.roommates.splice(i, 1);
        break;
      }
    }
  }

  removeRoommateByName (name) {
    for (let i = 0; i < this.roommates.length; i++) {
      if (this.roommates[i].name === name) {
        this.roommates.splice(i, 1);
        break;
      }
    }
  }

  findIndexByName(name) {
    for (const person of this.roommates) {
      if (person.name === name) {
        return person.index;
      }
    }
    return false;
  }

  findNameByIndex(index) {
    for (const person of this.roommates) {
      if (person.index === index) {
        return person.name;
      }
    }
    return false;
  }

  addExpense(total, name, credits, debits) {
    let expense = new Expense(total, name, credits, debits, this.nextExpenseId);
    if (expense.verifyExpense()) {
      this.nextExpenseId++;
      this.expenses.push(expense);
    } else {
      return false;
    }
  }
  
  removeExpense(id) {
    let expenseIndex;
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].id === id) {
        expenseIndex = i;
        break;
      }
    }
    if (expenseIndex || expenseIndex === 0) {
      this.expenses.splice(expenseIndex, 1);
    }
  }

  findExpenses(name) {
    const roommateIndex = this.findIndexByName(name);
    const expenseArray = [];
    for (const expense of this.expenses) {
      if (expense.credits[roommateIndex] || expense.debits[roommateIndex]) {
        expenseArray.push([expense.name, expense.credits[roommateIndex], expense.debits[roommateIndex]]);
      }
    }
    return expenseArray;
  }

  runningTotal(name) {
    const expenseArray = this.findExpenses(name);
    let runningTotal = 0;
    for (const entry of expenseArray) {
      runningTotal += entry[1] + entry[2];
    }
    return runningTotal;
  }

  findTotalExpense() {
    this.total = 0;
    for (const expense of this.expenses) {
      this.total += expense.total;
    }
  }
}