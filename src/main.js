import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';
import { createCard } from './card-template';

function gatherCredits(household) {
  const numberItems = $(".roommate-select").length; //update with name used for selector boxes
  const creditNames = [];
  const creditAmounts = [];
  for (let i = 0; i <= numberItems; i++) {
    creditNames.push($(`.roommate-select${i}`).val()); //update with name used for roommate selection value
  }
  for (let i = 0; i <= numberItems; i++) {
    creditAmounts.push(parseFloat($(`.credit-input${i}`).val())); // update with name used for credit input
  }
  const credits = [];
  for (let i = 0; i < household.nextRoommateIndex; i++) {
    credits.push(0);
  }
  for (let i = 0; i <= numberItems; i++) {
    const roomieIndex = household.findIndexByName(creditNames[i]);
    credits[roomieIndex] = creditAmounts[i];
  }
  return credits;
}

function gatherDebits(household) {
  //initialize debits array
  const debits = [];
  for (let i = 0; i < household.nextRoommateIndex; i++) {
    debits.push(0);
  }
  //detect whether an even or custom split is made
  if ($('#even-split:selected')) { //update with correct name
    //if even split is selected, determine which roommates are included on the split
    const numberItems = $(".include-roomates:selected").length; //update with correct name
    const debitNames = [];
    for (let i = 0; i <= numberItems; i++) {
      debitNames.push($(".include-roommates").val());
    }
    //do math to split the total among the included roommates
    const totalDebit = parseFloat($('input[name=expense-cost]').val())/debitNames.length;
    //assign split total to each roommate
    debitNames.forEach(function(name) {
      const roomieIndex = household.findIndexByName(name);
      debits[roomieIndex] = totalDebit;
    });
  } else {
    //if custom split is selected, directly assign the debit values
    for (let i = 0; i < household.nextRoommateIndex; i++) {
      debits[i] = parseFloat($(`.custom-split${i}`).val()); //update with correct name
    }
  }
  return debits; //[-15, -15, -15]
}

function buildExpenseHTML(expense, household) {
  let codeHTML = `<li>${expense.name}, ${expense.total}: `;
  for (let i = 0; i < expense.credits.length; i++) {
    if (expense.credits[i]) {
      codeHTML += `${household.findNameByIndex[i]} paid ${expense.credits[i]}`;
    }
  }
  for (let i = 0; i < expense.debits.length; i++) {
    if (expense.debits[i]) {
      codeHTML += `${household.findNameByIndex[i]} owes ${expense.debits[i]}`;
    }
  }
  codeHTML += `</li>`;
  return codeHTML;
}

$(document).ready(function() {
  let household = new Household();
  
  //Roommates Interface
  //Add Roommates Button
  $('form#roommate-form').submit(function(event) {
    event.preventDefault();
    const roommateName = $("input#roommate-name").val();
    if (roommateName === '') {
      alert('Please enter a name');
      return;
    }
    household.addRoommate(roommateName);

    //add new roommate to the expense interface
    $('select.roommate-contribution-name').append(`<option value='${roommateName}'>${roommateName}</option>`);
    
    //add new roommate to the display debits/credits interface
    const cardHTML = createCard(roommateName);
    $('div#roommate-expense-cards').append(cardHTML);

    $("input#roommate-name").val('');
    $('#roommate-modal').modal('hide');
  });

  //Expense Interface Listeners
  //Listen for an added expense
  $("form#expense-form").submit(function(event) {
    event.preventDefault();

    const newExpenseName = $("input[name=expense-note]").val();
    const expenseCost = parseFloat($("input[name=expense-cost]").val());
    if (newExpenseName === '' || isNaN(expenseCost))  {
      alert('Enter valid expense');
      return;
    }
    const credits = gatherCredits(household);      // To be written
    const debits = gatherDebits(household);        //
    household.addExpense(expenseCost, newExpenseName, credits, debits); //Add error handling
  });

  $("form#expense-form").on('click', '.contribution-plus', function() {
    const newInputForm = $('div.expense-input-copypasta').first().clone();
    $('div.expense-input-copypasta').last().after(newInputForm);
    const changeButton = $('div.expense-input-copypasta').last().children('.input-group-append').children('button');
    changeButton.removeClass('contribution-plus').removeClass('btn-primary').addClass('contribution-minus').addClass('btn-danger').html('&minus;')
  });

  $("form#expense-form").on('click', '.contribution-minus', function() {
    const divToDelete = $(this).parent().parent();
    divToDelete.remove();
  });

  //Display Debits and Credits Listeners
  $('#show-house-expenses').click(function() { //update with correct name
    let houseHTML = '';
    household.expenses.forEach(function(expense) {
      houseHTML += buildExpenseHTML(expense, household);
    });
    $("#household-expenses").html(houseHTML); //update with correct name
    $("#household.expenses").show();
  });

  $('#show-roomate-expenses').click(function() {
    let roommateHTML = '';
    const roommateName = $(this).attr('id');
    const roommateExpenses = household.findExpenses(roommateName);
    roommateExpenses.forEach(function(expense) {
      roommateHTML += buildExpenseHTML(expense, household);
    });
    $("#roommate-expenses").html(roommateHTML);
    $("#roommate-expenses").show();
  });
});