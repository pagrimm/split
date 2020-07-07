import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';
import { Expense } from './expense';

$(document).ready(function() {
  let household = new Household();
  
  //Roommates Interface
  //Add Roommates Button
  $('#add-roommate').click(function() {
    const roommateName = $("input[name=roommate-name]").val();
    if (roommateName === '') {
      alert('Please enter a name');
      return;
    }
    household.addRoommate(roommateName);
    $("input[name=roommate-name]").val('');

    //add new roommate to the expense interface
    $('#expense-interface').append(roommateName);
    
    //add new roommate to the display debits/credits interface
    $('#display-expenses').append(roommateName);
  });

  //Expense Interface Listeners
  //Listen for an added expense
  $("#add-expense").click(function() {
    const newExpenseName = $("input[name=expense-note]").val();
    const expenseCost = parseFloat($("input[name=expense-cost]").val());
    if (newExpenseName === '' || isNaN(expenseCost))  {
      alert('Enter valid expense');
      return;
    }
    const credits = gatherCredits();      // To be written
    const debits = gatherDebits();        //
    let newExpense = new Expense(expenseCost, newExpenseName, );
  });
});