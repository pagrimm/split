//Household = {this.roomates = []; Expenses = []; Total = num;}
import { Roommate } from './roommate';

export class Household {
  constructor() {
    this.roommates = [];
    this.expenses = [];
    this.total = 0;
    this.nextIndex = 0;
  }
  
  addRoommate (name) {
    let roommate = new Roommate(name, this.nextIndex);
    this.nextIndex ++;
    this.roommates.push(roommate);
  }

  removeRoommateByIndex (index) {
    this.roommates.splice(index, 1);
  }
}