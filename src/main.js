import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';
import { createCard, createSplitInput, createParticipationButton } from './HTML-templates';

function gatherCredits(household) {
  const contributionNames = [];
  $('select.roommate-contribution-name').each(function() {
    contributionNames.push($(this).val());
  });
  const contributionCredits = [];
  $('input.roommate-contribution-credit').each(function() {
    contributionCredits.push(parseFloat($(this).val()));
  });
  const credits = [];
  for (let i = 0; i < household.nextRoommateIndex; i++) {
    credits.push(0);
  }
  for (let i = 0; i < contributionNames.length; i++) {
    credits[household.findIndexByName(contributionNames[i])] = contributionCredits[i];
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
  if ($('#even-split-radio:checked')) {
    //if even split is selected, determine which roommates are included on the split
    const debitNames = [];
    $('input[name="participation"]:checked').each(function() {
      debitNames.push($(this).val());
    });
    //do math to split the total among the included roommates
    const totalDebit = parseFloat($('input#expense-total').val())/debitNames.length;
    //assign split total to each roommate
    debitNames.forEach(function(name) {
      const roomieIndex = household.findIndexByName(name);
      debits[roomieIndex] = totalDebit;
    });
  } else {
    //if custom split is selected, directly assign the debit values
    const customDebitNames = [];
    const customDebitValues = [];
    $('.custom-split-input').each(function() {
      customDebitNames.push($(this).attr('id').split('-').pop());
      customDebitValues.push(parseFloat($(this).val()));
    });
    for (let i = 0; i < customDebitValues.length; i++) {
      debits[household.findIndexByName(customDebitNames[i])] = customDebitValues[i];
    }
  }
  return debits;
}

function buildExpenseHTML(expense, household) {
  let codeHTML = `<ul><li>${expense.name}, ${expense.total}</li>`;
  for (const roommate of household.roommates) {
    const roommateIndex = household.findIndexByName(roommate.name);
    if (expense.credits[roommateIndex] || expense.debits[roommateIndex]) {
      const roommateBalance = expense.credits[roommateIndex] - expense.debits[roommateIndex];
      if (roommateBalance > 0) {
        codeHTML += `<li>${roommate.name} is owed ${roommateBalance}</li>`;
      } else if (roommateBalance < 0) {
        codeHTML += `<li>${roommate.name} owes ${-1*roommateBalance}</li>`;
      }
    }
  }
  codeHTML += `</ul>`;
  return codeHTML;
}

function displayExpenses(household) {
  let finalHTML = `<ul>`;
  for (const expense of household.expenses) {
    let expenseHTML = buildExpenseHTML(expense, household);
    finalHTML += expenseHTML;
  }
  finalHTML += `</ul>`;
  $('div#house-expenses-output').html(finalHTML);
}

$(document).ready(function() {
  let household = new Household();
  let resetForm = $('#expense-form').clone();

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

    //add new roommate to the custom split input interfrace
    const customSplitInput = createSplitInput(roommateName);
    $('div.custom-split-div').append(customSplitInput);

    //add new participation button to the even split input interfrace
    const participationButton = createParticipationButton(roommateName);
    $("#participation-buttons").append(participationButton);

    $("input#roommate-name").val('');
    resetForm = $('#expense-form').clone();
    $('#roommate-modal').modal('hide');
  });

  //Expense Interface Listeners
  //Listen for an added expense
  $("form#expense-form").submit(function(event) {
    event.preventDefault();

    const newExpenseName = $("input#expense-name").val();
    const expenseCost = parseFloat($("input#expense-total").val());
    if (newExpenseName === '' || isNaN(expenseCost))  {
      alert('Enter valid expense');
      return;
    }
    const credits = gatherCredits(household);
    const debits = gatherDebits(household);
    try {
      household.addExpense(expenseCost, newExpenseName, credits, debits);
      displayExpenses(household);
    } catch(error) {
      alert(error.message);
      return;
    }

    $('#expense-modal').modal('hide');
    $("#expense-form").html(resetForm);
  });

  $("form#expense-form").on('click', '.contribution-plus', function() {
    const newInputForm = $('div.expense-input-copypasta').first().clone();
    $('div.expense-input-copypasta').last().after(newInputForm);
    const changeButton = $('div.expense-input-copypasta').last().children('.input-group-append').children('button');
    changeButton.removeClass('contribution-plus').removeClass('btn-primary').addClass('contribution-minus').addClass('btn-danger').html('&minus;');
  });

  $("form#expense-form").on('click', '.contribution-minus', function() {
    $(this).parent().parent().remove();
  });

  $('#even-split-radio').click(function() {
    $('.participation-div').show();
    $('.custom-split-div').hide();
  });

  $('#custom-split-radio').click(function() {
    $('.participation-div').hide();
    $('.custom-split-div').show();
  });
});