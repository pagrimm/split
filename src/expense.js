//Expenses = {this.total = num; credits = [], debits = []}

export class Expense {
  constructor(total, name, credits, debits) {
    this.total = total;
    this.name = name;
    this.credits = credits;
    this.debits = debits;
  }
}