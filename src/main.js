import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Household } from './household';
import { createCard, createSplitInput, createParticipationButton, createExpenseCard } from './HTML-templates';

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
  if ($('#even-split-radio').is(':checked')) {
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
  let codeHTML = "";
  for (const roommate of household.roommates) {
    const roommateIndex = household.findIndexByName(roommate.name);
    if (expense.credits[roommateIndex] || expense.debits[roommateIndex]) {
      const roommateBalance = expense.credits[roommateIndex] - expense.debits[roommateIndex];
      if (roommateBalance > 0) {
        codeHTML += `<div>${roommate.name} is owed <span class="text-success">$${roommateBalance.toFixed(2)}</span></div>`;
      } else if (roommateBalance < 0) {
        codeHTML += `<div>${roommate.name} owes <span class="text-danger">$${(-1*roommateBalance).toFixed(2)}</span></div>`;
      }
    }
  }
  return codeHTML;
}

function displayExpensesByRoommate(household, roommate) {
  $(`#${roommate.name}-Expenses-Output`).html("");
  for (const expense of household.expenses) {
    let newExpenseCard = createExpenseCard(expense);
    let expenseHTML = '';
    if (expense.debits[roommate.index] || expense.credits[roommate.index]) {
      const roomieBalance = expense.credits[roommate.index] - expense.debits[roommate.index];
      if (roomieBalance > 0) {
        expenseHTML += `<div>${roommate.name} is owed <span class="text-success">$${roomieBalance.toFixed(2)}</span> for ${expense.name}</div>`;
      } else if (roomieBalance < 0) {
        expenseHTML += `<div>${roommate.name} owes <span class="text-danger">$${(roomieBalance*-1).toFixed(2)}</span> for ${expense.name}</div>`;
      }
    }
    $(`#${roommate.name}-Expenses-Output`).append(newExpenseCard);
    $(`#${roommate.name}-Expenses-Output`).children(".card").last().children(".expense-output").html(expenseHTML);
    let roommateTotal = household.runningTotal(roommate.name);
    if (roommateTotal >= 0) {
      $(`#${roommate.name}-running-total`).html(`${roommate.name} is owed <span class="text-success">$${roommateTotal.toFixed(2)}</span> in total`);
    } else {
      $(`#${roommate.name}-running-total`).html(`${roommate.name} owes <span class="text-danger">$${(roommateTotal * -1).toFixed(2)}</span> in total`);
    }
  }
}

function displayExpenses(household) {
  $('div#house-expenses-output').html("");
  for (const expense of household.expenses) {
    let expenseCard = createExpenseCard(expense);
    let expenseHTML = buildExpenseHTML(expense, household);
    $('div#house-expenses-output').append(expenseCard);
    $('div#house-expenses-output').children(".card").last().children(".expense-output").html(expenseHTML);
  }

  for (const roommate of household.roommates) {
    displayExpensesByRoommate(household, roommate);
  }
  household.findTotalExpense();
  $(".household-total").html(`Household total is currently $${household.total.toFixed(2)}`);
}

$(document).ready(function() {
  let household = new Household();

  //Roommates Interface
  //Add Roommates Button
  $('form#roommate-form').submit(function(event) {
    event.preventDefault();
    const roommateName = $("input#roommate-name").val();
    if (roommateName === '') {
      $("#roommateNameError").html("Please Enter a Name");
      return;
    }
    $("#roommateNameError").html('');
    household.addRoommate(roommateName);

    //add new roommate to the expense interface
    $('select.roommate-contribution-name').append(`<option value='${roommateName}'>${roommateName}</option>`);
    $('select.payment-name').append(`<option value='${roommateName}'>${roommateName}</option>`);
    //add new roommate to the display debits/credits interface
    const cardHTML = createCard(roommateName);
    $('div#roommate-expense-cards').append(cardHTML);

    //add new roommate to the custom split input interface
    const customSplitInput = createSplitInput(roommateName);
    $('div.custom-split-div').append(customSplitInput);

    //add new participation button to the even split input interface
    const participationButton = createParticipationButton(roommateName);
    $("#participation-buttons").append(participationButton);

    $("input#roommate-name").val('');
    $('#roommate-modal').modal('hide');
    $('#add-expense').attr("disabled", false);
  });

  $('#close-roommate-form').click(function() {
    $("#roommateNameError").html('');
  });

  //Expense Interface Listeners
  //Listen for an added expense
  $("form#expense-form").submit(function(event) {
    event.preventDefault();

    const newExpenseName = $("input#expense-name").val();
    const expenseCost = parseFloat($("input#expense-total").val());
    if (newExpenseName === '' || isNaN(expenseCost))  {
      $('#expenseErrorOutput').html('Enter a name and dollar value');
      return;
    }
    const credits = gatherCredits(household);
    const debits = gatherDebits(household);
    try {
      household.addExpense(expenseCost, newExpenseName, credits, debits);
      displayExpenses(household);
    } catch(error) {
      $('#expenseErrorOutput').html(error.message);
      return;
    }

    $('#expenseErrorOutput').html('');
    $('#expense-modal').modal('hide');
    $('#expense-form').children('.deleteThis').remove();
    $('#even-split-radio').prop('checked', true);
    $('#custom-split-radio').prop('checked', false);
    $('#expense-name').val('');
    $('#expense-total').val('');
    $('.roommate-contribution-credit').val('');
    $('.roommate-contribution-name').prop('selectedIndex', 0);
    $('.custom-split-input').val('');
    $('.participation-div').show();
    $('.custom-split-div').hide();
    $("#house-accordion").show();
  });

  $("form#expense-form").on('click', '.contribution-plus', function() {
    const newInputForm = $('div.expense-input-copypasta').first().clone();
    $('div.expense-input-copypasta').last().after(newInputForm);
    $('div.expense-input-copypasta').last().addClass('deleteThis');
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

  $("#roommate-expense-cards").on('click', '.expand-button', function() {
    $(".expand-button").not(this).children(".up-button").hide();
    $(".expand-button").not(this).children(".down-button").show();
    $(this).children(".down-button").toggle();
    $(this).children(".up-button").toggle();
  });

  $("#house-accordion").on('click', '.expand-button', function() {
    $(this).children(".down-button").toggle();
    $(this).children(".up-button").toggle();
  });

});